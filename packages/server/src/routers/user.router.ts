import jwt from 'jsonwebtoken';
import { Router } from 'express';

import { sample_users } from '../data';

const router = Router();

router.post('/login', (req, res) => {
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

export default router;