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
    user: req.user.id,
    status: OrderStatus.NEW,
  });

  const newOrder = new OrderModel({
    ...requestOrder,
    user: req.user.id,
  });

  await newOrder.save();
  res.status(201).send(newOrder);
}));

router.get('/newOrderForCurrentUser', asyncHandler(async (req: any, res: any) => {
  const order = await getNewOrderForCurrentUser(req)

  if (order) {
    res.send(order);
  } else {
    res.status(404).send({ message: 'Order not found 1' });
  }
}));

router.post('/pay', asyncHandler(async (req: any, res: any) => {
  const { paymentId } = req.body; 
  const order = await getNewOrderForCurrentUser(req);

  if (!order) {
    res.status(404).send({ message: 'Order not found 2' });
    return;
  }

  order.paymentId = paymentId;
  order.status = OrderStatus.PAID;
  await order.save();

  res.send(order._id);
}));

router.get('/track/:id', asyncHandler(async (req: any, res: any) => {
  try {
    const order = await OrderModel.findById(req.params.id);

    if (!order) {
      return res.status(404).send({ message: 'Order not found' });
    }

    res.send(order);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}));

router.get('/user/:userId', asyncHandler(async (req: any, res: any) => {
  try {
    const userId = req.params.userId || req.user.id;
    const orders = await OrderModel.find({ user: userId });

    res.send(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal server error' });
  }
}));


async function getNewOrderForCurrentUser(req: any) {
  return await OrderModel.findOne({
    user: req.user.id, 
    status: OrderStatus.NEW
  });
} 

export default router;