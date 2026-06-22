# 🍽️ Kantin FT UNSOED – Sistem Pemesanan Online

Sistem pemesanan kantin berbasis web dengan fitur lengkap untuk pembeli dan admin.

---

## 📂 Struktur File

```
kantin-ft-unsoed/
├── server.js          ← Backend server (Node.js + Express)
├── package.json       ← Konfigurasi project
├── public/
│   ├── index.html     ← Halaman pembeli (pesan makanan)
│   └── admin.html     ← Dashboard admin
└── README.md          ← Panduan ini
```

---

## 🚀 Cara Menjalankan Lokal (di Komputer)

### 1. Install Node.js
Download dari https://nodejs.org dan install versi LTS.

### 2. Install dependencies
```bash
npm install
```

### 3. Jalankan server
```bash
npm start
```

### 4. Buka di browser
- **Halaman Pembeli:** http://localhost:3000
- **Dashboard Admin:** http://localhost:3000/admin.html

---

## 🌐 TUTORIAL HOSTING GRATIS

### ✅ OPSI 1: Render.com (PALING DIREKOMENDASIKAN – Gratis & Mudah)

1. **Buat akun** di https://render.com (gunakan GitHub/Google)

2. **Upload kode ke GitHub:**
   - Buat akun di https://github.com
   - Buat repository baru (misal: `kantin-ft-unsoed`)
   - Upload semua file ini ke repository tersebut

3. **Deploy di Render:**
   - Login ke Render → klik "New +" → pilih "Web Service"
   - Pilih repository GitHub kamu
   - Isi form:
     - **Name:** `kantin-ft-unsoed`
     - **Environment:** `Node`
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
   - Klik "Create Web Service"

4. **Selesai!** Render akan memberikan URL seperti:
   `https://kantin-ft-unsoed.onrender.com`

> ⚠️ **Catatan:** Server gratis Render "tidur" setelah 15 menit tidak aktif,
> dan butuh ~30 detik untuk bangun lagi. Untuk penggunaan aktif, upgrade ke plan gratis tier.

---

### ✅ OPSI 2: Railway.app (Mudah & Cepat)

1. Buat akun di https://railway.app
2. Klik "New Project" → "Deploy from GitHub repo"
3. Pilih repository
4. Railway otomatis detect Node.js dan deploy!
5. Dapat URL gratis: `https://kantin-ft-unsoed.up.railway.app`

> Gratis $5 kredit/bulan. Cukup untuk kantin kecil-menengah.

---

### ✅ OPSI 3: Glitch.com (Paling Mudah untuk Pemula)

1. Buka https://glitch.com → Sign up
2. Klik "New Project" → "Import from GitHub"
3. Paste URL repo GitHub kamu
4. Langsung live di: `https://nama-project.glitch.me`

> Gratis, tapi "tidur" setelah 5 menit tidak aktif.

---

### ✅ OPSI 4: Cyclic.sh (100% Gratis, Tidak Tidur)

1. Buat akun di https://cyclic.sh dengan GitHub
2. Klik "Link Your Own" → pilih repo
3. Deploy otomatis!

---

## 💾 UPGRADE: Menggunakan Database Permanen

Saat ini data tersimpan di memory server (hilang saat server restart).
Untuk data permanen, gunakan salah satu:

### MongoDB Atlas (Gratis 512MB)
1. Buat akun di https://cloud.mongodb.com
2. Buat cluster gratis
3. Ganti bagian `let orders = []` di server.js dengan koneksi MongoDB
4. Install: `npm install mongoose`

### Contoh koneksi MongoDB:
```js
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const OrderSchema = new mongoose.Schema({
  orderNumber: String,
  customerName: String,
  // ... field lainnya
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);
```

---

## 📱 Fitur Website

### Halaman Pembeli (index.html)
- ✅ Menu makanan & minuman lengkap dengan emoji
- ✅ Filter kategori (Makanan / Minuman)
- ✅ Keranjang belanja interaktif
- ✅ Form data pemesan (nama, HP, lokasi/meja)
- ✅ 3 metode pembayaran (QRIS, DANA, Transfer Bank)
- ✅ Nomor antrian otomatis (001, 002, dst.)
- ✅ Cek status pesanan real-time
- ✅ Floating cart button

### Dashboard Admin (admin.html)
- ✅ Statistik pesanan (total, menunggu, diproses, selesai, pendapatan)
- ✅ Tabel pesanan dengan filter status
- ✅ Pencarian pesanan
- ✅ Update status: Proses → Selesai / Batalkan
- ✅ Hapus pesanan
- ✅ Detail pesanan lengkap
- ✅ Auto-refresh setiap 15 detik

---

## 🔒 Keamanan Admin

Untuk produksi, tambahkan proteksi password pada halaman admin.
Cara sederhana dengan basic auth di server.js:

```js
const adminAuth = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== 'Basic ' + Buffer.from('admin:password123').toString('base64')) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Unauthorized');
  }
  next();
};

app.use('/admin.html', adminAuth);
```

---

## 📞 Dukungan

Dibuat untuk Kantin FT Universitas Jenderal Soedirman (UNSOED).
