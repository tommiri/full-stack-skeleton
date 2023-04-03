import express from 'express';
import cors from 'cors';

// Import routes
import examples from './routes/examples.js';
import users from './routes/users.js';

const app = express();
app.use(cors());
app.use(express.json());

// Use routes
app.use('/api/examples', examples);
app.use('/api/users', users);

app.get('/health', (req, res) => {
  res.send('OK');
});

export default app;
