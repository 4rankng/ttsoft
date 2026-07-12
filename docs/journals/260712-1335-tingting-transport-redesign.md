---
date: 2026-07-12
topic: TingTing Transport product-first website redesign
status: completed
---

# TingTing Transport Product-First Website Redesign

## Context

The public site presented Ting Ting Soft as a broad software-services company, while the commercial priority is its Vietnamese transport-management product. The redesign needed to make TingTing Transport immediately understandable to fleet owners and transport-company directors without exposing authenticated demo data or making unsupported claims.

## What Happened

- Replaced the generic agency narrative with a product sales journey: transport-management hero, fragmented-operations problem, trip lifecycle, dispatch control, trip economics, profitability, fleet ecosystem, driver portal, product assurance, and demo conversion.
- Limited claims to verified TMS capabilities: trip dispatch, role-specific workflows, configurable fuel and allowance rules, expenses and settlements, receivables and payables, P&L views, fleet records, approvals, audit history, and the driver-facing portal.
- Kept the site as an in-place Vite-powered static implementation. Product screens are deterministic HTML/CSS recreations, so layouts remain responsive and no authenticated screenshots or private records ship publicly.
- Regenerated the 1200×630 social preview as an anonymized TingTing Transport marketing image and aligned page title, description, Open Graph, Twitter, and structured-data metadata with the product positioning.
- Preserved the Netlify form contract: form name `yeu-cau-du-an`, hidden `form-name`, honeypot `truong-khong-dien`, native POST behavior, and `/cam-on.html` redirect. Added TMS-specific need, buyer-role, and fleet-size fields.
- Reworked motion around product-story hooks while keeping content visible without GSAP. Added reduced-motion safeguards, intrinsic product frames, responsive crops, improved mobile navigation, Escape-to-close behavior, and focus restoration.

## Reflection

The strongest change was narrowing the promise. A capability-led product story is more credible than generic transformation language or fabricated efficiency metrics, and it lets the interface itself demonstrate value. Recreating the audited UI also provides a safer and more maintainable marketing surface than embedding live product captures.

## Decisions

- Position **Ting Ting Soft** as the company and **TingTing Transport** as the product.
- Optimize the page for fleet owners and directors, with operations and accounting as supporting audiences.
- Use capability-based proof only; exclude pricing, ROI, implementation time, integrations, uptime, certifications, customer logos, testimonials, and other unverified claims.
- Keep product visuals anonymized and code-native; use generated raster imagery only for public marketing assets such as the OG image.
- Preserve the existing static architecture and Netlify conversion path rather than introducing a framework, CMS, backend, or direct demo link.

## Verification

- `npm run build` completes successfully with Vite.
- The generated OG image is a valid 1200×630 PNG.
- Static inspection confirms the canonical metadata, TMS JSON-LD, form name, hidden form field, honeypot, native POST target, and product-qualified fields are present.
- The page defaults to visible content when animation dependencies are unavailable and explicitly honors `prefers-reduced-motion`.

## Next

- Validate a real submission on a Netlify deploy preview before launch.
- Re-run mobile and desktop visual QA after deployment so production font loading, social sharing, and performance can be checked in the final hosting environment.
