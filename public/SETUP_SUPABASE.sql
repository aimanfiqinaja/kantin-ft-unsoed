-- ================================================================
-- SQL SETUP – Kantin FT UNSOED
-- Jalankan ini di Supabase SQL Editor (langkah ada di PANDUAN.md)
-- ================================================================

-- 1. Buat tabel orders
CREATE TABLE IF NOT EXISTS orders (
  id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number    TEXT NOT NULL UNIQUE,
  customer_name   TEXT NOT NULL,
  phone           TEXT NOT NULL,
  location        TEXT NOT NULL,
  notes           TEXT DEFAULT '',
  items           JSONB NOT NULL DEFAULT '[]',
  payment_method  TEXT NOT NULL,
  total_price     INTEGER NOT NULL DEFAULT 0,
  status          TEXT NOT NULL DEFAULT 'pending'
                  CHECK (status IN ('pending','processing','completed','cancelled')),
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Index agar query cepat
CREATE INDEX IF NOT EXISTS idx_orders_status       ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at   ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_order_number ON orders(order_number);

-- 3. Aktifkan Row Level Security (RLS)
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- 4. Policy: siapa pun bisa INSERT (pembeli buat pesanan)
CREATE POLICY "allow_insert" ON orders
  FOR INSERT WITH CHECK (true);

-- 5. Policy: siapa pun bisa SELECT (pembeli cek status)
CREATE POLICY "allow_select" ON orders
  FOR SELECT USING (true);

-- 6. Policy: siapa pun bisa UPDATE (admin ubah status)
CREATE POLICY "allow_update" ON orders
  FOR UPDATE USING (true);

-- 7. Policy: siapa pun bisa DELETE (admin hapus pesanan)
CREATE POLICY "allow_delete" ON orders
  FOR DELETE USING (true);

-- 8. Aktifkan Realtime untuk tabel orders
-- (Ini dilakukan lewat UI Supabase, bukan SQL – lihat PANDUAN.md langkah 6)

-- ================================================================
-- SELESAI! Tabel siap digunakan.
-- ================================================================
