import jwt from 'jsonwebtoken';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import { sample_users } from '../data';
import { User, UserModel } from '../models/user.model';
import { FoodModel } from '../models/food.model';

const router = Router();
const jwtSecret = process.env.JWT_SECRET;

router.get('/seed', asyncHandler(async (req: any, res: any) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send('Database already seeded');
    return;
  }

  await UserModel.create(sample_users);
  res.send('Database seeded');
}));

router.post("/login", asyncHandler(async (req: any, res: any) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
  
     if(user && (await bcrypt.compare(password,user.password))) {
      res.send(generateTokenResponse(user));
     }
     else{
       res.status(401).send("Invalid email or password");
     }
  }
))

router.post('/register', asyncHandler(async (req: any, res: any) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if(user) {
      res.status(401).send('User already exists, please login!');
      return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const newUser:User = {
      id:'',
      name,
      email: email.toLowerCase(),
      password: encryptedPassword,
      address,
      isAdmin: false,
      favorites: []
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  }
))

// Get all favorite foods for a user
router.get('/:userId/favorites', async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await UserModel.findById(userId).populate('favorites');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user.favorites);
  } catch (error) {
    console.error('Error fetching favorite foods:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add or remove a food from user's favorites
router.post('/:userId/favorites', async (req, res) => {
  const userId = req.params.userId;
  const { foodId, action } = req.body;

  try {
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const food = await FoodModel.findById(foodId);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    if (action === 'add') {
      if (!user.favorites.includes(foodId)) {
        user.favorites.push(foodId);

        await user.save();
        return res.json({ message: 'Added to favorites!', favorites: user.favorites });
      } else {
        return res.json({ message: 'Food already in favorites' });
      }
    } 
    
    if (action === 'remove') {
      const index = user.favorites.indexOf(foodId);
      if (index !== -1) {
        user.favorites.splice(index, 1);
    
        await user.save();
        return res.json({ message: 'Removed from favorites!', favorites: user.favorites });
      } else {
        return res.json({ message: 'Food not in favorites' });
      }
    }

    return res.status(400).json({ message: 'Invalid action' });
  } catch (error) {
    console.error('Error updating favorite:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

const generateTokenResponse = (user : User) => {
  const token = jwt.sign({
    id: user.id,
    email: user.email,
    isAdmin: user.isAdmin
  }, jwtSecret as jwt.Secret, { expiresIn: '30d' });

  return {
    id: user.id,
    email: user.email,
    name: user.name || '',
    address: user.address || '',
    isAdmin: user.isAdmin,
    token: token
  };
}

export default router;