# 12-Week Practical Lab

## Week 1 — GTM + GA4 Foundation
- [ ] Deploy the site
- [ ] Create a GTM account/container
- [ ] Create a GA4 property and web stream
- [ ] Install GTM
- [ ] Configure the Google tag through GTM
- [ ] Validate page_view in GTM Preview and GA4 DebugView
- [ ] Inspect every `labAction()` in DevTools
Deliverable: working GTM + GA4 base implementation and an event inventory.

## Week 2 — Ecommerce Data Layer
- [ ] Implement view_item_list
- [ ] Implement select_item
- [ ] Implement view_item
- [ ] Implement add_to_cart
- [ ] Implement remove_from_cart
- [ ] Implement view_cart
- [ ] Implement begin_checkout
- [ ] Implement add_shipping_info
- [ ] Implement add_payment_info
- [ ] Implement purchase
- [ ] Implement refund
- [ ] Implement view_promotion / select_promotion
Deliverable: ecommerce event specification + validated dataLayer.

## Week 3 — Identity + Custom Definitions
- [ ] Add user_id after demo login
- [ ] Clear/handle identity correctly after logout
- [ ] Evaluate customer_type and loyalty_tier as user properties
- [ ] Add custom item attributes where justified
- [ ] Register only necessary custom definitions
Deliverable: identity diagram + custom-definition governance matrix.

## Week 4 — Measurement Protocol
- [ ] Create an API secret
- [ ] Build a valid purchase payload
- [ ] Build refund / offline purchase payloads
- [ ] Use the validation endpoint
- [ ] Test timestamp/session continuity decisions
Deliverable: Measurement Protocol payload pack + validation log.

## Week 5 — Sessions + Acquisition
- [ ] Compare session_start with distinct session keys
- [ ] Test traffic source behavior
- [ ] Build a business-specific channel grouping
- [ ] Test login during an active session
Deliverable: session SQL + acquisition scope map.

## Week 6 — Data API
- [ ] Authenticate with the GA4 Data API
- [ ] Pull users, sessions, revenue and transactions
- [ ] Pull channel performance
- [ ] Pull product performance
- [ ] Log property quota consumption
Deliverable: reusable Python reporting scripts.

## Week 7 — Advanced GA4 ↔ BigQuery Reconciliation
- [ ] Compare UI, Data API and BigQuery
- [ ] Exact COUNT(DISTINCT)
- [ ] APPROX_COUNT_DISTINCT
- [ ] HLL_COUNT.INIT / EXTRACT / MERGE
- [ ] Reproduce GA4 HLL++ precision for Users and Sessions
- [ ] Check scope, identity, sampling, thresholding and modeling
Deliverable: reconciliation handbook + HLL++ SQL library.

## Week 8 — Raw Export Schema
- [ ] Inspect your own events_YYYYMMDD tables
- [ ] Map event_params
- [ ] Map items
- [ ] Inspect ecommerce fields
- [ ] Inspect traffic-source fields
Deliverable: schema map based on your own lab property.

## Week 9 — Nested Data + UNNEST
- [ ] Extract ga_session_id
- [ ] Extract page_location
- [ ] Extract source / medium / campaign
- [ ] Flatten items
- [ ] Build order-item grain dataset
Deliverable: reusable UNNEST query library.

## Week 10 — Query Performance
- [ ] Compare wildcard queries with/without _TABLE_SUFFIX
- [ ] Measure bytes scanned
- [ ] Create a partitioned derived table
- [ ] Test clustering
- [ ] Optimize five queries
Deliverable: performance benchmark.

## Week 11 — Query Diagnostics
- [ ] Read execution graphs
- [ ] Identify shuffle-heavy stages
- [ ] Query INFORMATION_SCHEMA.JOBS
- [ ] Build job-monitoring SQL
Deliverable: query diagnostic report.

## Week 12 — Ecommerce Analytics Mart
- [ ] stg_events
- [ ] stg_sessions
- [ ] stg_items
- [ ] fact_sessions
- [ ] fact_orders
- [ ] fact_order_items
- [ ] dim_customer
- [ ] dim_product
- [ ] dim_channel
- [ ] funnel mart
- [ ] retention mart
- [ ] LTV mart
Deliverable: complete ecommerce analytics model.
