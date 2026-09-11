import { NextRequest, NextResponse } from 'next/server';
import { sendCateringRequestEmail } from '@/lib/email';

const REQUIRED = [
  'name',
  'email',
  'phone',
  'eventDate',
  'headcount',
  'items',
  'fulfillment',
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const payload = {
      name: asString(body.name),
      organization: asString(body.organization),
      email: asString(body.email),
      phone: asString(body.phone),
      eventDate: asString(body.eventDate),
      headcount: asString(body.headcount),
      items: asString(body.items),
      fulfillment: asString(body.fulfillment),
      notes: asString(body.notes),
    };

    const missing = REQUIRED.filter((field) => !payload[field]);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(', ')}` },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(payload.email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    const headcount = Number.parseInt(payload.headcount, 10);
    if (!Number.isFinite(headcount) || headcount < 1) {
      return NextResponse.json(
        { error: 'Headcount must be a number of 1 or more' },
        { status: 400 }
      );
    }

    await sendCateringRequestEmail(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Catering request error:', error);
    return NextResponse.json(
      { error: 'Failed to send request. Please try again.' },
      { status: 500 }
    );
  }
}
