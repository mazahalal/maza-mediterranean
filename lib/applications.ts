/**
 * Employment applications — stored in Vercel KV (same Redis as SMS list).
 *
 * Keys:
 *   application:{id}   → full application JSON
 *   applications:all   → Set of ids
 *   applications:new   → Set of ids not yet pulled locally
 */
import { kv } from '@vercel/kv';
import { randomUUID } from 'crypto';
import type { EmploymentApplicationPayload } from '@/lib/email';

export type ApplicationStatus = 'new' | 'pulled' | 'archived';

export type StoredApplication = EmploymentApplicationPayload & {
  id: string;
  submittedAt: string;
  status: ApplicationStatus;
  source: 'web';
  pulledAt?: string;
  userAgent?: string;
  ipHash?: string;
};

const KEY_PREFIX = 'application:';
const SET_ALL = 'applications:all';
const SET_NEW = 'applications:new';

function key(id: string) {
  return `${KEY_PREFIX}${id}`;
}

export async function saveApplication(
  data: EmploymentApplicationPayload,
  meta?: { userAgent?: string; ipHash?: string }
): Promise<StoredApplication> {
  const id = randomUUID();
  const record: StoredApplication = {
    ...data,
    id,
    submittedAt: new Date().toISOString(),
    status: 'new',
    source: 'web',
    userAgent: meta?.userAgent,
    ipHash: meta?.ipHash,
  };

  await kv.set(key(id), record);
  await kv.sadd(SET_ALL, id);
  await kv.sadd(SET_NEW, id);

  return record;
}

export async function getApplication(id: string): Promise<StoredApplication | null> {
  return (await kv.get<StoredApplication>(key(id))) ?? null;
}

export async function listApplicationIds(scope: 'new' | 'all' = 'new'): Promise<string[]> {
  const ids = (await kv.smembers(scope === 'new' ? SET_NEW : SET_ALL)) as string[];
  return ids.filter(Boolean);
}

export async function listApplications(scope: 'new' | 'all' = 'new'): Promise<StoredApplication[]> {
  const ids = await listApplicationIds(scope);
  if (ids.length === 0) return [];

  const rows = await Promise.all(ids.map((id) => kv.get<StoredApplication>(key(id))));
  return rows
    .filter((r): r is StoredApplication => Boolean(r))
    .sort((a, b) => (a.submittedAt < b.submittedAt ? 1 : -1));
}

export async function markApplicationsPulled(ids: string[]): Promise<number> {
  let count = 0;
  const pulledAt = new Date().toISOString();

  for (const id of ids) {
    const existing = await kv.get<StoredApplication>(key(id));
    if (!existing) continue;
    const updated: StoredApplication = {
      ...existing,
      status: 'pulled',
      pulledAt,
    };
    await kv.set(key(id), updated);
    await kv.srem(SET_NEW, id);
    count += 1;
  }

  return count;
}

export async function countNewApplications(): Promise<number> {
  return (await kv.scard(SET_NEW)) ?? 0;
}
