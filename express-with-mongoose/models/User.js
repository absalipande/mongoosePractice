import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  password: String,
  email: {
    type: String,
    // required: true,
    lowercase: true,
  }
});

// ES Modules
export default model('User', userSchema);
