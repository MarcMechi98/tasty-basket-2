import jwt from 'jsonwebtoken';
import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';

import { sample_users } from '../data';
import { User, UserModel } from '../models/user.model';

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
// ... Your UserModel definition ...

// Your existing code with the password check
router.post("/login", asyncHandler(
  async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (user) {
      // Use bcrypt.compare to check the password
      bcrypt.compare(password, user.password, (err: any, isPasswordValid: any) => {
        if (isPasswordValid) {
          res.send(generateTokenResponse(user));
        } else {
          res.status(401).send('Invalid email or password');
        }
      });
    } else {
      res.status(401).send('Invalid email or password');
    }
  }
));


  
router.post('/register', asyncHandler(
  async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({email});
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
      isAdmin: false
    }

    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
  }
))

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