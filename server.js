// Импорт необходимых модулей
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import Joi from 'joi';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Подключение к PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Middleware
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Схема валидации для регистрации
const userSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  weight: Joi.number().required(),
  height: Joi.number().required(),
  gender: Joi.string().valid('male', 'female').required(),
  age: Joi.number().required(),
  bodyType: Joi.string().valid('ectomorph', 'mesomorph', 'endomorph').required(),
});

// Регистрация
app.post('/register', async (req, res) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { name, email, password, weight, height, gender, age, bodyType } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (name, email, password, weight, height, gender, age, body_type) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id, name, email',
      [name, email, hashedPassword, weight, height, gender, age, bodyType]
    );
    
    res.status(201).json({ message: 'User registered successfully', user: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
s
