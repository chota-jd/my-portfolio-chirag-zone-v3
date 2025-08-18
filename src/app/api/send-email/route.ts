import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.RESEND_FROM_EMAIL;
const toEmail = process.env.RESEND_TO_EMAIL || process.env.RESEND_FROM_EMAIL;

if (!resendApiKey) {
	console.warn('RESEND_API_KEY is not set. Email sending will fail.');
}

const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function POST(request: Request) {
	try {
		const body = await request.json();
		const { name, email, subject, message } = body ?? {};

		if (!name || !email || !subject || !message) {
			return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
		}

		if (!fromEmail || !toEmail || !resend) {
			return NextResponse.json({ error: 'Email service not configured' }, { status: 500 });
		}

		const emailSubject = `[Portfolio] ${subject}`;
		const html = `
			<div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; line-height: 1.6; color: #111">
				<h2>New contact message</h2>
				<p><strong>From:</strong> ${name} &lt;${email}&gt;</p>
				<p><strong>Subject:</strong> ${subject}</p>
				<hr />
				<p style="white-space: pre-wrap">${message}</p>
			</div>
		`;

		const { data, error } = await resend.emails.send({
			from: fromEmail,
			to: [toEmail],
			subject: emailSubject,
			html,
			replyTo: [email]
		});

		if (error) {
			return NextResponse.json({ error: error.message || 'Failed to send email' }, { status: 500 });
		}

		return NextResponse.json({ success: true, id: data?.id });
	} catch (err) {
		console.error('Email send error', err);
		return NextResponse.json({ error: 'Unexpected server error' }, { status: 500 });
	}
}