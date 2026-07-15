let activeCategory = "all";

const PAGE_TITLES = {
  home: "Wingify Shop - Home",
  products: "Products - Wingify Shop",
  cart: "Cart - Wingify Shop",
  checkout: "Checkout - Wingify Shop",
  account: "Account - Wingify Shop",
};
const VALID_PAGES = ["home", "products", "cart", "checkout", "account"];
const PAGE_PATHS = { home: "", products: "product", cart: "cart", checkout: "checkout", account: "account" };
const PATH_TO_PAGE = { product: "products", products: "products", cart: "cart", checkout: "checkout", account: "account" };
const ROUTE_SEGMENTS = new Set(["product", "products", "cart", "checkout", "account", "home", "index.html"]);

function getBasePath() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "";
  if (ROUTE_SEGMENTS.has(parts[parts.length - 1].toLowerCase())) parts.pop();
  return parts.length ? "/" + parts.join("/") : "";
}

function getCategoryFromQuery() {
  const cat = new URLSearchParams(window.location.search).get("category");
  return cat && CATEGORIES.some((c) => c.id === cat) ? cat : null;
}

function getPageFromUrl() {
  const parts = window.location.pathname.split("/").filter(Boolean);
  if (parts.length === 0) return { page: "home", category: getCategoryFromQuery() };
  const segment = parts[parts.length - 1].toLowerCase();
  if (segment === "index.html") return { page: "home", category: getCategoryFromQuery() };
  const page = PATH_TO_PAGE[segment];
  if (page) return { page, category: getCategoryFromQuery() };
  return { page: "home", category: getCategoryFromQuery() };
}

function buildUrl(page, category) {
  const base = getBasePath();
  const params = new URLSearchParams(window.location.search);
  if (page === "products" && category && category !== "all") {
    params.set("category", category);
  } else {
    params.delete("category");
  }
  const query = params.toString();
  const segment = PAGE_PATHS[page];
  const path = segment ? (base || "") + "/" + segment : (base ? base + "/" : "/");
  return query ? path + "?" + query : path;
}

function setPageUrl(page, category) {
  const url = buildUrl(page, category);
  const current = window.location.pathname + window.location.search;
  if (current !== url) {
    history.pushState({ page, category: category || activeCategory }, "", url);
  }
}

function showPage(page, category, updateUrl = false) {
  if (!VALID_PAGES.includes(page)) page = "home";
  document.querySelectorAll(".page").forEach((p) => p.classList.remove("active"));
  document.getElementById("page-" + page).classList.add("active");
  document.querySelectorAll(".nav-links a").forEach((a) => {
    a.classList.toggle("active", a.dataset.page === page);
  });
  document.title = PAGE_TITLES[page] || "Wingify Shop";
  window.scrollTo(0, 0);
  document.getElementById("account-menu")?.classList.remove("open");

  if (category) activeCategory = category;
  if (page === "products") renderProducts(activeCategory);
  if (page === "cart") renderCart();
  if (page === "checkout") renderCheckout();
  if (page === "account") loadAccountForm();
  if (updateUrl) setPageUrl(page, activeCategory);
}

function renderCategories() {
  document.getElementById("categories-grid").innerHTML = CATEGORIES.map(
    (cat) =>
      `<div class="category-card" data-page="products" data-category="${cat.id}"><div class="category-icon">${cat.icon}</div><div class="category-name">${cat.name}</div></div>`
  ).join("");

  document.getElementById("footer-categories").innerHTML = CATEGORIES.map(
    (cat) => `<li><a data-page="products" data-category="${cat.id}">${cat.name}</a></li>`
  ).join("");
}

function renderFilterBar() {
  const bar = document.getElementById("filter-bar");
  CATEGORIES.forEach((cat) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-btn";
    btn.dataset.category = cat.id;
    btn.textContent = cat.name;
    bar.appendChild(btn);
  });

  bar.addEventListener("click", (e) => {
    if (!e.target.classList.contains("filter-btn")) return;
    bar.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    activeCategory = e.target.dataset.category;
    renderProducts(activeCategory);
    if (document.getElementById("page-products").classList.contains("active")) {
      setPageUrl("products", activeCategory);
    }
  });
}

function renderProducts(category) {
  const filtered = category === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === category);

  document.getElementById("products-grid").innerHTML = filtered
    .map(
      (p) => `
    <article class="product-card">
      <img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy" />
      <div class="product-body">
        <span class="product-category">${getCategoryName(p.category)}</span>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatPrice(p.price)}</span>
          <button type="button" class="btn btn-accent btn-sm" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </article>
  `
    )
    .join("");

  document.getElementById("filter-bar").querySelectorAll(".filter-btn").forEach((b) => {
    b.classList.toggle("active", b.dataset.category === category);
  });
}

function renderCart() {
  const cart = getCart();
  const el = document.getElementById("cart-content");

  if (!cart.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-state-icon">🛒</div><h3>Your cart is empty</h3><p>Looks like you haven't added anything yet.</p><button type="button" class="btn btn-accent" data-page="products">Browse Products</button></div>`;
    return;
  }

  const subtotal = getCartTotal();
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  el.innerHTML = `
    <div class="cart-layout">
      <div class="cart-items">${cart
        .map(
          (item) => `
        <div class="cart-item">
          <img class="cart-item-image" src="${item.image}" alt="${item.name}" />
          <div class="cart-item-details"><h3 class="cart-item-name">${item.name}</h3><span class="cart-item-price">${formatPrice(item.price)} each</span></div>
          <div class="cart-item-actions">
            <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">−</button>
            <span class="qty-value">${item.quantity}</span>
            <button type="button" class="qty-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
            <button type="button" class="btn btn-danger btn-sm" onclick="removeFromCart(${item.id})" style="margin-left:.5rem">Remove</button>
          </div>
          <div style="font-weight:700;min-width:80px;text-align:right">${formatPrice(item.price * item.quantity)}</div>
        </div>`
        )
        .join("")}
      </div>
      <div class="cart-summary">
        <h3>Order Summary</h3>
        <div class="summary-row"><span>Subtotal (${getCartCount()} items)</span><span>${formatPrice(subtotal)}</span></div>
        <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
        <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
        <button type="button" class="btn btn-accent" style="width:100%;margin-top:1rem" data-page="checkout">Proceed to Checkout</button>
        <button type="button" class="btn btn-outline" style="width:100%;margin-top:.5rem" data-page="products">Continue Shopping</button>
      </div>
    </div>`;
}

function renderCheckout() {
  const cart = getCart();
  const el = document.getElementById("checkout-content");
  const account = getAccount();

  if (!cart.length) {
    el.innerHTML = `<div class="empty-state"><div class="empty-state-icon">📦</div><h3>No items to checkout</h3><p>Add products to your cart before checking out.</p><button type="button" class="btn btn-accent" data-page="products">Browse Products</button></div>`;
    return;
  }

  const subtotal = getCartTotal();
  const shipping = getShipping(subtotal);
  const total = subtotal + shipping;

  el.innerHTML = `
    <form id="checkout-form" class="checkout-layout">
      <div>
        <div class="checkout-section">
          <h3>📍 Shipping Address</h3>
          <div class="form-row">
            <div class="form-group"><label for="fullName">Full Name</label><input type="text" id="fullName" name="fullName" required value="${account ? account.firstName + " " + account.lastName : ""}" /></div>
            <div class="form-group"><label for="checkoutPhone">Phone Number</label><input type="tel" id="checkoutPhone" name="phone" required placeholder="+1 234 567 8900" value="${account ? account.phone : ""}" /></div>
          </div>
          <div class="form-group"><label for="checkoutEmail">Email Address</label><input type="email" id="checkoutEmail" name="email" required placeholder="you@example.com" value="${account ? account.email : ""}" /></div>
          <div class="form-group"><label for="address">Street Address</label><input type="text" id="address" name="address" required placeholder="123 Main Street" /></div>
          <div class="form-row">
            <div class="form-group"><label for="city">City</label><input type="text" id="city" name="city" required placeholder="New York" /></div>
            <div class="form-group"><label for="state">State / Province</label><input type="text" id="state" name="state" required placeholder="NY" /></div>
          </div>
          <div class="form-row">
            <div class="form-group"><label for="zip">ZIP / Postal Code</label><input type="text" id="zip" name="zip" required placeholder="10001" /></div>
            <div class="form-group"><label for="country">Country</label><select id="country" name="country" required><option value="">Select country</option><option value="US">United States</option><option value="IN">India</option><option value="UK">United Kingdom</option><option value="CA">Canada</option><option value="AU">Australia</option></select></div>
          </div>
        </div>
        <div class="checkout-section">
          <h3>💳 Payment Method</h3>
          <div class="payment-options">
            <div class="payment-option"><input type="radio" id="pay-credit" name="payment" value="Credit Card" required checked /><label for="pay-credit"><span class="payment-icon">💳</span>Credit Card</label></div>
            <div class="payment-option"><input type="radio" id="pay-debit" name="payment" value="Debit Card" /><label for="pay-debit"><span class="payment-icon">🏦</span>Debit Card</label></div>
            <div class="payment-option"><input type="radio" id="pay-upi" name="payment" value="UPI" /><label for="pay-upi"><span class="payment-icon">📱</span>UPI</label></div>
            <div class="payment-option"><input type="radio" id="pay-netbanking" name="payment" value="Net Banking" /><label for="pay-netbanking"><span class="payment-icon">🏛️</span>Net Banking</label></div>
            <div class="payment-option"><input type="radio" id="pay-wallet" name="payment" value="Wallet" /><label for="pay-wallet"><span class="payment-icon">👛</span>Wallet</label></div>
            <div class="payment-option"><input type="radio" id="pay-cod" name="payment" value="Cash on Delivery" /><label for="pay-cod"><span class="payment-icon">💵</span>Cash on Delivery</label></div>
            <div class="payment-option"><input type="radio" id="pay-paypal" name="payment" value="PayPal" /><label for="pay-paypal"><span class="payment-icon">🅿️</span>PayPal</label></div>
            <div class="payment-option"><input type="radio" id="pay-emi" name="payment" value="EMI" /><label for="pay-emi"><span class="payment-icon">📊</span>EMI</label></div>
          </div>
        </div>
      </div>
      <div>
        <div class="cart-summary">
          <h3>Order Summary</h3>
          ${cart.map((item) => `<div class="summary-row"><span>${item.name} × ${item.quantity}</span><span>${formatPrice(item.price * item.quantity)}</span></div>`).join("")}
          <div class="summary-row"><span>Subtotal</span><span>${formatPrice(subtotal)}</span></div>
          <div class="summary-row"><span>Shipping</span><span>${shipping === 0 ? "FREE" : formatPrice(shipping)}</span></div>
          <div class="summary-row total"><span>Total</span><span>${formatPrice(total)}</span></div>
          <button type="submit" class="btn btn-accent" style="width:100%;margin-top:1rem">Place Order & Pay ${formatPrice(total)}</button>
        </div>
      </div>
    </form>`;

  document.getElementById("checkout-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const payment = form.querySelector('input[name="payment"]:checked').value;
    const orderId = "WS-" + Date.now().toString(36).toUpperCase();
    clearCart();

    el.innerHTML = `
      <div class="order-success">
        <div class="order-success-icon">✅</div>
        <h2>Order Placed Successfully!</h2>
        <p>Thank you for shopping with Wingify Shop.</p>
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Payment:</strong> ${payment}</p>
        <p><strong>Total Paid:</strong> ${formatPrice(total)}</p>
        <div style="margin-top:2rem;display:flex;gap:1rem;justify-content:center;flex-wrap:wrap">
          <button type="button" class="btn btn-accent" data-page="products">Continue Shopping</button>
          <button type="button" class="btn btn-outline" data-page="home">Back to Home</button>
        </div>
      </div>`;

    showToast("Order placed successfully!");
  });
}

function initApp() {
  document.addEventListener("click", (e) => {
    const target = e.target.closest("[data-page]");
    if (target) {
      e.preventDefault();
      showPage(target.dataset.page, target.dataset.category, true);
    }
  });

  window.addEventListener("popstate", () => {
    const { page, category } = getPageFromUrl();
    showPage(page, category);
  });

  renderCategories();
  renderFilterBar();
  initAccount();
  updateCartBadge();
  updateAccountUI();
  loadAccountForm();

  const { page: initialPage, category: initialCategory } = getPageFromUrl();
  if (initialPage !== "home" || initialCategory) {
    showPage(initialPage, initialCategory);
  }
}

initApp();
