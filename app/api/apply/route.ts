import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import type { EmploymentApplicationPayload } from '@/lib/email';
import {
  listApplications,
  markApplicationsPulled,
  saveApplication,
} from '@/lib/applications';

const REQUIRED = ['fullName', 'phone', 'email', 'employmentType', 'over18', 'workAuthorized'] as const;

function authorized(req: NextRequest): boolean {
  const secret = process.env.APPLICATIONS_PULL_SECRET;
  if (!secret) return false;
  const header = req.headers.get('authorization') || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  const alt = req.headers.get('x-applications-secret') || '';
  return bearer === secret || alt === secret;
}

function hashIp(ip: string | null): string | undefined {
  if (!ip) return undefined;
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

/** Pull applications (protected). Default: only unpulled/new. */
export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const scope = searchParams.get('status') === 'all' ? 'all' : 'new';
  const mark = searchParams.get('mark') === '1' || searchParams.get('mark') === 'true';

  const applications = await listApplications(scope);

  if (mark && applications.length > 0) {
    await markApplicationsPulled(applications.map((a) => a.id));
  }

  return NextResponse.json({
    count: applications.length,
    scope,
    markedPulled: mark,
    applications,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Honeypot — bots fill hidden fields
    if (body.company || body.website) {
      return NextResponse.json({ success: true });
    }

    for (const key of REQUIRED) {
      if (!body[key] || String(body[key]).trim() === '') {
        return NextResponse.json(
          { error: `Missing required field: ${key}` },
          { status: 400 }
        );
      }
    }

    if (!body.certification) {
      return NextResponse.json(
        { error: 'You must certify that the information is true and accurate.' },
        { status: 400 }
      );
    }

    const email = String(body.email).trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const positions = Array.isArray(body.positions)
      ? body.positions.map(String).filter(Boolean)
      : body.position
        ? [String(body.position)]
        : [];

    if (positions.length === 0) {
      return NextResponse.json(
        { error: 'Select at least one position' },
        { status: 400 }
      );
    }

    const availabilityDays = Array.isArray(body.availabilityDays)
      ? body.availabilityDays.map(String).filter(Boolean)
      : [];

    const payload: EmploymentApplicationPayload = {
      fullName: String(body.fullName).trim(),
      phone: String(body.phone).trim(),
      email,
      address: String(body.address || '').trim(),
      city: String(body.city || '').trim(),
      state: String(body.state || 'AZ').trim(),
      zip: String(body.zip || '').trim(),
      positions,
      employmentType: String(body.employmentType).trim(),
      availabilityDays,
      availabilityNotes: String(body.availabilityNotes || '').trim() || undefined,
      startDate: String(body.startDate || '').trim() || undefined,
      over18: String(body.over18).trim(),
      workAuthorized: String(body.workAuthorized).trim(),
      previouslyEmployed: String(body.previouslyEmployed || 'No').trim(),
      heardAbout: String(body.heardAbout || '').trim() || undefined,
      workHistory: String(body.workHistory || '').trim() || undefined,
      education: String(body.education || '').trim() || undefined,
      references: String(body.references || '').trim() || undefined,
      whyMaza: String(body.whyMaza || '').trim() || undefined,
      emergencyName: String(body.emergencyName || '').trim() || undefined,
      emergencyPhone: String(body.emergencyPhone || '').trim() || undefined,
      certification: Boolean(body.certification),
    };

    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded?.split(',')[0]?.trim() || null;

    const saved = await saveApplication(payload, {
      userAgent: req.headers.get('user-agent') || undefined,
      ipHash: hashIp(ip),
    });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (error) {
    console.error('Employment application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again or call the store.' },
      { status: 500 }
    );
  }
}
