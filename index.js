const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();


app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON

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

app.listen(5000, () => {
  console.log('Proxy server running on port 5000');
});
