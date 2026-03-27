import { logger, sanitizeEmail } from '@/lib/logger';
import { createFileRoute } from '@tanstack/react-router';

const SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY;
const EMAIL_TO = process.env.EMAIL_TO;

const sendEmail = (
  fromName: string,
  fromEmail: string,
  subject: string,
  message: string,
) => {
  return fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      api_key: SMTP2GO_API_KEY,
      to: [EMAIL_TO],
      sender: `${fromName} <hi@amplify.hr>`,
      subject: subject || 'Inquiry from darios.blog',
      text_body: message,
      custom_headers: [{ header: 'Reply-To', value: fromEmail }],
    }),
  });
};

export const Route = createFileRoute('/api/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const data = await request.json();
        const fromName = [data.firstName, data.lastName]
          .filter(Boolean)
          .join(' ');

        await sendEmail(fromName, data.email, data.subject, data.message);

        logger.info(
          { email: sanitizeEmail(data.email), subject: data.subject },
          'Contact form message sent',
        );

        return new Response(JSON.stringify({ sent: true }), {
          headers: { 'Content-Type': 'application/json' },
        });
      },
    },
  },
});
