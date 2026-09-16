/* =========================================================
   CBS CHARITY STORE
   CHECKOUT SYSTEM
   ========================================================= */

/* ---------------------------------------------------------
   CHECKOUT STATE
--------------------------------------------------------- */

let currentOrder = null;

/* ---------------------------------------------------------
   DOM ELEMENTS
--------------------------------------------------------- */

function getCheckoutElements() {
  return {
    modal: document.getElementById('checkoutModal'),
    content: document.getElementById('checkoutContent'),
    close: document.getElementById('closeCheckoutModal'),
  };
}

/* ---------------------------------------------------------
   ORDER ID
--------------------------------------------------------- */

function generateOrderId() {
  const now = new Date();

  const year = now.getFullYear();

  const month = String(now.getMonth() + 1).padStart(2, '0');

  const day = String(now.getDate()).padStart(2, '0');

  const random = Math.random().toString(36).substring(2, 7).toUpperCase();

  return `CBS-${year}${month}${day}-${random}`;
}

/* ---------------------------------------------------------
   DATE FORMAT
--------------------------------------------------------- */

function formatOrderDate(date = new Date()) {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

/* ---------------------------------------------------------
   CREATE ORDER
--------------------------------------------------------- */

function createOrder() {
  const items = Cart.getItems();

  if (!items.length) {
    showToast('Cart is empty', 'Add at least one product before checkout.');

    return null;
  }

  const order = {
    id: generateOrderId(),

    createdAt: new Date().toISOString(),

    items: items.map((item) => ({
      productId: item.productId,

      productName: item.productName,

      designId: item.designId,

      designName: item.designName,

      size: item.size || '',

      quantity: item.quantity,

      price: item.price,

      subtotal: item.price * item.quantity,
    })),

    total: Cart.getSubtotal(),

    payment: {
      bank: STORE_CONFIG.payment.bank,

      accountNumber: STORE_CONFIG.payment.accountNumber,

      accountName: STORE_CONFIG.payment.accountName,
    },
  };

  return order;
}

/* ---------------------------------------------------------
   OPEN CHECKOUT
--------------------------------------------------------- */

function openCheckout() {
  if (Cart.isEmpty()) {
    showToast('Cart is empty', 'Please add a product first.');

    return;
  }

  currentOrder = createOrder();

  if (!currentOrder) {
    return;
  }

  renderCheckout();

  const { modal } = getCheckoutElements();

  if (!modal) {
    return;
  }

  modal.classList.remove('hidden');
  modal.classList.add('open');

  document.body.classList.add('modal-open');

  document.body.style.overflow = 'hidden';
}

/* ---------------------------------------------------------
   CLOSE CHECKOUT
--------------------------------------------------------- */

function closeCheckout() {
  const { modal } = getCheckoutElements();

  if (!modal) {
    return;
  }

  modal.classList.remove('open');
  modal.classList.add('hidden');

  document.body.classList.remove('modal-open');

  document.body.style.overflow = '';
}

/* ---------------------------------------------------------
   RENDER CHECKOUT
--------------------------------------------------------- */

function renderCheckout() {
  const { content } = getCheckoutElements();

  if (!content || !currentOrder) {
    return;
  }

  const order = currentOrder;

  const itemsHtml = order.items
    .map((item) => {
      const options = [];

      if (item.designName) {
        options.push(`Design: ${escapeHtml(item.designName)}`);
      }

      if (item.size) {
        options.push(`Size: ${escapeHtml(item.size)}`);
      }

      return `
                    <div class="checkout-summary-item">

                        <div>

                            <div class="checkout-summary-name">
                                ${escapeHtml(item.productName)}
                                × ${item.quantity}
                            </div>

                            <div class="checkout-summary-options">
                                ${options.join(' • ')}
                            </div>

                        </div>

                        <div class="checkout-summary-price">
                            ${formatPrice(item.subtotal)}
                        </div>

                    </div>
                `;
    })
    .join('');

  content.innerHTML = `

        <div class="checkout-header">

            <div class="checkout-kicker">
                CBS CHARITY STORE
            </div>

            <h2>
                Complete Your Order
            </h2>

            <p>
                Your order has been prepared.
                Please complete the bank transfer
                and keep your payment proof.
            </p>

        </div>


        <!-- ORDER ID -->

        <div class="order-id-box">

            <div>

                <div class="order-id-label">
                    ORDER ID
                </div>

                <div class="order-id-value">
                    ${escapeHtml(order.id)}
                </div>

            </div>


            

        </div>


        <!-- ORDER SUMMARY -->

        <div class="checkout-summary">

            <div class="checkout-summary-header">

                <span>
                    Order Summary
                </span>

                <span>
                    ${order.items.length}
                    ${order.items.length === 1 ? 'item' : 'items'}
                </span>

            </div>


            <div class="checkout-summary-items">

                ${itemsHtml}

            </div>


            <div class="checkout-total">

                <span>
                    Total
                </span>

                <strong>
                    ${formatPrice(order.total)}
                </strong>

            </div>

        </div>


        <!-- BANK -->

        <div class="bank-box">

           


            <div class="bank-details">

                <div class="bank-detail-row">

                    <span>
                        Bank
                    </span>

                    <strong>
                        ${escapeHtml(order.payment.bank)}
                    </strong>

                </div>


                <div class="bank-detail-row">

    <div class="bank-account-info">
        <span>
            Account Number
        </span>

        <strong >
            ${escapeHtml(order.payment.accountNumber)} 
        </strong> <button
        type="button"
        class="copy-bank-account"
        data-account="${escapeHtml(order.payment.accountNumber)}"
        title="Copy nomor rekening"
    >
        <i data-lucide="copy"></i>
        
    </button>

        
    </div>

    

</div>


                <div class="bank-detail-row">

                    <span>
                        Account Name
                    </span>

                    <strong>
                        ${escapeHtml(order.payment.accountName)}
                    </strong>

                </div>

            </div>

        </div>


        <!-- INSTRUCTIONS -->

        <div class="checkout-instructions">

            <div class="checkout-instructions-title">

                <i data-lucide="info"></i>

                <span>
                    Payment Instructions
                </span>

            </div>


            <ol>

                <li>
                    Transfer exactly
                    <strong>${formatPrice(order.total)}</strong>
                    to the BCA account above.
                </li>

                <li>
                    Make sure the payment amount
                    matches your order total.
                </li>

                <li>
                    Save your transfer receipt
                    or payment proof.
                </li>

                <li>
                    Download your order details PDF.
                </li>

                <li>
                    Submit your payment proof
                    through the verification form.
                </li>

            </ol>

        </div>


        <!-- ACTIONS -->

        <div class="checkout-actions">

            <button
                type="button"
                class="btn-primary"
                id="downloadOrderPdf"
            >

                <i data-lucide="file-down"></i>

                <span>
                    Download Order PDF
                </span>

            </button>


            <a
                href="${escapeHtml(STORE_CONFIG.verificationForm)}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary"
                id="verifyPaymentButton"
            >

                <i data-lucide="external-link"></i>

                <span>
                    Verify Payment
                </span>

            </a>

        </div>


        <div class="checkout-note">

            <i data-lucide="heart"></i>

            <span>
                Thank you for supporting the CBS Charity initiative.
            </span>

        </div>

    `;

  if (typeof lucide !== 'undefined' && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}

/* ---------------------------------------------------------
   COPY ORDER ID
--------------------------------------------------------- */

async function copyOrderId() {
  if (!currentOrder) {
    return;
  }

  try {
    await navigator.clipboard.writeText(currentOrder.id);

    showToast('Copied', 'Order ID copied to clipboard.');
  } catch (error) {
    /*
           Fallback for browsers where
           Clipboard API is unavailable.
        */

    const textarea = document.createElement('textarea');

    textarea.value = currentOrder.id;

    textarea.style.position = 'fixed';

    textarea.style.opacity = '0';

    document.body.appendChild(textarea);

    textarea.select();

    try {
      document.execCommand('copy');

      showToast('Copied', 'Order ID copied to clipboard.');
    } catch (copyError) {
      showToast('Copy failed', `Your Order ID is ${currentOrder.id}`);
    }

    document.body.removeChild(textarea);
  }
}

/* ---------------------------------------------------------
   PDF GENERATION
--------------------------------------------------------- */

function downloadOrderPDF() {
  if (!currentOrder) {
    return;
  }

  /*
       jsPDF must be loaded from index.html.
    */

  if (typeof window.jspdf === 'undefined' || typeof window.jspdf.jsPDF === 'undefined') {
    showToast('PDF unavailable', 'The PDF library has not loaded yet.');

    return;
  }

  const { jsPDF } = window.jspdf;

  const doc = new jsPDF({
    unit: 'mm',
    format: 'a4',
  });

  const order = currentOrder;

  /* -----------------------------------------------------
       PAGE SETTINGS
    ----------------------------------------------------- */

  const pageWidth = doc.internal.pageSize.getWidth();

  const pageHeight = doc.internal.pageSize.getHeight();

  const margin = 18;

  let y = 20;

  /* -----------------------------------------------------
       HEADER
    ----------------------------------------------------- */

  doc.setFont('helvetica', 'bold');

  doc.setFontSize(20);

  doc.text('CBS CHARITY STORE', margin, y);

  y += 8;

  doc.setFont('helvetica', 'normal');

  doc.setFontSize(10);

  doc.text('Citra Bangsa School — 20th Anniversary', margin, y);

  y += 12;

  doc.setDrawColor(210, 210, 210);

  doc.line(margin, y, pageWidth - margin, y);

  /* -----------------------------------------------------
       ORDER INFORMATION
    ----------------------------------------------------- */

  y += 10;

  doc.setFont('helvetica', 'bold');

  doc.setFontSize(11);

  doc.text('ORDER DETAILS', margin, y);

  y += 7;

  doc.setFont('helvetica', 'normal');

  doc.setFontSize(10);

  doc.text(`Order ID: ${order.id}`, margin, y);

  y += 6;

  doc.text(`Date: ${formatOrderDate(new Date(order.createdAt))}`, margin, y);

  /* -----------------------------------------------------
       ITEMS
    ----------------------------------------------------- */

  y += 12;

  doc.setFont('helvetica', 'bold');

  doc.setFontSize(11);

  doc.text('ORDER ITEMS', margin, y);

  y += 7;

  /* Table header */

  doc.setFontSize(9);

  doc.setFont('helvetica', 'bold');

  doc.text('Item', margin, y);

  doc.text('Qty', 128, y, {
    align: 'right',
  });

  doc.text('Price', 160, y, {
    align: 'right',
  });

  doc.text('Subtotal', pageWidth - margin, y, {
    align: 'right',
  });

  y += 3;

  doc.line(margin, y, pageWidth - margin, y);

  y += 7;

  /* -----------------------------------------------------
       ITEMS LOOP
    ----------------------------------------------------- */

  doc.setFont('helvetica', 'normal');

  for (const item of order.items) {
    /*
           Protect against page overflow.
        */

    if (y > pageHeight - 55) {
      doc.addPage();

      y = 20;
    }

    const itemTitle = item.productName;

    const designText = item.designName ? `Design: ${item.designName}` : '';

    const sizeText = item.size ? `Size: ${item.size}` : '';

    doc.setFontSize(9);

    doc.text(itemTitle, margin, y);

    y += 5;

    doc.setFontSize(8);

    let optionText = [designText, sizeText].filter(Boolean).join(' | ');

    if (optionText) {
      doc.text(optionText, margin + 2, y);
    }

    doc.setFontSize(9);

    doc.text(String(item.quantity), 128, y, {
      align: 'right',
    });

    doc.text(formatPriceForPDF(item.price), 160, y, {
      align: 'right',
    });

    doc.text(formatPriceForPDF(item.subtotal), pageWidth - margin, y, {
      align: 'right',
    });

    y += 8;
  }

  /* -----------------------------------------------------
       TOTAL
    ----------------------------------------------------- */

  y += 3;

  doc.line(margin, y, pageWidth - margin, y);

  y += 9;

  doc.setFont('helvetica', 'bold');

  doc.setFontSize(12);

  doc.text('TOTAL', 128, y, {
    align: 'right',
  });

  doc.text(formatPriceForPDF(order.total), pageWidth - margin, y, {
    align: 'right',
  });

  /* -----------------------------------------------------
       PAYMENT
    ----------------------------------------------------- */

  y += 15;

  doc.setFontSize(11);

  doc.text('PAYMENT INFORMATION', margin, y);

  y += 8;

  doc.setFont('helvetica', 'normal');

  doc.setFontSize(10);

  doc.text(`Bank: ${order.payment.bank}`, margin, y);

  y += 6;

  doc.text(`Account Number: ${order.payment.accountNumber}`, margin, y);

  y += 6;

  doc.text(`Account Name: ${order.payment.accountName}`, margin, y);

  y += 12;

  /* -----------------------------------------------------
       INSTRUCTIONS
    ----------------------------------------------------- */

  doc.setFont('helvetica', 'bold');

  doc.setFontSize(11);

  doc.text('PAYMENT INSTRUCTIONS', margin, y);

  y += 7;

  doc.setFont('helvetica', 'normal');

  doc.setFontSize(9);

  const instructions = [
    `1. Transfer exactly ${formatPriceForPDF(order.total)} to the BCA account above.`,

    '2. Save your transfer receipt or payment proof.',

    '3. Submit the payment proof through the payment verification form.',

    `4. Keep this document and your Order ID (${order.id}) for reference.`,
  ];

  for (const instruction of instructions) {
    const wrapped = doc.splitTextToSize(instruction, pageWidth - margin * 2);

    doc.text(wrapped, margin, y);

    y += wrapped.length * 5 + 2;
  }

  /* -----------------------------------------------------
       FOOTER
    ----------------------------------------------------- */

  doc.setFontSize(8);

  doc.setFont('helvetica', 'normal');

  doc.text(STORE_CONFIG.storeName, margin, pageHeight - 15);

  doc.text(STORE_CONFIG.eventName, pageWidth - margin, pageHeight - 15, {
    align: 'right',
  });

  /* -----------------------------------------------------
       SAVE
    ----------------------------------------------------- */

  const filename = `${order.id}.pdf`;

  doc.save(filename);

  showToast('PDF ready', `Order details saved as ${filename}`);
}

/* ---------------------------------------------------------
   PRICE FORMAT FOR PDF
--------------------------------------------------------- */

function formatPriceForPDF(amount) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/* ---------------------------------------------------------
   CHECKOUT EVENTS
--------------------------------------------------------- */

function initializeCheckout() {
  const { modal, close } = getCheckoutElements();

  if (!modal) {
    return;
  }

  /* -----------------------------------------------------
       Close
    ----------------------------------------------------- */

  if (close) {
    close.addEventListener('click', closeCheckout);
  }

  /* -----------------------------------------------------
       Click outside
    ----------------------------------------------------- */

  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeCheckout();
    }
  });

  /* -----------------------------------------------------
       Buttons
    ----------------------------------------------------- */

  modal.addEventListener('click', (event) => {
    const copyButton = event.target.closest('#copyOrderId');

    if (copyButton) {
      copyOrderId();

      return;
    }

    const pdfButton = event.target.closest('#downloadOrderPdf');

    if (pdfButton) {
      downloadOrderPDF();

      return;
    }
  });

  /* -----------------------------------------------------
       Escape
    ----------------------------------------------------- */

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      if (modal.classList.contains('open')) {
        closeCheckout();
      }
    }
  });
}

document.addEventListener('click', async function (event) {
  const button = event.target.closest('.copy-bank-account');

  if (!button) return;

  const accountNumber = button.dataset.account;

  try {
    await navigator.clipboard.writeText(accountNumber);

    button.innerHTML = `
            <i data-lucide="check"></i>
            <span>Copied</span>
        `;

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    if (typeof showToast === 'function') {
      showToast('Copied', 'Nomor rekening berhasil disalin.');
    }

    setTimeout(() => {
      button.innerHTML = `
                <i data-lucide="copy"></i>
                <span>Copy</span>
            `;

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 1800);
  } catch (error) {
    console.error('Failed to copy account number:', error);

    if (typeof showToast === 'function') {
      showToast('Copy gagal', 'Silakan salin nomor rekening secara manual.');
    }
  }
});

/* ---------------------------------------------------------
   GLOBAL CHECKOUT API
--------------------------------------------------------- */

window.Checkout = {
  open: openCheckout,

  close: closeCheckout,

  getCurrentOrder: () => currentOrder,

  createOrder: createOrder,

  downloadPDF: downloadOrderPDF,
};

/* ---------------------------------------------------------
   INITIALIZE
--------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initializeCheckout();
});
