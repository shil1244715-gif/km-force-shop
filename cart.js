// Shared cart logic — used on every page (product listing, cart, checkout)
const CART_KEY = 'kmforce_cart';

function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(id, name, price) {
  const cart = getCart();
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id, name, price, qty: 1 });
  }
  saveCart(cart);
}

function updateQty(id, delta) {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    saveCart(cart.filter((i) => i.id !== id));
  } else {
    saveCart(cart);
  }
}

function removeFromCart(id) {
  saveCart(getCart().filter((i) => i.id !== id));
}

function cartCount() {
  return getCart().reduce((sum, item) => sum + item.qty, 0);
}

function cartTotal() {
  return getCart().reduce((sum, item) => sum + item.qty * item.price, 0);
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  updateCartBadge();
}

function formatWon(amount) {
  return amount.toLocaleString('ko-KR') + '원';
}

function updateCartBadge() {
  const badge = document.getElementById('cartCount');
  if (!badge) return;
  const count = cartCount();
  badge.textContent = count;
  badge.hidden = count === 0;
}

// Wire up "장바구니 담기" buttons on product listing pages.
// Exposed globally so pages that render product cards dynamically (e.g. search
// results) can re-bind buttons after inserting them into the DOM.
function bindAddToCartButtons(root = document) {
  root.querySelectorAll('.btn-add-cart').forEach((button) => {
    if (button.dataset.bound) return;
    button.dataset.bound = 'true';
    button.addEventListener('click', () => {
      const { id, name, price } = button.dataset;
      addToCart(id, name, Number(price));

      const originalText = button.textContent;
      button.textContent = '담았습니다 ✓';
      button.classList.add('added');
      button.disabled = true;
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('added');
        button.disabled = false;
      }, 1200);
    });
  });
}

bindAddToCartButtons();
updateCartBadge();

// Cart page rendering (only runs when the cart list exists on the page)
function renderCartPage() {
  const list = document.getElementById('cartList');
  const layout = document.getElementById('cartLayout');
  const empty = document.getElementById('cartEmpty');
  if (!list || !layout || !empty) return;

  const cart = getCart();

  if (cart.length === 0) {
    layout.hidden = true;
    empty.hidden = false;
    return;
  }

  layout.hidden = false;
  empty.hidden = true;
  list.innerHTML = '';

  cart.forEach((item) => {
    const row = document.createElement('div');
    row.className = 'cart-item';
    row.innerHTML = `
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <span>${formatWon(item.price)}</span>
      </div>
      <div class="cart-qty">
        <button type="button" data-action="dec" aria-label="수량 줄이기">−</button>
        <span>${item.qty}</span>
        <button type="button" data-action="inc" aria-label="수량 늘리기">+</button>
      </div>
      <div class="cart-item-subtotal">${formatWon(item.qty * item.price)}</div>
      <button type="button" class="cart-item-remove" aria-label="삭제">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></svg>
      </button>
    `;

    row.querySelector('[data-action="dec"]').addEventListener('click', () => {
      updateQty(item.id, -1);
      renderCartPage();
    });
    row.querySelector('[data-action="inc"]').addEventListener('click', () => {
      updateQty(item.id, 1);
      renderCartPage();
    });
    row.querySelector('.cart-item-remove').addEventListener('click', () => {
      removeFromCart(item.id);
      renderCartPage();
    });

    list.append(row);
  });

  document.getElementById('summaryCount').textContent = `${cartCount()}개`;
  document.getElementById('summaryTotal').textContent = formatWon(cartTotal());
}

renderCartPage();

// Floating chat widget toggle
const chatToggle = document.getElementById('chatToggle');
const chatWidget = document.getElementById('chatWidget');
const chatClose = document.getElementById('chatClose');

if (chatToggle && chatWidget && chatClose) {
  chatToggle.addEventListener('click', () => {
    chatWidget.hidden = !chatWidget.hidden;
  });
  chatClose.addEventListener('click', () => {
    chatWidget.hidden = true;
  });
}
