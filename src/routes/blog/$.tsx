import { createFileRoute, redirect } from '@tanstack/react-router';

const redirectMap: Record<string, string> = {
  '2023-05-06-why-doesnt-autofill-work-on-my-form':
    '/posts/why-doesnt-autofill-work-on-my-form',
  '2022-12-22-adding-cognito-user-via-api': '/posts/adding-cognito-user-via-api',
  '2023-01-28-sentry-integration-woes-with-nextjs-flyio':
    '/posts/sentry-integration-woes-with-nextjs-flyio',
};

export const Route = createFileRoute('/blog/$')({
  beforeLoad: ({ params }) => {
    const splat = params._splat || '';
    const destination = redirectMap[splat];
    if (destination) {
      throw redirect({ to: destination, statusCode: 301 });
    }
    throw redirect({ to: '/', statusCode: 301 });
  },
});
