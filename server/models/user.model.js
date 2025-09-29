import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name is required'],
    minlength: 3,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please fill a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    minlength: 6,
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
})

const User = mongoose.model('User', userSchema);

export default User;