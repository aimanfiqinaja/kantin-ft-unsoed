const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory database (gunakan database nyata untuk produksi)
let orders = [];
let orderCounter = 1;

function formatOrderNumber(num) {
  return String(num).padStart(3, '0');
}

// GET semua pesanan (admin)
app.get('/api/orders', (req, res) => {
  const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  res.json(sorted);
});

// GET pesanan by nomor antrian (pembeli)
app.get('/api/orders/track/:orderNumber', (req, res) => {
  const order = orders.find(o => o.orderNumber === req.params.orderNumber);
  if (!order) return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  res.json(order);
});

// POST buat pesanan baru
app.post('/api/orders', (req, res) => {
  const { customerName, phone, location, items, paymentMethod, totalPrice, notes } = req.body;
  if (!customerName || !phone || !location || !items || items.length === 0) {
    return res.status(400).json({ error: 'Data pesanan tidak lengkap' });
  }
  const order = {
    id: uuidv4(),
    orderNumber: formatOrderNumber(orderCounter++),
    customerName,
    phone,
    location,
    items,
    paymentMethod,
    totalPrice,
    notes: notes || '',
    status: 'pending',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  orders.push(order);
  res.status(201).json(order);
});

// PATCH update status pesanan (admin)
app.patch('/api/orders/:id/status', (req, res) => {
  const { status } = req.body;
  const validStatuses = ['pending', 'processing', 'completed', 'cancelled'];
  if (!validStatuses.includes(status)) {
    return res.status(400).json({ error: 'Status tidak valid' });
  }
  const idx = orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  orders[idx].status = status;
  orders[idx].updatedAt = new Date().toISOString();
  res.json(orders[idx]);
});

// DELETE hapus pesanan (admin)
app.delete('/api/orders/:id', (req, res) => {
  const idx = orders.findIndex(o => o.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Pesanan tidak ditemukan' });
  orders.splice(idx, 1);
  res.json({ message: 'Pesanan berhasil dihapus' });
});

// GET statistik (admin)
app.get('/api/stats', (req, res) => {
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    processing: orders.filter(o => o.status === 'processing').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
    revenue: orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + o.totalPrice, 0)
  };
  res.json(stats);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
