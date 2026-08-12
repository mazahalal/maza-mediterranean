/**
 * Inbound emails — stored in Vercel KV (same Redis as applications/SMS list).
 *
 * Populated by app/api/webhook/inbound/route.ts after each received email
 * is forwarded. Polled by Mazabot via GET /api/email/inbound.
 *
 * Keys:
 *   email:inbound:{id}    → full email JSON (id = Resend received email id)
 *   emails:inbound:all    → Set of ids
 *   emails:inbound:new    → Set of ids not yet pulled by Mazabot
 */
import { kv } from '@vercel/kv';

export type InboundEmailStatus = 'new' | 'pulled';

export type InboundAttachmentMeta = {
  id: string;
  filename: string | null;
  size: number;
  content_type: string;
};

/** Shape returned by resend.emails.receiving.get() — redeclared so this
 *  module doesn't depend on SDK type exports. */
export type ReceivedEmailPayload = {
  id: string;
  to: string[];
  from: string;
  created_at: string;
  subject: string;
  bcc: string[] | null;
  cc: string[] | null;
  reply_to: string[] | null;
  html: string | null;
  text: string | null;
  headers: Record<string, string> | null;
  message_id: string;
  attachments: InboundAttachmentMeta[];
};

export type StoredInboundEmail = {
  id: string;
  from: string;
  to: string[];
  cc: string[] | null;
  replyTo: string[] | null;
  subject: string;
  text: string | null;
  html: string | null;
  messageId: string;
  headers: Record<string, string> | null;
  attachments: InboundAttachmentMeta[];
  receivedAt: string;
  status: InboundEmailStatus;
  pulledAt?: string;
};

const KEY_PREFIX = 'email:inbound:';
const SET_ALL = 'emails:inbound:all';
const SET_NEW = 'emails:inbound:new';

function key(id: string) {
  return `${KEY_PREFIX}${id}`;
}

export async function saveInboundEmail(data: ReceivedEmailPayload): Promise<StoredInboundEmail> {
  const record: StoredInboundEmail = {
    id: data.id,
    from: data.from,
    to: data.to ?? [],
    cc: data.cc ?? null,
    replyTo: data.reply_to ?? null,
    subject: data.subject ?? '',
    text: data.text ?? null,
    html: data.html ?? null,
    messageId: data.message_id ?? '',
    headers: data.headers ?? null,
    attachments: (data.attachments ?? []).map((a) => ({
      id: a.id,
      filename: a.filename,
      size: a.size,
      content_type: a.content_type,
    })),
    receivedAt: data.created_at || new Date().toISOString(),
    status: 'new',
  };

  await kv.set(key(record.id), record);
  await kv.sadd(SET_ALL, record.id);
  await kv.sadd(SET_NEW, record.id);

  return record;
}

export async function getInboundEmail(id: string): Promise<StoredInboundEmail | null> {
  return (await kv.get<StoredInboundEmail>(key(id))) ?? null;
}

export async function listInboundEmailIds(scope: 'new' | 'all' = 'new'): Promise<string[]> {
  const ids = (await kv.smembers(scope === 'new' ? SET_NEW : SET_ALL)) as string[];
  return ids.filter(Boolean);
}

export async function listInboundEmails(scope: 'new' | 'all' = 'new'): Promise<StoredInboundEmail[]> {
  const ids = await listInboundEmailIds(scope);
  if (ids.length === 0) return [];

  const rows = await Promise.all(ids.map((id) => kv.get<StoredInboundEmail>(key(id))));
  return rows
    .filter((r): r is StoredInboundEmail => Boolean(r))
    .sort((a, b) => (a.receivedAt < b.receivedAt ? 1 : -1));
}

export async function markInboundEmailsPulled(ids: string[]): Promise<number> {
  let count = 0;
  const pulledAt = new Date().toISOString();

  for (const id of ids) {
    const existing = await kv.get<StoredInboundEmail>(key(id));
    if (!existing) continue;
    const updated: StoredInboundEmail = {
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

export async function countNewInboundEmails(): Promise<number> {
  return (await kv.scard(SET_NEW)) ?? 0;
}
