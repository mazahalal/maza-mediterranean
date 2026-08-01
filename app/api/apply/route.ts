import { NextRequest, NextResponse } from 'next/server';
import { sendEmploymentApplicationEmail } from '@/lib/email';

const REQUIRED = ['fullName', 'phone', 'email', 'employmentType', 'over18', 'workAuthorized'] as const;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    await sendEmploymentApplicationEmail({
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
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Employment application error:', error);
    return NextResponse.json(
      { error: 'Failed to submit application. Please try again or call the store.' },
      { status: 500 }
    );
  }
}
