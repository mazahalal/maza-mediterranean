import { Resend } from 'resend';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function line(label: string, value?: string | null) {
  if (!value) return '';
  return `<p style="margin:0 0 8px;"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`;
}

function block(label: string, value?: string | null) {
  if (!value) return '';
  return `<p style="margin:12px 0 4px;"><strong>${escapeHtml(label)}</strong></p><p style="margin:0 0 12px; white-space:pre-wrap;">${escapeHtml(value).replace(/\n/g, '<br>')}</p>`;
}

export async function sendContactEmail({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  const resend = getResend();
  return resend.emails.send({
    from: 'Maza Contact <hello@mazahalalfood.com>',
    to: ['info@mazahalalfood.com'],
    replyTo: email,
    subject: `New Contact: ${name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
    `,
  });
}

export type EmploymentApplicationPayload = {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  positions: string[];
  employmentType: string;
  availabilityDays: string[];
  availabilityNotes?: string;
  startDate?: string;
  over18: string;
  workAuthorized: string;
  previouslyEmployed: string;
  heardAbout?: string;
  workHistory?: string;
  education?: string;
  references?: string;
  whyMaza?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  certification: boolean;
};

export async function sendEmploymentApplicationEmail(data: EmploymentApplicationPayload) {
  const resend = getResend();
  const subjectName = data.fullName.trim() || 'Applicant';
  const positions = data.positions?.length ? data.positions.join(', ') : 'Not specified';
  const days = data.availabilityDays?.length ? data.availabilityDays.join(', ') : 'Not specified';

  return resend.emails.send({
    from: 'Maza Careers <hello@mazahalalfood.com>',
    to: ['info@mazahalalfood.com'],
    replyTo: data.email,
    subject: `New Job Application: ${subjectName} — ${positions}`,
    html: `
      <div style="font-family:Arial,sans-serif;color:#111;line-height:1.45;">
        <h2 style="margin:0 0 12px;">New Employment Application</h2>
        <p style="margin:0 0 16px;color:#444;">Submitted via mazahalalfood.com/careers</p>
        <h3 style="margin:20px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">Applicant</h3>
        ${line('Full name', data.fullName)}
        ${line('Phone', data.phone)}
        ${line('Email', data.email)}
        ${line('Address', [data.address, data.city, data.state, data.zip].filter(Boolean).join(', '))}
        <h3 style="margin:20px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">Position & Availability</h3>
        ${line('Position(s)', positions)}
        ${line('Employment type', data.employmentType)}
        ${line('Days available', days)}
        ${line('Availability notes', data.availabilityNotes)}
        ${line('Earliest start date', data.startDate)}
        ${line('18 or older', data.over18)}
        ${line('Authorized to work in the U.S.', data.workAuthorized)}
        ${line('Previously employed by MAZA', data.previouslyEmployed)}
        ${line('How they heard about us', data.heardAbout)}
        <h3 style="margin:20px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">Background</h3>
        ${block('Work history', data.workHistory)}
        ${block('Education', data.education)}
        ${block('References', data.references)}
        ${block('Why MAZA', data.whyMaza)}
        <h3 style="margin:20px 0 8px;border-bottom:1px solid #ddd;padding-bottom:4px;">Emergency contact</h3>
        ${line('Name', data.emergencyName)}
        ${line('Phone', data.emergencyPhone)}
        <p style="margin:20px 0 0;color:#666;font-size:13px;">Applicant certified the information is true and accurate: ${data.certification ? 'Yes' : 'No'}</p>
      </div>
    `,
  });
}