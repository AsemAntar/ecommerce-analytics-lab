
const PRODUCTS = [{"id": "SKU-001", "name": "Velocity Runner", "brand": "Northstar", "category": "Footwear", "variant": "Black / 42", "price": 89.99, "collection": "Performance", "margin_band": "High", "stock_status": "In Stock"}, {"id": "SKU-002", "name": "Everyday Hoodie", "brand": "Northstar", "category": "Apparel", "variant": "Navy / M", "price": 59.99, "collection": "Essentials", "margin_band": "Medium", "stock_status": "In Stock"}, {"id": "SKU-003", "name": "Trail Backpack", "brand": "Summit", "category": "Accessories", "variant": "Olive / 24L", "price": 74.99, "collection": "Outdoor", "margin_band": "High", "stock_status": "Low Stock"}, {"id": "SKU-004", "name": "Performance Tee", "brand": "Northstar", "category": "Apparel", "variant": "White / L", "price": 29.99, "collection": "Performance", "margin_band": "Low", "stock_status": "In Stock"}, {"id": "SKU-005", "name": "Recovery Bottle", "brand": "Summit", "category": "Accessories", "variant": "Blue / 750ml", "price": 24.99, "collection": "Essentials", "margin_band": "Medium", "stock_status": "In Stock"}, {"id": "SKU-006", "name": "City Sneaker", "brand": "Northstar", "category": "Footwear", "variant": "Grey / 43", "price": 99.99, "collection": "Urban", "margin_band": "High", "stock_status": "In Stock"}];

function readJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch(e) { return fallback; }
}
function writeJSON(key, value) { localStorage.setItem(key, JSON.stringify(value)); }

function labAction(action, payload={}) {
  // ANALYTICS TODO:
  // This function is intentionally NOT pushing to dataLayer or GA4.
  // During the lab, decide whether this action should produce a GA4 recommended
  // event, custom event, user property, or no analytics event at all.
  console.log("[LAB ACTION]", action, payload);
}

function getCart() { return readJSON("lab_cart", []); }
function saveCart(cart) { writeJSON("lab_cart", cart); updateHeader(); }
function getWishlist() { return readJSON("lab_wishlist", []); }
function saveWishlist(list) { writeJSON("lab_wishlist", list); }
function getUser() { return readJSON("lab_user", null); }

function currency(v) { return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(v); }

function updateHeader() {
  const cart = getCart();
  const count = cart.reduce((s,x)=>s+x.quantity,0);
  document.querySelectorAll("[data-cart-count]").forEach(el=>el.textContent=count);
  const user = getUser();
  document.querySelectorAll("[data-user-state]").forEach(el=>el.textContent=user ? user.name : "Guest");
}

function addToCart(id, quantity=1) {
  const p = PRODUCTS.find(x=>x.id===id); if(!p) return;
  const cart = getCart();
  const found = cart.find(x=>x.id===id);
  if(found) found.quantity += Number(quantity); else cart.push({id,quantity:Number(quantity)});
  saveCart(cart);
  labAction("add_to_cart_click", {product:p,quantity:Number(quantity)});
  alert(`${p.name} added to cart`);
}

function removeFromCart(id) {
  const p=PRODUCTS.find(x=>x.id===id);
  saveCart(getCart().filter(x=>x.id!==id));
  labAction("remove_from_cart_click", {product:p});
  renderCart();
}

function updateQty(id, qty) {
  const cart=getCart(); const found=cart.find(x=>x.id===id);
  if(found) found.quantity=Math.max(1,Number(qty)||1);
  saveCart(cart); labAction("cart_quantity_change", {id,quantity:found?.quantity}); renderCart();
}

function toggleWishlist(id) {
  const p=PRODUCTS.find(x=>x.id===id); let list=getWishlist();
  if(list.includes(id)) list=list.filter(x=>x!==id); else list.push(id);
  saveWishlist(list); labAction("wishlist_toggle", {product:p,is_wishlisted:list.includes(id)});
  alert(list.includes(id) ? "Added to wishlist" : "Removed from wishlist");
}

function renderProducts(filter="") {
  const el=document.querySelector("#product-grid"); if(!el) return;
  const q=filter.trim().toLowerCase();
  const data=PRODUCTS.filter(p=>!q || [p.name,p.brand,p.category,p.collection].join(" ").toLowerCase().includes(q));
  el.innerHTML=data.map((p,i)=>`
    <article class="card" data-product-id="${p.id}" data-list-index="${i+1}">
      <a href="product.html?id=${encodeURIComponent(p.id)}">
        <div class="product-img">${p.category[0]}</div>
      </a>
      <div class="card-body">
        <div class="small muted">${p.brand} · ${p.category}</div>
        <h3><a href="product.html?id=${encodeURIComponent(p.id)}">${p.name}</a></h3>
        <div class="price">${currency(p.price)}</div>
        <div class="row">
          <button class="btn-primary" onclick="addToCart('${p.id}')">Add to cart</button>
          <button class="btn-secondary" onclick="toggleWishlist('${p.id}')">Wishlist</button>
        </div>
      </div>
    </article>`).join("");
  labAction("product_list_rendered", {query:q,item_count:data.length});
}

function initProduct() {
  const root=document.querySelector("#product-detail"); if(!root) return;
  const id=new URLSearchParams(location.search).get("id") || "SKU-001";
  const p=PRODUCTS.find(x=>x.id===id) || PRODUCTS[0];
  root.innerHTML=`
    <div class="product-img" style="height:390px">${p.category[0]}</div>
    <div>
      <div class="muted">${p.brand} · ${p.category} · ${p.collection}</div>
      <h1>${p.name}</h1><div class="price">${currency(p.price)}</div>
      <p class="muted">Variant: ${p.variant} · Stock: ${p.stock_status}</p>
      <p>This demo PDP exists for analytics practice. Use it to implement item-level parameters, list attribution, custom dimensions, and ecommerce events.</p>
      <div class="field" style="max-width:120px"><label>Quantity</label><input id="pdp-qty" type="number" min="1" value="1"></div>
      <div class="row">
        <button class="btn-primary" onclick="addToCart('${p.id}',document.querySelector('#pdp-qty').value)">Add to cart</button>
        <button class="btn-secondary" onclick="toggleWishlist('${p.id}')">Add to wishlist</button>
      </div>
      <div class="promo">
        <strong>Performance Week: 10% off</strong><br>
        <span class="muted">Promotion ID: PROMO-PERF-10</span><br><br>
        <button class="btn-secondary" onclick="labAction('promotion_click',{promotion_id:'PROMO-PERF-10',creative_name:'PDP Banner'})">View promotion</button>
      </div>
    </div>`;
  document.title=p.name+" | Analytics Lab";
  labAction("product_page_loaded", {product:p});
}

function cartDetailed() {
  return getCart().map(x=>({...PRODUCTS.find(p=>p.id===x.id),quantity:x.quantity})).filter(x=>x.id);
}
function cartTotals() {
  const items=cartDetailed(); const subtotal=items.reduce((s,x)=>s+x.price*x.quantity,0);
  const coupon=localStorage.getItem("lab_coupon")==="LAB10" ? subtotal*.10 : 0;
  const shipping=items.length ? 7.5 : 0;
  return {items,subtotal,coupon,shipping,total:Math.max(0,subtotal-coupon+shipping)};
}
function renderCart() {
  const body=document.querySelector("#cart-body"); if(!body) return;
  const t=cartTotals();
  if(!t.items.length) { body.innerHTML='<div class="panel"><h2>Your cart is empty</h2><a class="btn btn-primary" href="index.html">Shop products</a></div>'; return; }
  body.innerHTML=`
  <div class="two-col">
    <div class="panel">
      <h2>Cart</h2>
      <table><thead><tr><th>Item</th><th>Price</th><th>Qty</th><th></th></tr></thead>
      <tbody>${t.items.map(x=>`<tr><td><strong>${x.name}</strong><br><span class="muted small">${x.id} · ${x.variant}</span></td>
      <td>${currency(x.price)}</td><td><input class="qty" type="number" min="1" value="${x.quantity}" onchange="updateQty('${x.id}',this.value)"></td>
      <td><button class="btn-danger" onclick="removeFromCart('${x.id}')">Remove</button></td></tr>`).join("")}</tbody></table>
    </div>
    <div class="panel">
      <h2>Summary</h2>
      <div class="row space"><span>Subtotal</span><strong>${currency(t.subtotal)}</strong></div>
      <div class="row space"><span>Coupon</span><strong>-${currency(t.coupon)}</strong></div>
      <div class="row space"><span>Shipping</span><strong>${currency(t.shipping)}</strong></div><hr>
      <div class="row space"><span>Total</span><strong>${currency(t.total)}</strong></div>
      <div class="field" style="margin-top:18px"><label>Coupon</label><input id="coupon-code" placeholder="Try LAB10"></div>
      <button class="btn-secondary" onclick="applyCoupon()">Apply coupon</button>
      <a class="btn btn-primary" style="display:block;text-align:center;margin-top:12px" href="checkout.html">Checkout</a>
    </div>
  </div>`;
  labAction("cart_page_loaded", {items:t.items,totals:t});
}
function applyCoupon() {
  const code=(document.querySelector("#coupon-code")?.value||"").trim().toUpperCase();
  localStorage.setItem("lab_coupon",code==="LAB10" ? "LAB10" : "");
  labAction("coupon_attempt",{coupon:code,success:code==="LAB10"});
  renderCart();
}

function initCheckout() {
  const root=document.querySelector("#checkout-root"); if(!root) return;
  const t=cartTotals();
  if(!t.items.length) {root.innerHTML='<div class="panel">Cart is empty.</div>';return;}
  root.innerHTML=`
  <div class="two-col">
    <form class="panel" id="checkout-form">
      <h2>Checkout</h2>
      <div class="field"><label>Email</label><input required type="email" value="student@example.com"></div>
      <div class="field"><label>Country</label><select id="country"><option>Egypt</option><option>United Arab Emirates</option><option>United States</option></select></div>
      <div class="field"><label>Shipping method</label><select id="shipping"><option value="standard">Standard</option><option value="express">Express</option><option value="pickup">Store Pickup</option></select></div>
      <div class="field"><label>Payment method</label><select id="payment"><option value="card">Card</option><option value="cod">Cash on Delivery</option><option value="wallet">Wallet</option></select></div>
      <label class="row" style="margin:10px 0"><input style="width:auto" id="marketing" type="checkbox"> Subscribe to marketing</label>
      <button class="btn-primary" type="submit">Place order</button>
    </form>
    <div class="panel"><h2>Order Summary</h2>
      ${t.items.map(x=>`<div class="row space"><span>${x.name} × ${x.quantity}</span><strong>${currency(x.price*x.quantity)}</strong></div>`).join("")}
      <hr><div class="row space"><span>Total</span><strong>${currency(t.total)}</strong></div>
    </div>
  </div>`;
  document.querySelector("#shipping").addEventListener("change",e=>labAction("shipping_method_selected",{shipping_method:e.target.value}));
  document.querySelector("#payment").addEventListener("change",e=>labAction("payment_method_selected",{payment_method:e.target.value}));
  document.querySelector("#checkout-form").addEventListener("submit",placeOrder);
  labAction("checkout_page_loaded",{items:t.items,totals:t});
}
function placeOrder(e) {
  e.preventDefault();
  const t=cartTotals();
  const order={
    transaction_id:"LAB-"+Date.now(),
    items:t.items,
    subtotal:t.subtotal,
    discount:t.coupon,
    shipping:t.shipping,
    total:t.total,
    currency:"USD",
    coupon:localStorage.getItem("lab_coupon") || null,
    shipping_method:document.querySelector("#shipping").value,
    payment_method:document.querySelector("#payment").value,
    customer:getUser() || {customer_type:"guest"}
  };
  writeJSON("lab_last_order",order);
  saveCart([]); localStorage.removeItem("lab_coupon");
  labAction("order_placed",order);
  location.href="confirmation.html";
}
function initConfirmation() {
  const root=document.querySelector("#confirmation-root"); if(!root) return;
  const o=readJSON("lab_last_order",null);
  if(!o) {root.innerHTML='<div class="panel">No recent order found.</div>';return;}
  root.innerHTML=`
   <div class="panel success">
    <h1>Order confirmed</h1>
    <p>Transaction: <strong>${o.transaction_id}</strong></p>
    <p>Total: <strong>${currency(o.total)}</strong></p>
   </div>
   <div class="panel" style="margin-top:18px">
    <h2>Analytics lab actions</h2>
    <p>This page is where you should eventually fire <span class="code-tag">purchase</span>.</p>
    <button class="btn-danger" onclick="simulateRefund()">Simulate full refund</button>
   </div>`;
  labAction("confirmation_page_loaded",o);
}
function simulateRefund() {
  const o=readJSON("lab_last_order",null); if(!o)return;
  labAction("refund_simulated",{transaction_id:o.transaction_id,value:o.total,currency:o.currency,items:o.items});
  alert("Refund simulated. Inspect the console, then implement the GA4 refund event yourself.");
}

function loginDemo() {
  const user={id:"CUST-1001",name:"Asem Test",customer_type:"returning",loyalty_tier:"Gold"};
  writeJSON("lab_user",user); updateHeader(); labAction("login_demo",user); alert("Logged in as demo customer");
}
function logoutDemo() {
  const u=getUser(); localStorage.removeItem("lab_user"); updateHeader(); labAction("logout_demo",u); alert("Logged out");
}

document.addEventListener("DOMContentLoaded",()=>{
  updateHeader();
  renderProducts();
  initProduct();
  renderCart();
  initCheckout();
  initConfirmation();
  const search=document.querySelector("#site-search");
  if(search) search.addEventListener("input",e=>{renderProducts(e.target.value);labAction("search_input",{search_term:e.target.value});});
});
