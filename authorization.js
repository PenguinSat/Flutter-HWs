// server.js
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const { Pool } = require('pg');
const Joi = require('joi');
const app = express();
const port = 3000;

// PostgreSQL connection
const pool = new Pool({
  user: 'your_username',
  host: 'localhost',
  database: 'fitness_app',
  password: 'your_password',
  port: 5432,
});

app.use(express.json());
app.use(cookieParser());

// Регистрация пользователя
app.post('/register', async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
      [username, hashedPassword]
    );
    res.status(201).send(result.rows[0]);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Вход в систему
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  const user = result.rows[0];
  if (!user) return res.status(400).send('Invalid username or password');

  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) return res.status(400).send('Invalid username or password');

  res.cookie('session', 'some_unique_token', { httpOnly: true, maxAge: 3600000 });
  res.status(200).send('Logged in successfully');
});

// Выйти из системы
app.post('/logout', (req, res) => {
  res.clearCookie('session');
  res.status(200).send('Logged out successfully');
});

// Валидация данных пользователя
function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });
  return schema.validate(user);
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
