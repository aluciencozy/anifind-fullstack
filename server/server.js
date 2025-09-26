import express from 'express';
import dotenv from 'dotenv';

// This line loads the environment variables from your .env file
dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

// This is a simple test route to confirm the server is running
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});