import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
// interface for the User
export interface IUser {
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserMethods {
  comparePassword: (password: string) => Promise<boolean>;
}

//define interface for the user document
export interface IUserDocument extends IUser, Document, IUserMethods {}

//  Schema definition
const UserSchema: Schema<IUserDocument> = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },
  profilePhoto: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 3. Add pre-save hook
UserSchema.pre<IUserDocument>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// Define the model type
interface IUserModel extends Model<IUserDocument> {}

// Export the model
// const User: IUserModel =
//   (mongoose.models.User as IUserModel) ||
//   mongoose.model<IUser, IUserModel>("User", UserSchema);

// export default User;

export const UserModel: IUserModel = mongoose.model("User", UserSchema);
