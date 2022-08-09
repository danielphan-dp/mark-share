require('dotenv').config();
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import authRoutes from './routes/auth';
import taskRoutes from './routes/task';

const morgan = require('morgan');

// ----------
// | SERVER |
// ----------
// express app
const app = express();

// database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log('DB CONNECTION ESTABLISHED'))
  .catch((err) => console.log('DB CONNECTION ERROR: ', err));

// middlewares
app.use(express.json({ limit: '4mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

// route middlewares
app.use('/api', authRoutes);
app.use('/api', taskRoutes);

// start the server
app.listen(8000, () => console.log('Server running on port 8000'));
