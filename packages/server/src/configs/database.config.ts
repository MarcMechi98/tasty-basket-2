import { connect } from 'mongoose';

export const dbConnect = async () => {
  connect(process.env.MONGO_URI as string).then(
    () => console.log('Connected to MongoDB'),
    (error) => console.log('MongoDB connection error: ', error)
  ); 
}