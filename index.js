const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const quotes = require('./quotes.js')
// import quotes from './quotes.js'


// Load environment variables from .env file
dotenv.config();

app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON

const getRandomInspiration = () => {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return (quotes[randomIndex]);
};

const PORT = process.env.PORT || 5000;
// Proxy endpoint
app.post('/api/login', async (req, res) => {
  try {
    console.log(req.body)
    const response = await axios.post(`${process.env.API_BASE_URL}`, req.body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(500).send('Error forwarding request to API');
  }
});

app.post('/guest-token', async (req, res) => {
  try {
    const { userId } = req.body;

    // Generate the token using the server client
    const token = serverClient.createToken(userId);

    res.json({ token, userId });
  } catch (error) {
    console.error('Token generation error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/generate', async (req, res) => {
  try {
    const data = getRandomInspiration()
    res.json({ data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
})

app.listen(5000, () => {
  console.log('Proxy server running on port 5000');
});
