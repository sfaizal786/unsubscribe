import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import unsubscribeRoute from './routes/unsubscribe.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use('/', unsubscribeRoute);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('DB Connection Error:', err);
  });
