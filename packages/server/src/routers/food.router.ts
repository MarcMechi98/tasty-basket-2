import { Router } from 'express';
import { sample_foods, sample_tags } from '../data';

const router = Router();

router.get('/', (req, res) => {
  res.send(sample_foods)
});

router.get('/search/:searchTerm', (req, res) => {
  const searchTerm = req.params.searchTerm;
  res.send(sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase())));
});

router.get('/tags', (req, res) => {
  res.send(sample_tags)
});

router.get('/tag/:tagName', (req, res) => {
  const tag = req.params.tagName;
  res.send(sample_foods.filter(food => food.tags?.includes(tag)));
});

router.get('/:foodId', (req, res) => {
  const foodId = req.params.foodId;
  res.send(sample_foods.find(food => food.id === foodId));
});

export default router;