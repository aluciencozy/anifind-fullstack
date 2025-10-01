import CustomError from '../utils/CustomError.js';
import { JWT_SECRET } from '../config/env.js';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js'

const authMiddleware = async (req, res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return next(new CustomError('Unauthorized, no token provided', 401));
  }

  try {
    const token = header.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) return next(new CustomError('Unauthorized, user not found', 401));

    req.user = user;
    next();
  } catch (error) {
    return next(new CustomError('Unauthorized, token failed', 401));
  }

};

export default authMiddleware;
