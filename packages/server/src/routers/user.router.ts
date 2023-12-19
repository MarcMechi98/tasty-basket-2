import jwt from 'jsonwebtoken';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { sample_users } from '../data';
import { UserModel } from '../models/user.model';

const router = Router();
const jwtSecret = process.env.JWT_SECRET;

router.get('/seed', asyncHandler(async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send('Database already seeded');
    return;
  }

  await UserModel.create(sample_users);
  res.send('Database seeded');
}));

router.post('/login', asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await UserModel.findOne({ email, password });

    if (user) {
      res.send(generateTokenResponse(user));
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('Internal server error');
  }
}));

const generateTokenResponse = (user: any) => {
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
};


export default router;