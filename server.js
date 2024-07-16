const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB Atlas
// Make sure your IP address is whitelisted and the username/password are correct
const mongoURI = 'mongodb+srv://AlexN:master10@cluster0.m6kdluv.mongodb.net/profiles?retryWrites=true&w=majority';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

// Check connection
db.once('open', () => console.log('Connected to MongoDB'));

// Handle connection errors
db.on('error', (error) => console.error('MongoDB connection error:', error));

// Create schema and model
const profileSchema = new mongoose.Schema({
  name: String,
  birthday: Date,
  height: Number
});

const Profile = mongoose.model('Profile', profileSchema);

// Routes
// Get all profiles
app.get('/profiles', async (req, res) => {
  try {
    const profiles = await Profile.find();
    res.json(profiles);
  } catch (error) {
    console.error('Error fetching profiles:', error);
    res.status(500).json({ error: 'Error fetching profiles' });
  }
});

// Create a profile
app.post('/profiles', async (req, res) => {
  const { name, birthday, height } = req.body;
  try {
    const newProfile = new Profile({ name, birthday, height });
    await newProfile.save();
    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error creating profile:', error);
    res.status(500).json({ error: 'Error creating profile' });
  }
});

// Delete a profile
app.delete('/profiles/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await Profile.findByIdAndDelete(id);
    res.json({ message: 'Profile deleted' });
  } catch (error) {
    console.error('Error deleting profile:', error);
    res.status(500).json({ error: 'Error deleting profile' });
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

