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

  async rewrites() {
    return [
      {
        source: '/ingest/static/:path*',
        destination: 'https://eu-assets.i.posthog.com/static/:path*',
      },
      {
        source: '/ingest/:path*',
        destination: 'https://eu.i.posthog.com/:path*',
      },
      {
        source: '/ingest/flags',
        destination: 'https://eu.i.posthog.com/flags',
      },
    ];
  },

  // This is required to support PostHog trailing slash API requests
  skipTrailingSlashRedirect: true,
};

module.exports = nextConfig;
