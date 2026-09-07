# Analytics QA Checklist

## GTM
- [ ] Container installed once
- [ ] Preview connects to every page
- [ ] No duplicate GA4 configuration / Google tag firing
- [ ] Ecommerce variables resolve correctly
- [ ] Trigger conditions are precise

## GA4
- [ ] DebugView receives expected events
- [ ] Recommended event names use exact spelling
- [ ] currency accompanies value where required
- [ ] purchase has a stable transaction_id
- [ ] items array contains correct item_id / item_name / price / quantity
- [ ] refunds reference the original transaction
- [ ] no accidental PII is sent

## BigQuery
- [ ] event_name matches expectation
- [ ] event_params types are correct
- [ ] items are populated at item grain
- [ ] user_pseudo_id is available
- [ ] user_id appears only when logged in
- [ ] ga_session_id is inspectable
- [ ] purchase revenue reconciles to the test order

## Reconciliation
- [ ] Compare mature dates, not just today
- [ ] Match property timezone
- [ ] Match filters
- [ ] Match metric definition
- [ ] Match dimensions/scope
- [ ] Check reporting identity
- [ ] Check HLL++ approximation
- [ ] Check sampling / thresholding / (other)
- [ ] Check attribution processing
- [ ] Check modeled data / Consent Mode
