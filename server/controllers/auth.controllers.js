import User from '../models/user.model.js'
import jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import CustomError from '../utils/CustomError.js'

const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new CustomError('Please provide all required fields', 400));
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return next(new CustomError('User already exists', 409));
    }

    const newUser = await User.create({ name, email, password });

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    const userForRes = newUser.toObject();
    delete userForRes.password;

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { user: userForRes, token }
    });
};

const signIn = (req, res) => {
  res.send('User signed in successfully');
};

const signOut = (req, res) => {
  res.send('User signed out successfully');
};

export { signUp, signIn, signOut };