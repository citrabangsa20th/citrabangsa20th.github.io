# CBS Charity Store — Starter Prototype

Prototype awal web merchandise Charity Citra Bangsa School 20th Anniversary.

## Isi prototype

- 4 produk dummy:
  - T-Shirt
  - Tumbler
  - Mug
  - Tote Bag
- Masing-masing 4 desain dummy
- T-Shirt memiliki ukuran S, M, L, XL, XXL
- Product detail
- Pilih desain
- Pilih ukuran
- Quantity
- Shopping cart
- LocalStorage
- Checkout
- Order ID otomatis
- Total harga otomatis
- Informasi transfer BCA dummy
- Download detail pesanan melalui Print → Save as PDF
- Tombol Google Form dummy

## Struktur

index.html
assets/
  css/style.css
  js/products.js   <-- EDIT PRODUK DI SINI
  js/app.js
  images/

## Bagian yang nanti perlu diganti

1. Nomor rekening BCA di `assets/js/app.js`
2. Nama rekening
3. URL Google Form di fungsi `openVerification()`
4. Produk, harga, desain, ukuran, dan gambar di `assets/js/products.js`
5. Gambar SVG dummy di `assets/images/`

## Catatan PDF

Versi starter menggunakan fitur print browser sehingga pembeli memilih "Save as PDF".
Untuk versi final, PDF dapat dibuat lebih rapi secara otomatis menggunakan library PDF
dan dapat diberi QR/Order ID, data pemesan, dan instruksi pembayaran.

## Menjalankan

Tidak membutuhkan Node.js.

Cukup buka `index.html` di browser.
Untuk hasil yang lebih konsisten, deploy ke hosting statis seperti GitHub Pages,
Netlify, atau hosting sekolah.
