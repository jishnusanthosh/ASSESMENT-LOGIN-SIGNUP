// mern-login-backend/controllers/authController.js
const User = require('../Models/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  console.log((req.body));
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({username });

    console.log("user found", user); // Log the user object

    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Check if the password is correct
    if (bcrypt.compareSync(password, user.password)) {
      // Generate and return JWT token
      const token = jwt.sign({ userId: user._id }, '123qwerty', {
        expiresIn: '1h', // Token expires in 1 hour
      });
      return res.json({ token,username });
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Generate JWT
    const token = jwt.sign({ userId: newUser._id }, 'your-secret-key', { expiresIn: '1h' });

    res.status(201).json({ token, userId: newUser._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = { loginUser, signup };
