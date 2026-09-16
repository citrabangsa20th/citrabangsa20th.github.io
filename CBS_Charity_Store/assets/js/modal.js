/* =========================================================
   CBS CHARITY STORE
   PRODUCT MODAL
   ========================================================= */

let selectedProduct = null;
let selectedDesignId = null;
let selectedSize = '';
let modalQuantity = 1;

/* ---------------------------------------------------------
   DOM ELEMENTS
--------------------------------------------------------- */

function getProductModalElements() {
  return {
    modal: document.getElementById('productModal'),
    content: document.getElementById('productModalContent'),
    close: document.getElementById('closeProductModal'),
  };
}

/* ---------------------------------------------------------
   OPEN PRODUCT MODAL
--------------------------------------------------------- */

function openProductModal(productId) {
  const product = getProductById(productId);

  if (!product) {
    console.error('Product not found:', productId);
    return;
  }

  selectedProduct = product;

  /*
       Default design = first design
    */
  selectedDesignId = product.designs?.[0]?.id || null;

  /*
       Default size = first available size
       Only applies to products with sizes.
    */
  selectedSize = productHasSizes(product) ? product.sizes?.[0] || '' : '';

  modalQuantity = 1;

  renderProductModal();

  const { modal } = getProductModalElements();

  if (!modal) {
    return;
  }

  modal.classList.remove('hidden');
  modal.classList.add('open');

  document.body.classList.add('modal-open');

  document.body.style.overflow = 'hidden';
}

/* ---------------------------------------------------------
   CLOSE PRODUCT MODAL
--------------------------------------------------------- */

function closeProductModal() {
  const { modal } = getProductModalElements();

  if (!modal) {
    return;
  }

  modal.classList.remove('open');
  modal.classList.add('hidden');

  document.body.classList.remove('modal-open');
  document.body.style.overflow = '';

  selectedProduct = null;
  selectedDesignId = null;
  selectedSize = '';
  modalQuantity = 1;
}

/* ---------------------------------------------------------
   RENDER MODAL
--------------------------------------------------------- */

function renderProductModal() {
  const { content } = getProductModalElements();

  if (!content || !selectedProduct) {
    return;
  }

  const product = selectedProduct;

  const selectedDesign = getDesignById(product, selectedDesignId);

  /* -----------------------------------------------------
       DESIGN OPTIONS
    ----------------------------------------------------- */

  const designs = product.designs || [];

  const designOptions = designs
    .map((design, index) => {
      const isSelected = design.id === selectedDesignId;

      return `
                <button
                    type="button"
                    class="design-option ${isSelected ? 'selected' : ''}"
                    data-design-id="${escapeHtml(design.id)}"
                    aria-label="Select ${escapeHtml(design.name)}"
                >

                    <div class="design-option-image">

                        <img
                            src="${escapeHtml(design.image)}"
                            alt="${escapeHtml(design.name)}"
                            loading="lazy"
                            onerror="this.style.opacity='0.25'"
                        >

                    </div>

                    <div class="design-option-info">

                        <span class="design-option-number">
                            ${String(index + 1).padStart(2, '0')}
                        </span>

                        <span class="design-option-name">
                            ${escapeHtml(design.name)}
                        </span>

                    </div>

                    ${
                      isSelected
                        ? `
                        <span class="design-option-check">
                            <i data-lucide="check"></i>
                        </span>
                    `
                        : ''
                    }

                </button>
            `;
    })
    .join('');

  /* -----------------------------------------------------
       SIZE OPTIONS
    ----------------------------------------------------- */

  let sizeSection = '';

  if (productHasSizes(product)) {
    const sizes = product.sizes || [];

    sizeSection = `
            <div class="modal-option-group">

                <div class="modal-option-heading">

                    <span>
                        Size
                    </span>

                    <span class="modal-option-required">
                        Required
                    </span>

                </div>


                <div class="size-options">

                    ${sizes
                      .map((size) => {
                        const isSelected = size === selectedSize;

                        return `
                            <button
                                type="button"
                                class="size-option ${isSelected ? 'selected' : ''}"
                                data-size="${escapeHtml(size)}"
                            >
                                ${escapeHtml(size)}
                            </button>
                        `;
                      })
                      .join('')}

                </div>

            </div>
        `;
  }

  /* -----------------------------------------------------
       IMAGE
    ----------------------------------------------------- */

  const productImage = selectedDesign?.image || product.images?.main || '';

  /* -----------------------------------------------------
       MODAL CONTENT
    ----------------------------------------------------- */

  content.innerHTML = `

        <div class="modal-product-image">

            <img
                src="${escapeHtml(productImage)}"
                alt="${escapeHtml(product.name)}"
                onerror="this.style.opacity='0.25'"
            >

            <div class="modal-product-image-label">
                CBS 20TH ANNIVERSARY
            </div>

        </div>


        <div class="modal-product-info">

            <div class="modal-product-category">
                ${escapeHtml(product.categoryLabel || product.category)}
            </div>


            <h2>
                ${escapeHtml(product.name)}
            </h2>


            <p class="modal-product-description">
                ${escapeHtml(product.description || '')}
            </p>


            <div class="modal-product-price">
                ${formatPrice(product.price)}
            </div>


            <div class="modal-divider"></div>


            <!-- DESIGN -->

            <div class="modal-option-group">

                <div class="modal-option-heading">

                    <span>
                        Choose Your Design
                    </span>

                    <span class="modal-option-required">
                        Required
                    </span>

                </div>


                <div class="design-grid">

                    ${designOptions}

                </div>

            </div>


            <!-- SIZE -->

            ${sizeSection}


            <!-- QUANTITY -->

            <div class="modal-option-group">

                <div class="modal-option-heading">

                    <span>
                        Quantity
                    </span>

                </div>


                <div class="modal-quantity">

                    <div class="modal-quantity-control">

                        <button
                            type="button"
                            data-modal-action="decrease"
                            aria-label="Decrease quantity"
                        >
                            <i data-lucide="minus"></i>
                        </button>


                        <span id="modalQuantityValue">
                            ${modalQuantity}
                        </span>


                        <button
                            type="button"
                            data-modal-action="increase"
                            aria-label="Increase quantity"
                        >
                            <i data-lucide="plus"></i>
                        </button>

                    </div>


                    <span class="modal-quantity-note">
                        ${product.stock ? `${product.stock} available` : 'No minimum order'}
                    </span>

                </div>

            </div>


            <!-- ADD -->

            <button
                type="button"
                class="modal-add-button"
                id="modalAddToCart"
            >

                <span>
                    Add to Cart
                </span>

                <span class="modal-add-button-price">
                    ${formatPrice(product.price * modalQuantity)}
                </span>

                <i data-lucide="arrow-right"></i>

            </button>


            <div class="modal-security-note">

                <i data-lucide="heart-handshake"></i>

                <span>
                    Every purchase supports the CBS Charity initiative.
                </span>

            </div>

        </div>

    `;

  /* -----------------------------------------------------
       LUCIDE
    ----------------------------------------------------- */

  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

/* ---------------------------------------------------------
   UPDATE MODAL QUANTITY UI
--------------------------------------------------------- */

function updateModalQuantityUI() {
  const quantityElement = document.getElementById('modalQuantityValue');

  const priceElement = document.querySelector('.modal-add-button-price');

  if (quantityElement) {
    quantityElement.textContent = modalQuantity;
  }

  if (priceElement && selectedProduct) {
    priceElement.textContent = formatPrice(selectedProduct.price * modalQuantity);
  }
}

/* ---------------------------------------------------------
   SELECT DESIGN
--------------------------------------------------------- */

function selectDesign(designId) {
  if (!selectedProduct) {
    return;
  }

  const design = getDesignById(selectedProduct, designId);

  if (!design) {
    return;
  }

  selectedDesignId = designId;

  renderProductModal();
}

/* ---------------------------------------------------------
   SELECT SIZE
--------------------------------------------------------- */

function selectSize(size) {
  if (!selectedProduct) {
    return;
  }

  if (productHasSizes(selectedProduct) && !selectedProduct.sizes.includes(size)) {
    return;
  }

  selectedSize = size;

  renderProductModal();
}

/* ---------------------------------------------------------
   MODAL QUANTITY
--------------------------------------------------------- */

function increaseModalQuantity() {
  if (!selectedProduct) {
    return;
  }

  const maxStock = selectedProduct.stock;

  if (maxStock !== null && maxStock !== undefined && modalQuantity >= maxStock) {
    showToast('Stock limit', `Only ${maxStock} item(s) available.`);

    return;
  }

  modalQuantity++;

  updateModalQuantityUI();
}

function decreaseModalQuantity() {
  if (modalQuantity <= 1) {
    return;
  }

  modalQuantity--;

  updateModalQuantityUI();
}

/* ---------------------------------------------------------
   ADD CURRENT PRODUCT TO CART
--------------------------------------------------------- */

function addCurrentProductToCart() {
  if (!selectedProduct) {
    return;
  }

  /* -----------------------------------------------------
       Validate design
    ----------------------------------------------------- */

  if (!selectedDesignId) {
    showToast('Choose a design', 'Please select a design first.');

    return;
  }

  /* -----------------------------------------------------
       Validate size
    ----------------------------------------------------- */

  if (productHasSizes(selectedProduct) && !selectedSize) {
    showToast('Choose a size', 'Please select a size first.');

    return;
  }

  /* -----------------------------------------------------
       Add
    ----------------------------------------------------- */

  const success = Cart.add(selectedProduct.id, selectedDesignId, selectedSize, modalQuantity);

  if (!success) {
    return;
  }

  /*
       Close product modal after successful add
    */

  closeProductModal();
}

/* ---------------------------------------------------------
   MODAL EVENTS
--------------------------------------------------------- */

function initializeProductModal() {
  const { modal, close } = getProductModalElements();

  if (!modal) {
    return;
  }

  /* -----------------------------------------------------
       Close button
    ----------------------------------------------------- */

  if (close) {
    close.addEventListener('click', closeProductModal);
  }

  /* -----------------------------------------------------
       Click outside modal
    ----------------------------------------------------- */

  modal.addEventListener('click', (event) => {
    /*
               Only close when the actual modal
               background is clicked.
            */

    if (event.target === modal) {
      closeProductModal();
    }
  });

  /* -----------------------------------------------------
       Delegated controls
    ----------------------------------------------------- */

  modal.addEventListener('click', (event) => {
    /* ---------------------------------------------
               Design
            --------------------------------------------- */

    const designButton = event.target.closest('.design-option');

    if (designButton) {
      const designId = designButton.dataset.designId;

      selectDesign(designId);

      return;
    }

    /* ---------------------------------------------
               Size
            --------------------------------------------- */

    const sizeButton = event.target.closest('.size-option');

    if (sizeButton) {
      const size = sizeButton.dataset.size;

      selectSize(size);

      return;
    }

    /* ---------------------------------------------
               Quantity
            --------------------------------------------- */

    const quantityButton = event.target.closest('[data-modal-action]');

    if (quantityButton) {
      const action = quantityButton.dataset.modalAction;

      if (action === 'increase') {
        increaseModalQuantity();
      }

      if (action === 'decrease') {
        decreaseModalQuantity();
      }

      return;
    }

    /* ---------------------------------------------
               Add to cart
            --------------------------------------------- */

    const addButton = event.target.closest('#modalAddToCart');

    if (addButton) {
      addCurrentProductToCart();

      return;
    }
  });
}

/* ---------------------------------------------------------
   ESC KEY
--------------------------------------------------------- */

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') {
    return;
  }

  if (!selectedProduct) {
    return;
  }

  closeProductModal();
});

/* ---------------------------------------------------------
   GLOBAL API
--------------------------------------------------------- */

window.ProductModal = {
  open: openProductModal,

  close: closeProductModal,

  getSelectedProduct: () => selectedProduct,

  getSelectedDesign: () => selectedDesignId,

  getSelectedSize: () => selectedSize,
};

/* ---------------------------------------------------------
   INITIALIZATION
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initializeProductModal();
});
