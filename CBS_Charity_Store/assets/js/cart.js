/* =========================================================
   CBS CHARITY STORE
   CART SYSTEM
   ========================================================= */

const CART_STORAGE_KEY = 'CBS_CHARITY_CART_V2';

/* ---------------------------------------------------------
   CART STATE
--------------------------------------------------------- */

let cartItems = loadCart();

/* ---------------------------------------------------------
   LOCAL STORAGE
--------------------------------------------------------- */

function loadCart() {
  try {
    const saved = localStorage.getItem(CART_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load cart:', error);
    return [];
  }
}

function saveCart() {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  } catch (error) {
    console.error('Failed to save cart:', error);
  }
}

/* ---------------------------------------------------------
   HELPERS
--------------------------------------------------------- */

function createCartItemId(productId, designId, size = '') {
  return [productId, designId || 'NO-DESIGN', size || 'NO-SIZE'].join('__');
}

function escapeHtml(value) {
  if (value === null || value === undefined) {
    return '';
  }

  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

/* ---------------------------------------------------------
   CART CALCULATIONS
--------------------------------------------------------- */

function getCartItems() {
  return [...cartItems];
}

function getCartCount() {
  return cartItems.reduce((total, item) => total + item.quantity, 0);
}

function getCartSubtotal() {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

function isCartEmpty() {
  return cartItems.length === 0;
}

/* ---------------------------------------------------------
   ADD TO CART
--------------------------------------------------------- */

function addToCart(productId, designId, size = '', quantity = 1) {
  const product = getProductById(productId);

  if (!product) {
    console.error('Product not found:', productId);
    return false;
  }

  const design = getDesignById(product, designId);

  if (!design) {
    console.error('Design not found:', designId);
    return false;
  }

  quantity = parseInt(quantity, 10);

  if (isNaN(quantity) || quantity < 1) {
    quantity = 1;
  }

  /* -----------------------------------------------------
       Validate size
    ----------------------------------------------------- */

  if (productHasSizes(product)) {
    if (!size) {
      showToast('Size required', 'Please select a size first.');

      return false;
    }

    if (!product.sizes.includes(size)) {
      showToast('Invalid size', 'The selected size is not available.');

      return false;
    }
  }

  /* -----------------------------------------------------
       Check stock
    ----------------------------------------------------- */

  if (product.stock !== null && product.stock !== undefined) {
    const existingItem = cartItems.find((item) => item.id === createCartItemId(productId, designId, size));

    const currentQuantity = existingItem ? existingItem.quantity : 0;

    if (currentQuantity + quantity > product.stock) {
      showToast('Stock limit', `Only ${product.stock} item(s) available.`);

      return false;
    }
  }

  /* -----------------------------------------------------
       Find existing cart item
    ----------------------------------------------------- */

  const itemId = createCartItemId(productId, designId, size);

  const existingItem = cartItems.find((item) => item.id === itemId);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cartItems.push({
      id: itemId,

      productId: product.id,

      productName: product.name,

      designId: design.id,

      designName: design.name,

      designImage: design.image,

      size: size || '',

      quantity: quantity,

      price: product.price,

      productImage: product.images?.main || '',

      addedAt: new Date().toISOString(),
    });
  }

  saveCart();

  renderCart();

  updateCartBadge();

  animateCartBadge();

  showToast('Added to cart', `${product.name} has been added to your cart.`);

  document.dispatchEvent(new CustomEvent('cart:updated'));

  return true;
}

/* ---------------------------------------------------------
   UPDATE QUANTITY
--------------------------------------------------------- */

function updateCartQuantity(itemId, newQuantity) {
  const item = cartItems.find((cartItem) => cartItem.id === itemId);

  if (!item) {
    return;
  }

  newQuantity = parseInt(newQuantity, 10);

  if (isNaN(newQuantity)) {
    return;
  }

  /* -----------------------------------------------------
       Remove if quantity reaches zero
    ----------------------------------------------------- */

  if (newQuantity <= 0) {
    removeFromCart(itemId);

    return;
  }

  /* -----------------------------------------------------
       Check stock
    ----------------------------------------------------- */

  const product = getProductById(item.productId);

  if (product && product.stock !== null && product.stock !== undefined && newQuantity > product.stock) {
    showToast('Stock limit', `Only ${product.stock} item(s) available.`);

    return;
  }

  item.quantity = newQuantity;

  saveCart();

  renderCart();

  updateCartBadge();

  document.dispatchEvent(new CustomEvent('cart:updated'));
}

/* ---------------------------------------------------------
   INCREASE QUANTITY
--------------------------------------------------------- */

function increaseCartQuantity(itemId) {
  const item = cartItems.find((cartItem) => cartItem.id === itemId);

  if (!item) {
    return;
  }

  updateCartQuantity(itemId, item.quantity + 1);
}

/* ---------------------------------------------------------
   DECREASE QUANTITY
--------------------------------------------------------- */

function decreaseCartQuantity(itemId) {
  const item = cartItems.find((cartItem) => cartItem.id === itemId);

  if (!item) {
    return;
  }

  updateCartQuantity(itemId, item.quantity - 1);
}

/* ---------------------------------------------------------
   REMOVE ITEM
--------------------------------------------------------- */

function removeFromCart(itemId) {
  const index = cartItems.findIndex((item) => item.id === itemId);

  if (index === -1) {
    return;
  }

  const removedItem = cartItems[index];

  cartItems.splice(index, 1);

  saveCart();

  renderCart();

  updateCartBadge();

  showToast('Removed', `${removedItem.productName} was removed from your cart.`);

  document.dispatchEvent(new CustomEvent('cart:updated'));
}

/* ---------------------------------------------------------
   CLEAR CART
--------------------------------------------------------- */

function clearCart(showNotification = true) {
  cartItems = [];

  saveCart();

  renderCart();

  updateCartBadge();

  if (showNotification) {
    showToast('Cart cleared', 'All items have been removed.');
  }

  document.dispatchEvent(new CustomEvent('cart:updated'));
}

/* ---------------------------------------------------------
   CART BADGE
--------------------------------------------------------- */

function updateCartBadge() {
  const badge = document.getElementById('cartCount');

  if (!badge) {
    return;
  }

  const count = getCartCount();

  badge.textContent = count;

  if (count > 0) {
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function animateCartBadge() {
  const badge = document.getElementById('cartCount');

  if (!badge) {
    return;
  }

  badge.classList.remove('cart-badge-pop');

  /*
       Force browser reflow so the animation
       can restart every time.
    */
  void badge.offsetWidth;

  badge.classList.add('cart-badge-pop');

  setTimeout(() => {
    badge.classList.remove('cart-badge-pop');
  }, 450);
}

/* ---------------------------------------------------------
   RENDER CART
--------------------------------------------------------- */

function renderCart() {
  const container = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartFooter = document.getElementById('cartFooter');
  const subtotalElement = document.getElementById('cartSubtotal');
  const checkoutButton = document.getElementById('checkoutButton');

  if (!container) {
    return;
  }

  /* -----------------------------------------------------
       Empty cart
    ----------------------------------------------------- */

  if (cartItems.length === 0) {
    container.innerHTML = '';

    if (emptyCart) {
      emptyCart.classList.remove('hidden');
    }

    if (cartFooter) {
      cartFooter.classList.add('hidden');
    }

    if (checkoutButton) {
      checkoutButton.disabled = true;
    }

    if (subtotalElement) {
      subtotalElement.textContent = formatPrice(0);
    }

    return;
  }

  /* -----------------------------------------------------
       Has items
    ----------------------------------------------------- */

  if (emptyCart) {
    emptyCart.classList.add('hidden');
  }

  if (cartFooter) {
    cartFooter.classList.remove('hidden');
  }

  if (checkoutButton) {
    checkoutButton.disabled = false;
  }

  container.innerHTML = cartItems.map(renderCartItem).join('');

  if (subtotalElement) {
    subtotalElement.textContent = formatPrice(getCartSubtotal());
  }

  /* -----------------------------------------------------
       Re-render Lucide icons
    ----------------------------------------------------- */

  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

/* ---------------------------------------------------------
   CART ITEM HTML
--------------------------------------------------------- */

function renderCartItem(item) {
  const image = item.designImage || item.productImage || 'assets/images/products/placeholder.svg';

  const options = [];

  if (item.designName) {
    options.push(`Design: ${escapeHtml(item.designName)}`);
  }

  if (item.size) {
    options.push(`Size: ${escapeHtml(item.size)}`);
  }

  return `
        <div
            class="cart-item"
            data-cart-item-id="${escapeHtml(item.id)}"
        >

            <div class="cart-item-image">
                <img
                    src="${escapeHtml(image)}"
                    alt="${escapeHtml(item.productName)}"
                    loading="lazy"
                    onerror="this.src='assets/images/products/placeholder.svg'"
                >
            </div>


            <div class="cart-item-content">

                <div class="cart-item-top">

                    <div>
                        <h4 class="cart-item-name">
                            ${escapeHtml(item.productName)}
                        </h4>

                        <div class="cart-item-options">
                            ${options.join(' • ')}
                        </div>
                    </div>


                    <button
                        class="cart-item-remove"
                        type="button"
                        data-action="remove"
                        data-item-id="${escapeHtml(item.id)}"
                        aria-label="Remove item"
                        title="Remove"
                    >
                        <i data-lucide="trash-2"></i>
                    </button>

                </div>


                <div class="cart-item-bottom">

                    <div class="cart-item-quantity">

                        <button
                            type="button"
                            data-action="decrease"
                            data-item-id="${escapeHtml(item.id)}"
                            aria-label="Decrease quantity"
                        >
                            <i data-lucide="minus"></i>
                        </button>


                        <span>
                            ${item.quantity}
                        </span>


                        <button
                            type="button"
                            data-action="increase"
                            data-item-id="${escapeHtml(item.id)}"
                            aria-label="Increase quantity"
                        >
                            <i data-lucide="plus"></i>
                        </button>

                    </div>


                    <div class="cart-item-price">
                        ${formatPrice(item.price * item.quantity)}
                    </div>

                </div>

            </div>

        </div>
    `;
}

/* ---------------------------------------------------------
   CART DRAWER
--------------------------------------------------------- */

function openCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');

  if (!drawer) {
    return;
  }

  renderCart();

  if (overlay) {
    overlay.classList.add('open');
  }

  drawer.classList.add('open');

  document.body.classList.add('modal-open');
}

function closeCart() {
  const overlay = document.getElementById('cartOverlay');
  const drawer = document.getElementById('cartDrawer');

  if (overlay) {
    overlay.classList.remove('open');
  }

  if (drawer) {
    drawer.classList.remove('open');
  }

  /*
       Don't remove modal-open if another modal
       is currently active.
    */

  const productModal = document.getElementById('productModal');

  const checkoutModal = document.getElementById('checkoutModal');

  const anotherModalOpen = productModal?.classList.contains('open') || checkoutModal?.classList.contains('open');

  if (!anotherModalOpen) {
    document.body.classList.remove('modal-open');
  }
}

/* ---------------------------------------------------------
   CART EVENT HANDLERS
--------------------------------------------------------- */

function initializeCartEvents() {
  const cartButton = document.getElementById('cartButton');

  const closeButton = document.getElementById('closeCart');

  const overlay = document.getElementById('cartOverlay');

  const startShopping = document.getElementById('startShopping');

  /* -----------------------------------------------------
       Open cart
    ----------------------------------------------------- */

  if (cartButton) {
    cartButton.addEventListener('click', openCart);
  }

  /* -----------------------------------------------------
       Close cart
    ----------------------------------------------------- */

  if (closeButton) {
    closeButton.addEventListener('click', closeCart);
  }

  if (overlay) {
    overlay.addEventListener('click', closeCart);
  }

  /* -----------------------------------------------------
       Start shopping
    ----------------------------------------------------- */

  if (startShopping) {
    startShopping.addEventListener('click', () => {
      closeCart();

      const productsSection = document.getElementById('products');

      if (productsSection) {
        productsSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  }

  /* -----------------------------------------------------
       Cart item buttons
    ----------------------------------------------------- */

  const container = document.getElementById('cartItems');

  if (container) {
    container.addEventListener('click', (event) => {
      const button = event.target.closest('button[data-action]');

      if (!button) {
        return;
      }

      const action = button.dataset.action;

      const itemId = button.dataset.itemId;

      if (!itemId) {
        return;
      }

      switch (action) {
        case 'increase':
          increaseCartQuantity(itemId);
          break;

        case 'decrease':
          decreaseCartQuantity(itemId);
          break;

        case 'remove':
          removeFromCart(itemId);
          break;
      }
    });
  }
}

/* ---------------------------------------------------------
   TOAST SYSTEM
--------------------------------------------------------- */

function showToast(title, message) {
  const toast = document.getElementById('toast');

  const toastTitle = document.getElementById('toastTitle');

  const toastMessage = document.getElementById('toastMessage');

  if (!toast) {
    return;
  }

  if (toastTitle) {
    toastTitle.textContent = title;
  }

  if (toastMessage) {
    toastMessage.textContent = message;
  }

  toast.classList.add('show');

  clearTimeout(window.__cbsToastTimer);

  window.__cbsToastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ---------------------------------------------------------
   KEYBOARD SUPPORT
--------------------------------------------------------- */

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  const drawer = document.getElementById('cartDrawer');

  if (drawer && drawer.classList.contains('open')) {
    closeCart();
  }
});

/* ---------------------------------------------------------
   INITIALIZATION
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initializeCartEvents();

  renderCart();

  updateCartBadge();
});

/* ---------------------------------------------------------
   GLOBAL CART API
--------------------------------------------------------- */

window.Cart = {
  getItems: getCartItems,

  getCount: getCartCount,

  getSubtotal: getCartSubtotal,

  isEmpty: isCartEmpty,

  add: addToCart,

  updateQuantity: updateCartQuantity,

  increase: increaseCartQuantity,

  decrease: decreaseCartQuantity,

  remove: removeFromCart,

  clear: clearCart,

  render: renderCart,

  updateBadge: updateCartBadge,

  open: openCart,

  close: closeCart,
};

/*
   Backwards-compatible global functions.
   Useful if another JS file wants to call them directly.
*/

window.addToCart = addToCart;
window.showToast = showToast;
