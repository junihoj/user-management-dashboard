import mongoose, { Schema, Document, Model } from "mongoose";

// 1. Define the interface for the User document
export interface IUser {
  name: string;
  email: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserDocument extends IUser, Document {}

// 2. Define the schema
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

// 4. Define the model type
interface IUserModel extends Model<IUserDocument> {}

// // 5. Export the model
// const User: IUserModel =
//   (mongoose.models.User as IUserModel) ||
//   mongoose.model<IUser, IUserModel>("User", UserSchema);

// export default User;

export const UserModel: IUserModel = mongoose.model("User", UserSchema);
