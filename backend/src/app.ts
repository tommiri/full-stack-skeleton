import express from 'express';
import cors from 'cors';
import './process';
require('express-async-errors');

// Import routes
import examples from './routes/examples';
import users from './routes/users';
import errorParser from './middleware/errorParser';
import unknownEndpoint from './middleware/unknownEndpoint';

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

export default app;
