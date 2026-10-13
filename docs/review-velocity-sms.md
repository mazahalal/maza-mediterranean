# Review-velocity SMS — trigger, compliance verdict, enablement

SEO Bible (June 2026, 2nd ed.) §3.3 + §4 Phase 2: fresh reviews beat total count; the
restaurant playbook targets **8–15 new Google reviews/month** and prescribes table QR
codes + automated SMS review requests as the velocity engine.

Baseline at the time of writing (read from the GBP place page, 2026-09-11):
**4.9★ / 100 reviews** (`lib/maza-rating.ts`).

This document records the two decisions that had to be made before writing a sender,
and the exact steps that must happen before the sender is allowed to send.

---

## 1. Trigger — cashier tablet at the register

**Decision: the register tablet** (`/review-request`, POST `/api/review-request`).

Why, against the alternatives:

| Candidate | Verdict |
|---|---|
| **Cashier tablet at register** | **Chosen.** The one post-visit moment Maza actually owns. The customer is already standing there, phone in hand. `/api/sms/subscribe` was already written to support a tablet. Consent is captured in person, by the person who served them. |
| Post-order webhook (delivery app / phone order) | Rejected. SkyTab takeout is the only online-order CTA and exposes no webhook; the Slice delivery path was removed (`lib/ordering.ts` keeps `deliveryUrl()` for a possible re-enable). A trigger that never fires is worse than no automation. |
| Receipt QR | Rejected as the *engine*. It is passive and already covered by the existing `/menu-qr` review buttons. Phase 2 asks for a velocity engine, which needs an active ask at the moment of a good experience. |

"We text you a review link" is a different message class from "join our deals list":
one-time, visit-triggered, no promotion. The code keeps them apart on purpose — see §3.

## 2. The message

```
MAZA Mediterranean: thanks for dining with us! Would you leave us a quick Google review?
It helps our small kitchen: https://g.page/r/CWsguNCtl7azEBM/review Reply STOP to opt out. Reply HELP for help.
```

Rules the wording must keep:

- **No incentive attached to the review.** Google's review policy prohibits
  incentivised reviews. The 15% off coupon belongs to the SMS list opt-in and must
  never appear in this message.
- **No review gating.** No "if you enjoyed your meal…" — every guest is asked the
  same way, and the tablet page repeats that instruction to staff.
- Opt-out instructions present; brand name present.
- The URL is the same `g.page/r/CWsguNCtl7azEBM/review` link the passive `/menu-qr`
  buttons already use, so there is one review destination site-wide.

## 3. Consent model — deliberately NOT the marketing list

A number given at the register for a review link is consent to **one** transactional
follow-up, not to recurring promotional SMS. So:

- Review contacts live under `review:{e164}` (+ `review:all`), never in
  `subscribers:all` / `subscribers:opted_in`.
- `/api/review-request` does not touch the marketing subscription, and
  `/api/sms/subscribe` does not create review contacts. A guest who wants the deals
  list still opts in through the normal JOIN / QR / web-form path.
- **STOP wins everywhere.** Before every send the code checks
  `subscriber:{phone}.status` and refuses when it is `opted_out`. Because the message
  goes out through the same Twilio Messaging Service, carrier-level keyword handling
  suppresses it a second time. A STOP reply is recorded by the existing
  `/api/twilio/inbound` handler.
- **One ask per customer.** `reviewRequestedAt` is stamped on the record and a second
  request is refused (`already_requested`).

## 4. Compliance verdict — NOT covered as currently registered (send is gated)

Read from the Twilio API on 2026-09-11:

| Field | Value |
|---|---|
| Brand | `BN2d49ae8b84f1c113dabc39164547f039` — STANDARD, APPROVED, identity VERIFIED |
| Campaign | `C7GEUSK` — **VERIFIED** |
| Use case | `MARKETING` |
| Description | "promotional offers, weekly specials, limited-time deals, and restaurant updates" |
| Message samples | 4 promotional samples (weekly special, slow-day lunch, thank-you with deals, win-back with hours + address) |
| Frequency as declared | "Up to 4 messages per month" |
| Messaging Service | `MG3126608607d1eecbf66568e2a480cd08` |

**A post-visit review request is not in that campaign.** It is not a promotional
offer, special, deal, or restaurant update, and it appears in none of the four sample
messages. Twilio's own guidance is explicit (error `21720`): *"Campaign description and
sample messages must match the selected `us_app_to_person_usecase`."* Sending content
outside the registered campaign is a content-mismatch risk — carrier filtering at best,
campaign suspension at worst.

Therefore:

- `MAZA_REVIEW_SMS_ENABLED` **must stay unset/false** until the campaign is amended and
  re-verified. While it is off, the endpoint records the consent and returns
  `sent: false, outcome: "disabled"` — it never sends.
- Consent recorded before enablement is not lost, but those guests have **not** been
  texted and should not be counted as requests-sent.

### What has to change before enabling

1. **Amend campaign `C7GEUSK` in the Twilio Console** (Trust Hub → A2P Campaigns → edit;
   API PATCH is not available for this resource — Console only):
   - Use case: keep `MARKETING` **only if** the review request is added to the
     description, message flow, and samples as an explicit message type. Otherwise
     re-file as **`MIXED`** (marketing + customer-care/relationship traffic), which is
     the honest classification for a campaign that now carries both a promo blast and a
     post-visit feedback ask.
   - **Add a 5th sample message** — the exact text in §2, including the STOP line.
   - Update the **description** to name one-time post-visit review requests.
   - Update the **message flow** to add the register/tablet opt-in: number handed over
     at the register, cashier reads the consent line, one message, no purchase
     condition, STOP/HELP, privacy + terms URLs.
   - State the **frequency** honestly: the 4 msgs/month cap covers the recurring
     marketing program; a review request is a one-time message on top of it. Say so.
2. **Site parity (hard gate).** Reviewers open every URL named in the flow. Before
   resubmitting, update and re-deploy together:
   - `/privacy` — add one-time review-request texts to what is collected and why.
   - `/terms` — add the one-time review-request message class next to the frequency
     disclosure, with the same STOP/HELP wording.
   - `/review-request` — the consent line already names consent, one message, rates,
     STOP/HELP, privacy, terms, and "consent is not required to purchase".
   Then crawl `/`, `/privacy`, `/terms`, `/sms-join`, `/review-request` for the live
   wording and for any retired phone number before submitting.
3. **Wait for `campaign_status: VERIFIED`** (TCR re-review is typically 10–15 business
   days; check with
   `GET https://messaging.twilio.com/v1/Services/$MSID/Compliance/Usa2p`).
4. **Flip `MAZA_REVIEW_SMS_ENABLED=true` in Vercel (Production + Preview)** and
   **redeploy** — env vars do nothing until the next deploy. Then send one live test to
   a staff phone and confirm the message renders with a working review link.
5. Place the tablet at the register, tell staff the four rules on `/review-request`.

## 5. Measurement

`GET /api/review-request/stats` returns counts only (no phone numbers):

- `requestsSent`, `requestedLast30Days` — the engine's input
- `suppressedOptedOut`, `alreadyRequested` — the guard rails actually firing
- `contactsOnFile` — consented guests on file
- `current` + `reviewBaseline` + `reviewsSinceBaseline` + `reviewsPer100Requests`
- `sendingEnabled` — proves at a glance whether the flag is live

Monthly loop: read the GBP place page → if the delta since baseline is under the 8–15
band, raise request volume (more register asks) before changing the message. When
`lib/maza-rating.ts` is bumped, update `reviewBaseline` in the stats route in the same
commit so the delta stays honest.

Known limitation: sends are counted at the API, not at delivery. `sendSms()` returns a
boolean and does not surface the Twilio message SID, so a delivered-vs-failed split
would need a status callback on the Message resource. Not built here — one trigger, one
message, one measurement.
