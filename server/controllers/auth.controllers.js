import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JWT_SECRET, JWT_EXPIRES_IN } from '../config/env.js';
import CustomError from '../utils/CustomError.js';

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

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: { user: newUser, token },
  });
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomError('Please provide all required fields', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(new CustomError('Invalid credentials', 404));
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    return next(new CustomError('Invalid credentials', 401));
  }

  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

  const userForRes = { ...user._doc };
  delete userForRes.password;

  res.status(200).json({
    success: true,
    message: 'User signed in successfully',
    data: { user, token },
  });
};

const signOut = (req, res) => {
  res.status(200).json({ success: true, message: 'User signed out successfully' });
};

export { signUp, signIn, signOut };
