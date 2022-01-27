import {model,Document, Schema} from "mongoose";
import bcrypt from 'bcryptjs';

interface IUser extends Document {
  name: string;
  username: string;
  email: string;
  password: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      maxlength: 20,
    },
    username: {
      type: String,
      required: true,
      maxlength: 20,
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'Please enter an email'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimun password length is 6 characters'],
    },
  },
  { timestamps: true }
);

UserSchema.pre<IUser>('save', async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
 


const User = model<IUser>("User", UserSchema);
export default  User;
