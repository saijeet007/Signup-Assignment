// server.js (Express Backend)
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Serve static files from 'uploads' directory
app.use('/uploads', express.static('uploads'));
const mongoUri = process.env.MONGO_URI; 
console.log(mongoUri)
mongoose.connect(mongoUri);

const userSchema = new mongoose.Schema({
  name: String,
  number: String,
  dob: Date,
  email: { type: String, unique: true },
  password: String,
  profilePicture: String
});

const User = mongoose.model('User', userSchema);

app.post('/signup', async (req, res) => {
  try {
    const { name, number, dob, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, number, dob, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.put('/users/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const { id } = req.params;
    const { name, number, dob, email, password } = req.body;
    const updateData = { name, number, dob, email };

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    if (req.file) {
      updateData.profilePicture = `/uploads/${req.file.filename}`;
    }

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid email or password' });

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
});


app.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});


app.listen(5000, () => console.log('Server running on port 5000'));
