const express = require('express');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { nanoid } = require('nanoid');

const app = express();
const PORT = 4000;
const DB_FILE = path.join(__dirname, 'db.json');
const JWT_SECRET = 'dev_secret_key_change_this';

// cria DB inicial se não existir
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [] }, null, 2));
}

app.use(cors());
app.use(express.json());

function readDB() {
  return JSON.parse(fs.readFileSync(DB_FILE, 'utf8'));
}
function writeDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// registro
app.post('/api/auth/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email e password required' });

  const db = readDB();
  const exists = db.users.find(u => u.email === email);
  if (exists) return res.status(409).json({ message: 'Usuário já existe' });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: nanoid(), name: name || '', email, password: hashed };
  db.users.push(user);
  writeDB(db);

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

// login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const db = readDB();
  const user = db.users.find(u => u.email === email);
  if (!user) return res.status(401).json({ message: 'Credenciais inválidas' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Credenciais inválidas' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
  res.json({ user: { id: user.id, name: user.name, email: user.email }, token });
});

// rota de exemplo protegida
app.get('/api/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ message: 'No token' });
  const [, token] = auth.split(' ');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const db = readDB();
    const user = db.users.find(u => u.id === payload.id);
    return res.json({ user: { id: user.id, name: user.name, email: user.email } });
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend rodando em http://localhost:${PORT}`);
});