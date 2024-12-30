const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const Address = require('./models/address');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/locationFlow', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// API Endpoints
app.post('/api/addresses', async (req, res) => {
  try {
    const address = new Address(req.body);
    await address.save();
    res.status(201).send(address);
  } catch (err) {
    res.status(500).send({ error: 'Failed to save address' });
  }
});

app.get('/api/addresses', async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).send(addresses);
  } catch (err) {
    res.status(500).send({ error: 'Failed to fetch addresses' });
  }
});

app.delete('/api/addresses/:id', async (req, res) => {
  try {
    await Address.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Address deleted' });
  } catch (err) {
    res.status(500).send({ error: 'Failed to delete address' });
  }
});

app.listen(5000, () => console.log('Server running on port 5000'));