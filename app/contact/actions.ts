'use server';

const SMTP2GO_API_KEY = process.env.SMTP2GO_API_KEY;
const EMAIL_TO = process.env.EMAIL_TO;

export interface FormState {
  message: string;
  sent: boolean;
}

export async function sendContactEmail(
  prevState: FormState | undefined,
  data: FormData,
): Promise<FormState> {
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const message = data.get('message') as string;

  // Basic validation (can be expanded)
  if (!name || !email || !message) {
    return { message: 'All fields are required.', sent: false };
  }

  try {
    const response = await fetch('https://api.smtp2go.com/v3/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        api_key: SMTP2GO_API_KEY,
        to: [EMAIL_TO],
        sender: `${name} <hi@amplify.hr>`, // Using a verified sender domain as per SMTP2Go best practices
        subject: `Inquiry from darios.blog by ${name}`,
        text_body: message,
        custom_headers: [{ header: 'Reply-To', value: email }],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('SMTP2Go API Error:', errorData);
      return { message: `Failed to send email. API Error: ${response.statusText}`, sent: false };
    }

    return { message: 'Message sent successfully!', sent: true };
  } catch (e: unknown) {
    console.error('Error sending email:', e);
    if (e instanceof Error) {
      return { message: `Failed to send email: ${e.message}`, sent: false };
    }
    return { message: 'An unknown error occurred while sending the email.', sent: false };
  }
}
