const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json({limit:'5mb'}));

const DATA = path.join(__dirname,'products.json');
const ORDERS_DATA = path.join(__dirname, '..', '..', 'jayx_orders_shared.json');
const LEGACY_ORDERS_DATA = path.join(__dirname, 'orders.json');
function readData(){ try { return JSON.parse(fs.readFileSync(DATA,'utf8')||'[]'); } catch(e){ return []; } }
function writeData(d){ fs.writeFileSync(DATA, JSON.stringify(d, null, 2)); }
function readOrders(){ try { return JSON.parse(fs.readFileSync(ORDERS_DATA,'utf8')||'[]'); } catch(e){ return []; } }
function writeOrders(d){ fs.writeFileSync(ORDERS_DATA, JSON.stringify(d, null, 2)); }
function readLegacyOrders(){ try { return JSON.parse(fs.readFileSync(LEGACY_ORDERS_DATA,'utf8')||'[]'); } catch(e){ return []; } }
function normalizeOrderId(orderId){ return String(orderId || '').trim().toLowerCase(); }
function getOrderSyncKey(order, index = 0) {
  if (order && order.orderId) {
    return normalizeOrderId(order.orderId);
  }

  return normalizeOrderId([
    `legacy-${index}`,
    order?.date || '',
    order?.customer?.fullName || '',
    order?.total || ''
  ].join('|'));
}
function mergeOrders(primaryOrders, fallbackOrders) {
  const merged = new Map();
  [...(Array.isArray(primaryOrders) ? primaryOrders : []), ...(Array.isArray(fallbackOrders) ? fallbackOrders : [])].forEach((order, index) => {
    const key = getOrderSyncKey(order, index);
    if (!key) return;

    const existing = merged.get(key);
    if (!existing) {
      merged.set(key, { ...order });
      return;
    }

    if (typeof existing.verified !== 'boolean' && typeof order?.verified === 'boolean') {
      existing.verified = order.verified;
    }
  });

  return Array.from(merged.values());
}
function syncLegacyOrders() {
  const merged = mergeOrders(readOrders(), readLegacyOrders());
  if (merged.length) {
    writeOrders(merged);
  }
}

// static files (serve the web-store folder)
app.use('/', express.static(path.join(__dirname,'..')));

app.get('/api/products', (req,res)=>{
  res.json(readData());
});

app.post('/api/products', (req,res)=>{
  const items = readData();
  const p = req.body;
  items.push(p);
  writeData(items);
  res.json(p);
});

app.put('/api/products/:id', (req,res)=>{
  const items = readData();
  const id = req.params.id;
  const idx = items.findIndex(x=>String(x.id) === String(id));
  if(idx === -1) return res.status(404).json({error:'not found'});
  items[idx] = Object.assign({}, items[idx], req.body);
  writeData(items);
  res.json(items[idx]);
});

app.delete('/api/products/:id', (req,res)=>{
  const items = readData();
  const id = req.params.id;
  const filtered = items.filter(x=>String(x.id) !== String(id));
  writeData(filtered);
  res.json({ok:true});
});

app.get('/api/orders', (req, res) => {
  res.json(readOrders());
});

app.post('/api/orders', (req, res) => {
  const orders = readOrders();
  const order = req.body || {};
  orders.unshift(order);
  writeOrders(orders);
  res.status(201).json(order);
});

app.put('/api/orders/:orderId', (req, res) => {
  const orders = readOrders();
  const orderId = String(req.params.orderId || '').toLowerCase();
  const index = orders.findIndex((order) => String(order?.orderId || '').toLowerCase() === orderId);

  if (index === -1) {
    return res.status(404).json({ error: 'not found' });
  }

  orders[index] = Object.assign({}, orders[index], req.body || {});
  writeOrders(orders);
  res.json(orders[index]);
});

syncLegacyOrders();

const port = process.env.PORT || 3001;
app.listen(port, ()=>console.log('JayXstores demo server listening on', port));
