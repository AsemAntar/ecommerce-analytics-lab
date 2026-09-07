# Ecommerce Analytics Lab

A free static ecommerce practice site for learning:

- Google Tag Manager
- GA4 event implementation
- GA4 ecommerce events
- Custom events and parameters
- User-ID and user properties
- DebugView / GTM Preview validation
- Measurement Protocol
- GA4 Data API
- GA4 BigQuery export
- UI ↔ BigQuery reconciliation
- HyperLogLog++ / HLL_COUNT practice

## Important design choice

The website is intentionally **not instrumented**.

All user interactions call `labAction(action, payload)` in `assets/app.js`.
That function currently writes actions to the browser console only.

Your task is to decide which actions deserve analytics tracking and implement the
correct dataLayer / GTM / GA4 setup yourself.

## Run locally

You can open `index.html` directly, but a simple local web server is better.

Python:
`python -m http.server 8000`

Then visit:
`http://localhost:8000`

## Deploy for free with GitHub Pages

1. Create a GitHub repository, for example `ecommerce-analytics-lab`.
2. Upload all files from this folder to the repository root.
3. In GitHub, open Settings → Pages.
4. Under Build and deployment, publish from the main branch/root.
5. GitHub will provide a public HTTPS URL.
6. Add your GTM container to every page through the shared HTML template manually
   or edit each generated HTML page.

## Suggested implementation order

1. Install GTM.
2. Create a GA4 property + web data stream.
3. Configure the GA4 Configuration / Google tag through GTM.
4. Validate page_view.
5. Implement ecommerce dataLayer pushes.
6. Implement GA4 recommended ecommerce events.
7. Add useful custom parameters / item parameters.
8. Register only the custom definitions needed in GA4 UI.
9. Add User-ID after login.
10. Add user properties selectively.
11. Implement search, wishlist, promotion and coupon measurement.
12. Validate purchase deduplication.
13. Build Measurement Protocol test payloads.
14. Link GA4 to BigQuery.
15. Reconcile UI, Data API and BigQuery.

See `docs/12-week-practical-lab.md`.
