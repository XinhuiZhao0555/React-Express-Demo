import mongoose from 'mongoose'

const { Schema, model } = mongoose;

const accountSchema = new Schema({
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  creatDate: {type: Date, default: Date.now()}
});

const Account = model('Account', accountSchema);

export default Account;