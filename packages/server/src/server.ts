import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';

import { sample_foods, sample_tags, sample_users } from './data';

const PORT = 5000;
const app = express();

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:4200',
  ]
}));

app.get('/api/foods/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  res.send(sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase())));
});

app.get('/api/foods', (req, res) => {
  res.send(sample_foods)
});

app.get('/api/foods/tags', (req, res) => {
  res.send(sample_tags)
});

app.get('/api/foods/tag/:tag', (req, res) => {
  const tag = req.params.tag;
  res.send(sample_foods.filter(food => food.tags?.includes(tag)));
});

app.get('/api/foods/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  res.send(sample_foods.find(food => food.id === foodId));
});

app.post('/api/users/login', (req, res) => {
  const { email, password } = req.body;
  const user = sample_users.find(user => user.email === email && user.password === password);

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(401).send('Invalid email or password');
  }
});

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({
    email: user.email,
    isAdmin: user.isAdmin
  }, 'SecretPassword', { expiresIn: '30d' });

  user.token = token;
  return user;
};

app.listen(PORT, () => {
  console.log('Website server running on http://localhost:' + PORT + '!');
});
