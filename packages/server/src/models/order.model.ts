import { OrderStatus } from './../constants/order-status';
import { model, Schema, Types } from 'mongoose';
import { Food, FoodSchema } from './food.model';

export interface LatLng {
  lat: number;
  lng: number;
}

export const LatLngSchema = new Schema<LatLng>({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
});

export interface OrderItem {
  food: Food;
  price: number;
  quantity: number;
}

export const OrderItemSchema = new Schema<OrderItem>({  
  food: { type: FoodSchema, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export interface Order {
  id: string;
  items: OrderItem[];
  totalPrice: number;
  name: string;
  address: string;
  addressLatLng: LatLng;
  paymentId: string;
  status: OrderStatus;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<Order>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  addressLatLng: { type: LatLngSchema, required: true },
  paymentId: { type: String },
  totalPrice: { type: Number, required: true },
  items: { type: [OrderItemSchema], required: true },
  status: { type: String, default: OrderStatus.NEW },
  user: { type: Schema.Types.ObjectId, required: true },
}, { 
  timestamps: true, 
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

export const OrderModel = model('Order', OrderSchema);
