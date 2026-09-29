# Production Deployment — Flash⚡- GTA VI

## Current target

The first public deployment should be completed without changing the approved application architecture.

Preferred sequence:

```text
Local validation
    ↓
Next.js production build
    ↓
Cloudflare Workers
    ↓
workers.dev smoke test
    ↓
Custom domain when available
```

## Cloudflare

Cloudflare Workers Free can be used for an initial public deployment within its current free-tier limits.

The project should not be rewritten as a static site solely to obtain a Pages subdomain.

For the existing Next.js App Router application, deployment tooling must be validated against the actual production build before publication.

## GoDaddy pricing note — 2026-09-29

The GoDaddy offer currently visible on its public site advertising a `.com` for `$0.01` refers to a domain promotion, not to web hosting. The public GoDaddy hosting page currently shows its entry Web Hosting plan from **C$9.19/month during the first three-year term** in the localized pricing view available during the audit.

The displayed hosting price is promotional and tied to a three-year initial term. Renewal pricing, taxes, currency, checkout-specific promotions, and eligibility must be confirmed in the final checkout before purchase.

Therefore:

```text
$0.01 ≠ GoDaddy web hosting
$0.01 = promotional domain price shown by GoDaddy
```

## Cost decision

A GoDaddy hosting purchase is not required merely to publish the application.

Cloudflare Workers can provide the initial hosting layer without a monthly hosting charge when usage remains within the free tier.

A custom `.com` domain is a separate purchase from hosting.

## Deployment gate

Before any paid deployment decision:

1. Install dependencies.
2. Run lint.
3. Run unit/component tests.
4. Run the production build.
5. Run E2E tests.
6. Validate the deployed application on mobile and desktop.
7. Confirm DNS, HTTPS, canonical URLs, sitemap, robots, and metadata.
8. Only then choose the final paid domain/hosting arrangement.
