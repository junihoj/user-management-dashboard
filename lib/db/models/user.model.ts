import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { UserRoleEnum, UserStatusEnum } from "@/constants/enums";
// interface for the User
export type IUser = {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user";
  status: "active" | "inactive";
  profilePhoto?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type IUserMethods = {
  comparePassword: (password: string) => Promise<boolean>;
};

//define interface for the user document
export type IUserDocument = IUser & Document & IUserMethods;

//  Schema definition
const UserSchema: Schema<IUserDocument> = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: false,
      // select: false,
    },
    role: {
      type: String,
      enum: Object.values(UserRoleEnum),
      default: UserRoleEnum.User,
    },
    status: {
      type: String,
      enum: Object.values(UserStatusEnum),
      default: UserStatusEnum.Active,
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
  }
  // {
  //   toJSON: {
  //     virtuals: true,
  //     transform: (doc, ret) => {
  //       // ret.id = ret._id.toString();
  //       // delete ret._id;
  //       delete ret.__v;
  //       delete ret.password;
  //       return ret;
  //     },
  //   },
  // }
);

// Create text index for search
UserSchema.index({
  name: "text",
  email: "text",
  role: "text",
  status: "text",
});

// 3. Add pre-save hook
UserSchema.pre<IUserDocument>("save", function (next) {
  this.updatedAt = new Date();
  next();
});

UserSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(enteredPassword, this.password);
};

// Define the model type
interface IUserModel extends Model<IUserDocument> {}

// Export the model
// const User: IUserModel =
//   (mongoose.models.User as IUserModel) ||
//   mongoose.model<IUser, IUserModel>("User", UserSchema);

// export default User;

export const UserModel: IUserModel =
  mongoose.models.User || mongoose.model("User", UserSchema);
