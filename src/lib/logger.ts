import pino from 'pino';

export function sanitizeEmail(email: string): string {
  const atIndex = email.indexOf('@');
  if (atIndex <= 0) {
    return email;
  }

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  const maskedLocal =
    local.length <= 2
      ? local
      : local[0] + '*'.repeat(local.length - 2) + local[local.length - 1];

  const maskedDomain =
    domain.length <= 2
      ? domain
      : domain[0] + '*'.repeat(domain.length - 2) + domain[domain.length - 1];

  return `${maskedLocal}@${maskedDomain}`;
}

export const logger = pino({ name: 'darios-blog' });
