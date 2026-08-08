#!/usr/bin/env python3
"""
Pull MAZA employment applications from Vercel KV (or the protected API).

Default: KV REST API using credentials from the site .env.local
Writes each new app as JSON + a readable .md under the out dir.
Marks records pulled so the next run is quiet when empty.

Usage:
  python3 pull-applications.py              # new only, mark pulled
  python3 pull-applications.py --all        # everything
  python3 pull-applications.py --dry-run    # don't mark pulled
  python3 pull-applications.py --api        # use https://mazahalalfood.com/api/apply
                                            # (needs APPLICATIONS_PULL_SECRET)

Env (auto-loaded from maza-mediterranean/.env.local if present):
  KV_REST_API_URL
  KV_REST_API_TOKEN
  APPLICATIONS_PULL_SECRET   # only for --api
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

DEFAULT_ENV = Path("/srv/apps/tricon-projects/maza-mediterranean/.env.local")
DEFAULT_OUT = Path("/home/ice/.hermes/profiles/maza/workspace/ops/applications")
API_URL = "https://mazahalalfood.com/api/apply"


def load_env(path: Path) -> None:
    if not path.is_file():
        return
    for line in path.read_text().splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        k, v = line.split("=", 1)
        k, v = k.strip(), v.strip().strip('"').strip("'")
        os.environ.setdefault(k, v)


def slug(s: str) -> str:
    s = re.sub(r"[^a-zA-Z0-9]+", "-", (s or "applicant").strip().lower()).strip("-")
    return (s[:40] or "applicant")


def kv_request(base: str, token: str, path: str, body: dict | None = None) -> dict | list | str | int | None:
    url = base.rstrip("/") + path
    data = None
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }
    if body is not None:
        data = json.dumps(body).encode()
    req = urllib.request.Request(url, data=data, headers=headers, method="POST" if body is not None else "GET")
    # Upstash REST uses POST for commands
    if body is not None:
        req = urllib.request.Request(url, data=data, headers=headers, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            raw = resp.read().decode()
            if not raw:
                return None
            return json.loads(raw)
    except urllib.error.HTTPError as e:
        err = e.read().decode()
        raise SystemExit(f"KV HTTP {e.code}: {err}") from e


def upstash_cmd(base: str, token: str, *cmd: str | int):
    """Run a single Redis command via Upstash REST."""
    url = base.rstrip("/")
    payload = list(cmd)
    data = json.dumps(payload).encode()
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        parsed = json.loads(resp.read().decode())
    # Upstash returns {"result": ...}
    if isinstance(parsed, dict) and "result" in parsed:
        return parsed["result"]
    return parsed


def pull_via_kv(scope: str) -> list[dict]:
    base = os.environ.get("KV_REST_API_URL") or os.environ.get("UPSTASH_REDIS_REST_URL")
    token = os.environ.get("KV_REST_API_TOKEN") or os.environ.get("UPSTASH_REDIS_REST_TOKEN")
    if not base or not token:
        raise SystemExit("Missing KV_REST_API_URL / KV_REST_API_TOKEN")

    set_key = "applications:new" if scope == "new" else "applications:all"
    ids = upstash_cmd(base, token, "SMEMBERS", set_key) or []
    apps: list[dict] = []
    for app_id in ids:
        raw = upstash_cmd(base, token, "GET", f"application:{app_id}")
        if raw is None:
            continue
        if isinstance(raw, str):
            try:
                app = json.loads(raw)
            except json.JSONDecodeError:
                continue
        elif isinstance(raw, dict):
            app = raw
        else:
            continue
        apps.append(app)
    apps.sort(key=lambda a: a.get("submittedAt") or "", reverse=True)
    return apps


def mark_pulled_kv(ids: list[str]) -> int:
    base = os.environ["KV_REST_API_URL"] if "KV_REST_API_URL" in os.environ else os.environ.get("UPSTASH_REDIS_REST_URL", "")
    token = os.environ.get("KV_REST_API_TOKEN") or os.environ.get("UPSTASH_REDIS_REST_TOKEN", "")
    pulled_at = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    n = 0
    for app_id in ids:
        raw = upstash_cmd(base, token, "GET", f"application:{app_id}")
        if raw is None:
            continue
        app = json.loads(raw) if isinstance(raw, str) else raw
        if not isinstance(app, dict):
            continue
        app["status"] = "pulled"
        app["pulledAt"] = pulled_at
        upstash_cmd(base, token, "SET", f"application:{app_id}", json.dumps(app))
        upstash_cmd(base, token, "SREM", "applications:new", app_id)
        n += 1
    return n


def pull_via_api(scope: str, mark: bool) -> list[dict]:
    secret = os.environ.get("APPLICATIONS_PULL_SECRET")
    if not secret:
        raise SystemExit("APPLICATIONS_PULL_SECRET required for --api")
    q = f"status={'all' if scope == 'all' else 'new'}"
    if mark:
        q += "&mark=1"
    req = urllib.request.Request(
        f"{API_URL}?{q}",
        headers={"Authorization": f"Bearer {secret}"},
        method="GET",
    )
    with urllib.request.urlopen(req, timeout=30) as resp:
        data = json.loads(resp.read().decode())
    return data.get("applications") or []


def to_markdown(app: dict) -> str:
    def g(*keys, default="—"):
        for k in keys:
            v = app.get(k)
            if v not in (None, "", []):
                if isinstance(v, list):
                    return ", ".join(str(x) for x in v)
                return str(v)
        return default

    lines = [
        f"# Application — {g('fullName')}",
        "",
        f"- **ID:** `{g('id')}`",
        f"- **Submitted:** {g('submittedAt')}",
        f"- **Status:** {g('status')}",
        f"- **Phone:** {g('phone')}",
        f"- **Email:** {g('email')}",
        f"- **Address:** {g('address')}, {g('city')} {g('state')} {g('zip')}",
        f"- **Positions:** {g('positions')}",
        f"- **Type:** {g('employmentType')}",
        f"- **Days:** {g('availabilityDays')}",
        f"- **Hours notes:** {g('availabilityNotes')}",
        f"- **Start:** {g('startDate')}",
        f"- **18+:** {g('over18')} · **Work auth:** {g('workAuthorized')} · **Prior MAZA:** {g('previouslyEmployed')}",
        f"- **Heard about us:** {g('heardAbout')}",
        "",
        "## Work history",
        g("workHistory"),
        "",
        "## Education",
        g("education"),
        "",
        "## References",
        g("references"),
        "",
        "## Why MAZA",
        g("whyMaza"),
        "",
        "## Emergency contact",
        f"{g('emergencyName')} — {g('emergencyPhone')}",
        "",
    ]
    return "\n".join(lines)


def write_apps(apps: list[dict], out_dir: Path) -> list[Path]:
    out_dir.mkdir(parents=True, exist_ok=True)
    written: list[Path] = []
    for app in apps:
        ts = (app.get("submittedAt") or datetime.now(timezone.utc).isoformat())[:10]
        name = slug(str(app.get("fullName") or "applicant"))
        app_id = str(app.get("id") or "unknown")[:8]
        base = out_dir / f"{ts}_{name}_{app_id}"
        jp = base.with_suffix(".json")
        mp = base.with_suffix(".md")
        jp.write_text(json.dumps(app, indent=2) + "\n")
        mp.write_text(to_markdown(app))
        written.extend([jp, mp])
    # rolling index of newest pull
    index = out_dir / "LAST_PULL.json"
    index.write_text(
        json.dumps(
            {
                "pulledAt": datetime.now(timezone.utc).isoformat(),
                "count": len(apps),
                "ids": [a.get("id") for a in apps],
            },
            indent=2,
        )
        + "\n"
    )
    return written


def main() -> int:
    ap = argparse.ArgumentParser(description="Pull MAZA job applications")
    ap.add_argument("--all", action="store_true", help="Pull all apps, not just new")
    ap.add_argument("--dry-run", action="store_true", help="Do not mark as pulled")
    ap.add_argument("--api", action="store_true", help="Pull via site API instead of KV")
    ap.add_argument("--env-file", type=Path, default=DEFAULT_ENV)
    ap.add_argument("--out", type=Path, default=DEFAULT_OUT)
    ap.add_argument("--json-stdout", action="store_true", help="Print apps JSON to stdout")
    args = ap.parse_args()

    load_env(args.env_file)
    scope = "all" if args.all else "new"
    mark = not args.dry_run and not args.all

    if args.api:
        # API can mark on the server when mark=1
        apps = pull_via_api(scope, mark=mark)
    else:
        apps = pull_via_kv(scope)
        if mark and apps:
            mark_pulled_kv([a["id"] for a in apps if a.get("id")])

    if args.json_stdout:
        print(json.dumps({"count": len(apps), "applications": apps}, indent=2))
    else:
        if not apps:
            print("No applications to pull.")
            return 0
        paths = write_apps(apps, args.out)
        print(f"Pulled {len(apps)} application(s) → {args.out}")
        for a in apps:
            print(f"  - {a.get('fullName')} · {a.get('phone')} · {', '.join(a.get('positions') or [])}")
        print(f"Wrote {len(paths)} files (+ LAST_PULL.json)")

    return 0


if __name__ == "__main__":
    sys.exit(main())
