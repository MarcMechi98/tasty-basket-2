import express from 'express';
import cors from 'cors';
import { sample_foods, sample_tags } from './data';

const PORT = 5000;
const app = express();

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

app.listen(PORT, () => {
  console.log('Website server running on http://localhost:' + PORT + '!');
});
