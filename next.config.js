/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: () => {
    const redirectMap = {
      '/blog/2023-05-06-why-doesnt-autofill-work-on-my-form':
        '/posts/why-doesnt-autofill-work-on-my-form',
      '/blog/2022-12-22-adding-cognito-user-via-api':
        '/posts/adding-cognito-user-via-api',
      '/blog/2023-01-28-sentry-integration-woes-with-nextjs-flyio':
        '/posts/sentry-integration-woes-with-nextjs-flyio',
    };

    return Object.keys(redirectMap).map((source) => ({
      source,
      destination: redirectMap[source],
      permanent: true,
    }));
  },
};

module.exports = nextConfig;
