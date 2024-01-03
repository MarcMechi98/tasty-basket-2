import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import { OrderModel } from '../models/order.model';
import { OrderStatus } from '../constants/order-status';
import authMid from '../middleware/auth.mid';

const router = Router();
router.use(authMid);

router.post('/create', asyncHandler(async (req: any, res: any) => {
  const requestOrder = req.body;

  if (requestOrder.items.length === 0) {
    res.status(400).send({ message: 'Cart is empty' });
    return;
  }

  await OrderModel.deleteOne({
    user: req.user._id,
    status: OrderStatus.NEW,
  });

  const newOrder = new OrderModel({
    ...requestOrder,
    user: req.user.id,
  });

  await newOrder.save();
  res.status(201).send(newOrder);
}));

export default router;