import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';
import { logger, sanitizeEmail } from '@/lib/logger';

export const contactFormSchema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.string().email('This email appears invalid.'),
  message: z
    .string()
    .min(1, 'Please enter your message.')
    .refine(
      (value) => value.trim().split(/\s+/).length >= 2,
      "That's a very short message — did you mean to write something more?",
    ),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;

const sendEmail = (fromName: string, fromEmail: string, message: string) => {
  return fetch('https://api.smtp2go.com/v3/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      api_key: process.env.SMTP2GO_API_KEY,
      to: [process.env.EMAIL_TO],
      sender: `${fromName} <hi@amplify.hr>`,
      subject: 'Inquiry from darios.blog',
      text_body: message,
      custom_headers: [{ header: 'Reply-To', value: fromEmail }],
    }),
  });
};

export const submitContactForm = createServerFn({ method: 'POST' })
  .inputValidator(contactFormSchema)
  .handler(async ({ data }) => {
    await sendEmail(data.name, data.email, data.message);

    logger.info(
      { email: sanitizeEmail(data.email) },
      'Contact form message sent',
    );

    return { sent: true };
  });
