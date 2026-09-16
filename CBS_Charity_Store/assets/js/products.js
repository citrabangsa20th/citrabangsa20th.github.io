/* =========================================================
CBS CHARITY STORE
PRODUCT DATABASE
================

FILE INI ADALAH TEMPAT UTAMA UNTUK MENGATUR PRODUK.

Nanti ketika merchandise asli sudah ditentukan,
Anda cukup mengubah data di file ini.

Tidak perlu mengubah sistem:

* Cart
* Modal
* Checkout
* PDF
* Animasi
  ========================================================= */

/* =========================================================
STORE CONFIGURATION
========================================================= */

const STORE_CONFIG = {
  /* Nama toko */

  storeName: 'Citra Bangsa School',

  storeNameShort: 'CBS',

  /* Event */

  eventName: '20th Anniversary',

  eventTagline: '20 Years of Growing, A New Generation to Elevate.',

  /* Informasi pembayaran
   GANTI DENGAN DATA RESMI NANTI
*/

  payment: {
    bank: 'BCA',

    accountNumber: '8832161097',

    accountName: 'Citra Bangsa Yayasan',
  },

  /* Google Form
   GANTI DENGAN LINK GOOGLE FORM FINAL
*/

  verificationForm: 'https://forms.gle/42ru7SaudLqJ5zZKA',

  /* Currency */

  currency: 'IDR',

  currencyLocale: 'id-ID',
};

/* =========================================================
PRODUCT DATABASE
========================================================= */

const PRODUCTS = [
  /* =====================================================
   PRODUCT 01 — T-SHIRT
===================================================== */

  {
    id: 'TSHIRT-001',

    /* Basic information */

    name: 'T-Shirt',

    slug: 'tshirt',

    category: 'apparel',

    categoryLabel: 'Apparel',

    /* Product badge */

    badge: 'Student Design',

    /* Price */

    price: 100000,

    /* Description */

    description: 'Kaos edisi spesial 20th Anniversary Citra Bangsa School dengan desain karya siswa CBS.',

    shortDescription: 'Kaos anniversary dengan desain karya siswa CBS.',

    /* Main product image */

    image: 'assets/images/products/tshirt-main.svg',

    /* Product gallery
       Bisa ditambah sebanyak yang diperlukan.
    */

    gallery: ['assets/images/products/tshirt-main.svg', 'assets/images/products/tshirt-back.svg', 'assets/images/products/tshirt-detail.svg'],

    /* Available sizes */

    hasSize: true,

    sizes: ['S', 'M', 'L', 'XL', 'XXL'],

    /* Available designs */

    designs: [
      {
        id: 'TS-D01',

        name: 'Design 01',

        image: 'assets/images/designs/tshirt1.png',

        artist: 'CBS Student',
      },

      {
        id: 'TS-D02',

        name: 'Design 02',

        image: 'assets/images/designs/tshirt2.png',

        artist: 'CBS Student',
      },

      {
        id: 'TS-D03',

        name: 'Design 03',

        image: 'assets/images/designs/tshirt3.png',

        artist: 'CBS Student',
      },

      {
        id: 'TS-D04',

        name: 'Design 04',

        image: 'assets/images/designs/tshirt4.png',

        artist: 'CBS Student',
      },
    ],

    /* Stock information

       Untuk prototype:
       null = tidak menggunakan stok.

       Nanti bisa dibuat:
       stock: 50
    */

    stock: null,

    /* Optional */

    featured: true,

    active: true,
  },

  /* =====================================================
   PRODUCT 02 — TUMBLER
===================================================== */

  {
    id: 'TUMBLER-001',

    name: 'Tumbler',

    slug: 'tumbler',

    category: 'drinkware',

    categoryLabel: 'Drinkware',

    badge: 'Popular',

    price: 75000,

    description: 'Tumbler edisi charity CBS dengan pilihan desain karya siswa untuk menemani aktivitas sehari-hari.',

    shortDescription: 'Tumbler charity dengan desain siswa CBS.',

    image: 'assets/images/products/tumbler-main.svg',

    gallery: ['assets/images/products/tumbler-main.svg', 'assets/images/products/tumbler-detail.svg'],

    hasSize: false,

    sizes: [],

    designs: [
      {
        id: 'TU-D01',

        name: 'Design 01',

        image: 'assets/images/designs/tumbler1.png',

        artist: 'CBS Student',
      },

      {
        id: 'TU-D02',

        name: 'Design 02',

        image: 'assets/images/designs/tumbler2.png',

        artist: 'CBS Student',
      },

      {
        id: 'TU-D03',

        name: 'Design 03',

        image: 'assets/images/designs/tumbler3.png',

        artist: 'CBS Student',
      },

      {
        id: 'TU-D04',

        name: 'Design 04',

        image: 'assets/images/designs/tumbler4.png',

        artist: 'CBS Student',
      },
    ],

    stock: null,

    featured: true,

    active: true,
  },

  /* =====================================================
   PRODUCT 03 — MUG
===================================================== */

  {
    id: 'MUG-001',

    name: 'Mug',

    slug: 'mug',

    category: 'drinkware',

    categoryLabel: 'Drinkware',

    badge: 'Limited',

    price: 55000,

    description: 'Mug edisi 20th Anniversary dengan desain pilihan karya siswa Citra Bangsa School.',

    shortDescription: 'Mug anniversary dengan desain karya siswa.',

    image: 'assets/images/products/mug-main.svg',

    gallery: ['assets/images/products/mug-main.svg', 'assets/images/products/mug-detail.svg'],

    hasSize: false,

    sizes: [],

    designs: [
      {
        id: 'MG-D01',

        name: 'Design 01',

        image: 'assets/images/designs/mug1.png',

        artist: 'CBS Student',
      },

      {
        id: 'MG-D02',

        name: 'Design 02',

        image: 'assets/images/designs/mug2.png',

        artist: 'CBS Student',
      },

      {
        id: 'MG-D03',

        name: 'Design 03',

        image: 'assets/images/designs/mug3.png',

        artist: 'CBS Student',
      },

      {
        id: 'MG-D04',

        name: 'Design 04',

        image: 'assets/images/designs/mug4.png',

        artist: 'CBS Student',
      },
    ],

    stock: null,

    featured: true,

    active: true,
  },

  /* =====================================================
   PRODUCT 04 — TOTE BAG
===================================================== */

  {
    id: 'TOTEBAG-001',

    name: 'Tote Bag',

    slug: 'tote-bag',

    category: 'lifestyle',

    categoryLabel: 'Lifestyle',

    badge: 'Eco Choice',

    price: 60000,

    description: 'Tote bag charity dengan desain kreatif siswa CBS. Praktis digunakan untuk aktivitas sehari-hari.',

    shortDescription: 'Tote bag charity dengan desain siswa.',

    image: 'assets/images/products/totebag-main.svg',

    gallery: ['assets/images/products/totebag-main.svg', 'assets/images/products/totebag-detail.svg'],

    hasSize: false,

    sizes: [],

    designs: [
      {
        id: 'TB-D01',

        name: 'Design 01',

        image: 'assets/images/designs/totebag1.png',

        artist: 'CBS Student',
      },

      {
        id: 'TB-D02',

        name: 'Design 02',

        image: 'assets/images/designs/totebag2.png',

        artist: 'CBS Student',
      },

      {
        id: 'TB-D03',

        name: 'Design 03',

        image: 'assets/images/designs/totebag3.png',

        artist: 'CBS Student',
      },

      {
        id: 'TB-D04',

        name: 'Design 04',

        image: 'assets/images/designs/totebag4.png',

        artist: 'CBS Student',
      },
    ],

    stock: null,

    featured: false,

    active: true,
  },
];

/* =========================================================
HELPER FUNCTIONS
========================================================= */

/**

* Cari product berdasarkan ID.
  */

function getProductById(productId) {
  return PRODUCTS.find((product) => product.id === productId);
}

/**

* Cari design berdasarkan product
* dan design ID.
  */

function getDesignById(product, designId) {
  if (!product || !product.designs) {
    return null;
  }

  return product.designs.find((design) => design.id === designId);
}

/**

* Ambil semua product aktif.
  */

function getActiveProducts() {
  return PRODUCTS.filter((product) => product.active === true);
}

/**

* Ambil product berdasarkan kategori.
  */

function getProductsByCategory(category) {
  if (category === 'all') {
    return getActiveProducts();
  }

  return getActiveProducts().filter((product) => product.category === category);
}

/**

* Ambil product featured.
  */

function getFeaturedProducts() {
  return getActiveProducts().filter((product) => product.featured === true);
}

/**

* Format harga Rupiah.
  */

function formatPrice(amount) {
  return new Intl.NumberFormat(STORE_CONFIG.currencyLocale, {
    style: 'currency',

    currency: STORE_CONFIG.currency,

    maximumFractionDigits: 0,
  }).format(amount);
}

/**

* Cek apakah product
* mempunyai pilihan ukuran.
  */

function productHasSizes(product) {
  return Boolean(product && product.hasSize && product.sizes && product.sizes.length);
}

/**

* Cek stock.
*
* null = unlimited / belum menggunakan
* stock.
  */

function isProductAvailable(product) {
  if (!product) {
    return false;
  }

  if (product.stock === null) {
    return true;
  }

  return product.stock > 0;
}
