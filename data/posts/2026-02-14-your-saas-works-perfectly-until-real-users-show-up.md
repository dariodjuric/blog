---
title: Your SaaS works perfectly, until real users show up
tags: ['SaaS', 'React', 'Next.js']
summary: Your SaaS works great until real humans (and their ad-blockers, auto-translators, and bot friends) prove you wrong.
---

You've written clean code, set up CI/CD, and deployed to production. Everything works perfectly: on your machine, on your network, in your browser. Then real users show up, and suddenly nothing works the way you expected.

I have been working with a few colleagues on [MyArchitectAI](https://myarchitectai.com/), a cloud-based AI rendering tool for architects and interior designers that turns sketches or CAD exports into photorealistic images. Working on this kind of public-facing product is very different from working in closed environments where the code you write lives behind layers of abstraction, far from the end user. A popular, public-facing product exposes you to a whole different set of problems.

Here are some of them.

## People really use the browser's auto-translate feature

This is a fun one. Honestly, I don't know how we would have figured out these types of issues without having access to [PostHog's session replay](https://posthog.com/session-replay) feature. Since the start of the project, we've been using [PostHog's error tracking](https://posthog.com/docs/error-tracking) to track uncaught errors in the app. As the app was getting more popular, we started seeing more and more reports of the following React error:

```
Failed to execute 'removeChild' on 'Node': The node to be removed is not a child of this node
```

However, we couldn't figure out why until we watched the session replays to see exactly what the user was seeing. That's when we realized the issue only affected users who had the browser's auto-translate feature enabled (and it wasn’t a small number of such users, mind you).

Of course, we could have easily set [`translate=no`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/translate) on the body element and disabled the auto-translate feature altogether. But this would have impaired the user experience, as most users enabled this on purpose because they were not English speakers. As it turned out, Chrome Translate worked by replacing text nodes with `<font>` elements containing translated text, causing React's Virtual DOM to lose track of original nodes during updates like conditional rendering or re-renders. This triggers DOM exceptions such as the one mentioned above, or similar messages. In a Next.js app, if this error is not caught in an error boundary, it would completely crash the app!

Unfortunately, there is still not a straightforward fix and these kinds of errors have to be taken care of on a case-by-case basis. Guo Yunhe has written about this in the past and [proposed some solutions](https://guoyunhe.me/en/2019/06/02/fix-react-issues-with-google-translate/). We have also found that using conditional CSS display instead of conditional JSX helps, as in that case React would not lose track of the DOM nodes.

## People also really do use ad-blockers

I know what you might be thinking. But no, we did not serve any ads to our customers in the app. However, ads are not the only thing that ad-blockers may mess up. They also might interfere with analytics that your marketing team may rely on (such as [HubSpot](https://www.hubspot.com/)), affiliate marketing programs (such as [PromoteKit](https://www.promotekit.com/)), or even feature flags that your development team might rely on! Yes, if you happen to be using [PostHog's feature flags](https://posthog.com/docs/feature-flags) on the frontend, you might see that the flag simply defaults to the default value for people using ad blockers.

There's no easy solution to this either, other than simply accepting that some of your analytics might not give a full picture. When it comes to feature flags and PostHog, PostHog actually [has some suggestions](https://posthog.com/docs/feature-flags/best-practices) on how to work around this (such as using a reverse proxy for PostHog's endpoint), but you might also consider evaluating PostHog feature flags on the backend and serving the results to the frontend, bypassing ad blockers entirely.

## Many users have slow, unreliable, or firewalled connections

You might have a fiber optic Internet connection at home, but many of your users will not, especially if you are offering your SaaS to the whole world. Of course, you cannot speed up the user's Internet connection, but you can accommodate for lower speeds by making sure to prioritize fast loads, smooth interactions, and efficient resource use.

We used [Next.js](https://nextjs.org/) deployed on [Vercel](https://vercel.com/), so we could benefit a lot from the framework's features (such as server rendering and built-in image optimization) as well as the platform's benefits (such as the worldwide edge delivery network), but our PostHog error tracking was still reporting occasional timeouts and failed fetches. In the end, there is no perfect solution, but it's good to be mindful of your slower users when developing.

## You cannot count on just the user clicking that link in the email you sent

There are a lot of bad actors out there who send out emails with disguised malicious links, and consequently there are many built-in tools in email clients that try to detect such emails. We were definitely not a bad actor, yet we cannot escape the fact that our emails were checked by the same spam filters.

For that reason, you need to make sure that your email links do not have any state-modifying logic (e.g. a token that is invalidated on click), because some tools, such as Microsoft Outlook, will actually click that link to verify that it's not malicious. And if you had a one-time token there, then that token is lost. If you find yourself in the same situation, one approach you can consider is routing email links to a non-modifying page that requires user interaction to consume the token (such as a confirmation page).

## Expect bots... many of them. And fraudsters too.

As soon as you protect your site with a login screen, and especially if it has a username and a password (and not a single sign-on link via some other provider), you can expect bots attempting to log in. These bots systematically probe login endpoints to test stolen or guessed credentials. Common intents include credential stuffing, using username-password pairs from data breaches to hijack accounts, and brute-force attacks that cycle through password combinations.

Furthermore, if you have Stripe integration, you can expect card testers to start using the site. Similar to probing stolen or guessed credentials, card testers validate stolen credit card details against Stripe-powered payment systems. Their end goal is to identify live, usable cards for resale on dark web markets or for direct fraudulent purchases elsewhere. Stripe has really good mechanisms for detecting such cases, and might even block your account if they see many card testers coming from the site.

Again, there is no easy solution to this other than adding friction to the checkout, such as requiring that the users are registered, asking that they provide more information such as their address, etc. Stripe has a [good deal of documentation](https://docs.stripe.com/radar/optimize-fraud-signals) on that. One, often overlooked suggestion, is having [Stripe.js](https://docs.stripe.com/radar/optimize-fraud-signals#include-stripe-js) included on every page of the site, and not just on the checkout. This helps Stripe to collect device characteristics and activity indicators across the entire site (e.g., mouse movements, page time) via periodic requests to Stripe's endpoints, powering tools such as Stripe Radar, their anti-fraud tool.

## Conclusion

The common thread here is that your users will always interact with your app in ways you didn't anticipate, using different browsers, networks, and background tools, and even as bad actors testing stolen data.

The best thing you can do is invest in good observability early on, so that when the unexpected inevitably happens, you're not flying blind.
