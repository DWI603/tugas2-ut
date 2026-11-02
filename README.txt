TUGAS PRAKTIK 2 - APLIKASI BAHAN AJAR UNIVERSITAS TERBUKA
========================================================

CARA MENJALANKAN
1. Ekstrak folder tugas2-vue-ut.
2. Pastikan perangkat terhubung ke internet saat pertama membuka, karena Vue.js 2 dimuat melalui CDN.
3. Buka index.html menggunakan browser (Chrome/Edge/Firefox).
4. Pilih menu Stok Bahan Ajar atau Tracking DO.

ISI FOLDER
- index.html             : halaman utama dan navigasi.
- stok.html              : halaman pengelolaan stok.
- tracking.html          : halaman tracking Delivery Order.
- css/style.css          : tampilan responsif.
- js/dataBahanAjar.js    : dummy data bersama yang diadaptasi dari lampiran soal.
- js/stok-app.js         : logika Vue untuk halaman stok.
- js/tracking-app.js     : logika Vue untuk halaman tracking.

FITUR STOK
- Daftar stok beserta kode, judul, kategori, UPBJJ, rak, stok, safety stock, status, dan catatan.
- Status Aman, Menipis, dan Kosong.
- Filter UPBJJ, kategori (muncul setelah UPBJJ dipilih), stok di bawah safety, dan stok kosong.
- Pengurutan judul, jumlah stok, dan harga.
- Tambah serta edit data dengan validasi sederhana.

FITUR TRACKING DO
- Pilih nomor DO untuk melihat detail dan riwayat perjalanan.
- Nomor DO baru dibuat otomatis dengan pola DO{tahun}-{nomor urut 3 digit}.
- Input NIM, nama, ekspedisi, paket, dan tanggal kirim.
- Detail isi paket dan total harga tampil setelah paket dipilih.

CATATAN PENTING
- Data bersifat dummy dan disimpan di memori browser selama halaman terbuka. Refresh halaman akan mengembalikan data ke data awal.
- Aplikasi ini tidak memakai database/backend, sesuai instruksi tugas.
