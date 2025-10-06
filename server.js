import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

const PRODUCTS_FILE = './products.json';
const ORDERS_FILE = './orders.json';
const CONTACTS_FILE = './contacts.json';
// Save contact to file
function saveContact(contact) {
  let contacts = [];
  if (fs.existsSync(CONTACTS_FILE)) {
    contacts = JSON.parse(fs.readFileSync(CONTACTS_FILE));
  }
  contacts.push(contact);
  fs.writeFileSync(CONTACTS_FILE, JSON.stringify(contacts, null, 2));
}
// Contact form endpoint
app.post('/contact', (req, res) => {
  const contact = req.body;
  saveContact(contact);
  res.status(201).json({ message: 'Contact received', contact });
});

// Load products from file
function getProducts() {
  if (!fs.existsSync(PRODUCTS_FILE)) return [];
  return JSON.parse(fs.readFileSync(PRODUCTS_FILE));
}

// Save order to file
function saveOrder(order) {
  let orders = [];
  if (fs.existsSync(ORDERS_FILE)) {
    orders = JSON.parse(fs.readFileSync(ORDERS_FILE));
  }
  orders.push(order);
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

app.get('/products', (req, res) => {
  res.json(getProducts());
});

app.post('/orders', (req, res) => {
  const order = req.body;
  saveOrder(order);
  res.status(201).json({ message: 'Order received', order });
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
