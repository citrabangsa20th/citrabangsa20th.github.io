/* =========================================================
   CBS CHARITY STORE
   MAIN APPLICATION
   ========================================================= */

/* ---------------------------------------------------------
   DOM READY
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initializePageLoader();

  initializeHeader();

  initializeMobileMenu();

  initializeCategoryFilter();

  renderProducts();

  initializeProductInteractions();

  initializeGlobalButtons();

  initializeRevealAnimations();

  initializeToastClose();

  if (window.Cart) {
    Cart.render();
    Cart.updateBadge();
  }

  refreshIcons();
});

function initializePageLoader() {
  const loader = document.querySelector('.page-loader');

  if (!loader) {
    return;
  }

  setTimeout(() => {
    loader.classList.add('loaded');

    setTimeout(() => {
      loader.remove();
    }, 700);
  }, 500);
}

/* ---------------------------------------------------------
   LUCIDE
--------------------------------------------------------- */

function refreshIcons() {
  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

/* ---------------------------------------------------------
   HEADER
--------------------------------------------------------- */

function initializeHeader() {
  const header = document.getElementById('siteHeader');

  if (!header) {
    return;
  }

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  updateHeader();

  window.addEventListener('scroll', updateHeader, {
    passive: true,
  });
}

/* ---------------------------------------------------------
   MOBILE MENU
--------------------------------------------------------- */

function initializeMobileMenu() {
  const button = document.getElementById('mobileMenuButton');

  const nav = document.getElementById('mobileNav');

  if (!button || !nav) {
    return;
  }

  button.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');

    if (isOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  });

  /*
       Close mobile menu when
       clicking navigation links.
    */

  nav.addEventListener('click', (event) => {
    const link = event.target.closest('a');

    if (!link) {
      return;
    }

    closeMobileMenu();
  });

  /*
       Close with Escape
    */

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeMobileMenu();
    }
  });

  function openMobileMenu() {
    nav.classList.add('open');

    button.setAttribute('aria-expanded', 'true');

    button.innerHTML = `<i data-lucide="x"></i>`;

    refreshIcons();
  }

  function closeMobileMenu() {
    nav.classList.remove('open');

    button.setAttribute('aria-expanded', 'false');

    button.innerHTML = `<i data-lucide="menu"></i>`;

    refreshIcons();
  }
}

/* ---------------------------------------------------------
   CATEGORY FILTER
--------------------------------------------------------- */

function initializeCategoryFilter() {
  const filterContainer = document.getElementById('categoryFilter');

  if (!filterContainer) {
    return;
  }

  filterContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-category]');

    if (!button) {
      return;
    }

    const category = button.dataset.category;

    /*
               Active state
            */

    filterContainer.querySelectorAll('[data-category]').forEach((item) => {
      item.classList.remove('active');
    });

    button.classList.add('active');

    renderProducts(category);
  });
}

/* ---------------------------------------------------------
   RENDER PRODUCTS
--------------------------------------------------------- */

function renderProducts(category = 'all') {
  const grid = document.getElementById('productGrid');

  const empty = document.getElementById('emptyProducts');

  if (!grid) {
    return;
  }

  let products;

  if (category === 'all') {
    products = getActiveProducts();
  } else {
    products = getProductsByCategory(category).filter((product) => product.active !== false);
  }

  /*
       No products
    */

  if (!products.length) {
    grid.innerHTML = '';

    if (empty) {
      empty.classList.remove('hidden');
    }

    return;
  }

  if (empty) {
    empty.classList.add('hidden');
  }

  grid.innerHTML = products.map(renderProductCard).join('');

  refreshIcons();
}

/* ---------------------------------------------------------
   PRODUCT CARD
--------------------------------------------------------- */

function renderProductCard(product) {
  const firstDesign = product.designs?.[0];

  const image = product.images?.main || firstDesign?.image || 'assets/images/products/placeholder.svg';

  const designCount = product.designs?.length || 0;

  const availability = isProductAvailable(product);

  const badge = product.badge
    ? `
                
            `
    : '';

  return `
        <article
            class="product-card reveal"
            data-product-id="${escapeHtml(product.id)}"
        >

            <div class="product-image">

                <img
                    src="${escapeHtml(image)}"
                    alt="${escapeHtml(product.name)}"
                    loading="lazy"
                    onerror="this.style.opacity='0.25'"
                >


                ${badge}


                


                

            </div>


            <div class="product-card-content">

                <div class="product-card-top">

                    <div>

                        <div class="product-category">
                            ${escapeHtml(product.categoryLabel || product.category)}
                        </div>

                        <p>
                            ${escapeHtml(product.name)}
                        </p>

                    </div>

                </div>


               


                <div class="product-price-row">

                    <div>

                        <div class="product-price">
                            ${formatPrice(product.price)}
                        </div>

                        <div class="product-design-count">

                            ${designCount}
                            ${designCount === 1 ? 'design' : 'designs'}

                        </div>

                    </div>


                    

                </div>

            </div>

        </article>
    `;
}

/* ---------------------------------------------------------
   PRODUCT INTERACTIONS
--------------------------------------------------------- */

function initializeProductInteractions() {
  const grid = document.getElementById('productGrid');

  if (!grid) {
    return;
  }

  grid.addEventListener('click', (event) => {
    const actionElement = event.target.closest('[data-product-action]');

    if (!actionElement) {
      return;
    }

    const action = actionElement.dataset.productAction;

    const productId = actionElement.dataset.productId;

    if (!productId) {
      return;
    }

    /* ---------------------------------------------
               Quick View
            --------------------------------------------- */

    if (action === 'quick-view') {
      ProductModal.open(productId);

      return;
    }

    /* ---------------------------------------------
               Add
            --------------------------------------------- */

    if (action === 'add') {
      ProductModal.open(productId);

      return;
    }

    /* ---------------------------------------------
               Wishlist
            --------------------------------------------- */

    if (action === 'wishlist') {
      toggleWishlist(productId, actionElement);

      return;
    }
  });

  /*
       Clicking the product image/card
       opens quick view.
    */

  grid.addEventListener('click', (event) => {
    if (event.target.closest('button')) {
      return;
    }

    const card = event.target.closest('.product-card');

    if (!card) {
      return;
    }

    const productId = card.dataset.productId;

    if (productId) {
      ProductModal.open(productId);
    }
  });
}

/* ---------------------------------------------------------
   WISHLIST
--------------------------------------------------------- */

const WISHLIST_STORAGE_KEY = 'CBS_CHARITY_WISHLIST_V1';

function getWishlist() {
  try {
    const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Failed to load wishlist:', error);

    return [];
  }
}

function saveWishlist(items) {
  localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
}

function toggleWishlist(productId, button) {
  let wishlist = getWishlist();

  const exists = wishlist.includes(productId);

  if (exists) {
    wishlist = wishlist.filter((id) => id !== productId);

    button.classList.remove('active');

    showToast('Removed', 'Product removed from your wishlist.');
  } else {
    wishlist.push(productId);

    button.classList.add('active');

    showToast('Saved', 'Product added to your wishlist.');
  }

  saveWishlist(wishlist);
}

/* ---------------------------------------------------------
   RESTORE WISHLIST STATE
--------------------------------------------------------- */

function restoreWishlistState() {
  const wishlist = getWishlist();

  document.querySelectorAll('.product-wishlist').forEach((button) => {
    const productId = button.dataset.productId;

    if (wishlist.includes(productId)) {
      button.classList.add('active');
    }
  });
}

/* ---------------------------------------------------------
   GLOBAL BUTTONS
--------------------------------------------------------- */

function initializeGlobalButtons() {
  /*
       Checkout
    */

  const checkoutButton = document.getElementById('checkoutButton');

  if (checkoutButton) {
    checkoutButton.addEventListener('click', () => {
      if (Cart.isEmpty()) {
        showToast('Cart is empty', 'Please add a product first.');

        return;
      }

      Cart.close();

      Checkout.open();
    });
  }

  /*
       Navigation links
    */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');

      if (!targetId || targetId === '#') {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  });

  /*
       Hero CTA
    */

  document.querySelectorAll('[data-scroll-products]').forEach((button) => {
    button.addEventListener('click', () => {
      const products = document.getElementById('products');

      if (products) {
        products.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });
}

/* ---------------------------------------------------------
   REVEAL ANIMATIONS
--------------------------------------------------------- */

function initializeRevealAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
    },
  );

  document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
  });

  /*
       Products are rendered dynamically,
       so observe them after rendering.
    */

  const productGrid = document.getElementById('productGrid');

  if (productGrid) {
    const productObserver = new MutationObserver(() => {
      productGrid.querySelectorAll('.reveal:not(.visible)').forEach((element) => {
        observer.observe(element);
      });

      restoreWishlistState();
    });

    productObserver.observe(productGrid, {
      childList: true,
    });
  }
}

/* ---------------------------------------------------------
   TOAST CLOSE
--------------------------------------------------------- */

function initializeToastClose() {
  const toast = document.getElementById('toast');

  if (!toast) {
    return;
  }

  toast.addEventListener('click', (event) => {
    if (event.target.closest('[data-toast-close]')) {
      toast.classList.remove('show');
    }
  });
}

/* ---------------------------------------------------------
   CART UPDATED
--------------------------------------------------------- */

document.addEventListener('cart:updated', () => {
  if (window.Cart) {
    Cart.updateBadge();
  }
});

/* ---------------------------------------------------------
   GLOBAL ERROR HANDLING
--------------------------------------------------------- */

window.addEventListener('error', (event) => {
  console.error('CBS Charity Store error:', event.error || event.message);
});

/* ---------------------------------------------------------
   INITIAL PRODUCT STATE
--------------------------------------------------------- */

window.CBSStore = {
  renderProducts,

  getWishlist,

  toggleWishlist,
};
