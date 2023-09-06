import mongoose from 'mongoose';

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  },
  checks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Check',
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the User model using the user schema
const User = mongoose.model('User', userSchema);

export default User;