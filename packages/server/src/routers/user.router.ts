import jwt from 'jsonwebtoken';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { sample_users } from '../data';
import { UserModel } from '../models/user.model';

const router = Router();

router.get('/seed', asyncHandler(async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  if (usersCount > 0) {
    res.send('Database already seeded');
    return;
  }

  await UserModel.create(sample_users);
  res.send('Database seeded');
}));

router.post('/login', asyncHandler (async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (user) {
    res.send(generateTokenResponse(user));
  } else {
    res.status(401).send('Invalid email or password');
  }
}));

const generateTokenResponse = (user: any) => {
  const token = jwt.sign({
    email: user.email,
    isAdmin: user.isAdmin
  }, 'SecretPassword', { expiresIn: '30d' });

  user.token = token;
  return user;
};

export default router;