import { Food } from './app/shared/models/food';
import { Tag } from './app/shared/models/tags';

export const sample_foods: Food[] = [
  {
    id: '1',
    name: 'Pizza Pepperoni',
    cookingTime: '10-20',
    price: 10,
    favorite: false,
    origins: ['italy'],
    stars: 4.5,
    imageUrl: 'assets/images/food-1.jpg',
    tags: ['Fast food', 'Pizza', 'Lunch'],
  },
  {
    id: '2',
    name: 'Meatball',
    price: 20,
    cookingTime: '20-30',
    favorite: true,
    origins: ['persia', 'middle east', 'china'],
    stars: 4.7,
    imageUrl: 'assets/images/food-2.jpg',
    tags: ['Slow food', 'Lunch'],
  },
  {
    id: '3',
    name: 'Hamburger',
    price: 5,
    cookingTime: '10-15',
    favorite: false,
    origins: ['germany', 'us'],
    stars: 3.5,
    imageUrl: 'assets/images/food-3.jpg',
    tags: ['Fast food', 'Hamburger'],
  },
  {
    id: '4',
    name: 'Fried Potatoes',
    price: 2,
    cookingTime: '15-20',
    favorite: true,
    origins: ['belgium', 'france'],
    stars: 3.3,
    imageUrl: 'assets/images/food-4.jpg',
    tags: ['Fast food', 'Fried'],
  },
  {
    id: '5',
    name: 'Chicken Soup',
    price: 11,
    cookingTime: '40-50',
    favorite: false,
    origins: ['india', 'asia'],
    stars: 3.0,
    imageUrl: 'assets/images/food-5.jpg',
    tags: ['Slow food', 'Soup'],
  },
  {
    id: '6',
    name: 'Vegetables Pizza',
    price: 9,
    cookingTime: '40-50',
    favorite: false,
    origins: ['italy'],
    stars: 4.0,
    imageUrl: 'assets/images/food-6.jpg',
    tags: ['Fast food', 'Pizza', 'Lunch'],
  },
];

export const sample_tags: Tag[] = [
  { name: 'All', count: 6 },
  { name: 'Fast food', count: 4 },
  { name: 'Pizza', count: 2 },
  { name: 'Lunch', count: 3 },
  { name: 'Slow food', count: 2 },
  { name: 'Hamburger', count: 1 },
  { name: 'Fried', count: 1 },
  { name: 'Soup', count: 1 },
];
