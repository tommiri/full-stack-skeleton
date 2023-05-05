/* eslint-disable import/first */
require('express-async-errors');

import express from 'express';
import cors from 'cors';
import './utils/process';

// Import routes
import examples from './routes/examples';
import users from './routes/users';

// Import middleware
import unknownEndpoint from './middleware/unknownEndpoint';
import errorParser from './middleware/errorParser';
import errorHandler from './middleware/errorHandler';

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/examples', examples);
app.use('/api/users', users);

app.get('/health', (_req, res) => {
  res.send('OK');
});

app.use(unknownEndpoint);
app.use(errorParser);
app.use(errorHandler);

export default app;
