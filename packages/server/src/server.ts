import express from 'express';
import cors from 'cors';
require('dotenv').config();

import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';
dbConnect();

const PORT = 5000;
const app = express();

app.use(express.json());

app.use(cors({
  credentials: true,
  origin: [
    'http://localhost:4200',
  ]
}));

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.listen(PORT, () => {
  console.log('Website server running on http://localhost:' + PORT + '!');
});
