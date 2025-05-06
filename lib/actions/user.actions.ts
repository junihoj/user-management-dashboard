import { IUser, UserModel } from "@/models/user.model";
import { TCreateUserRequest } from "@/types/requests";
import bcrypt from "bcryptjs";
import { BadRequestError } from "../utils/error";
export const createUser = async (createUserDto: TCreateUserRequest) => {
  if (createUserDto?.password) {
    const isStrongPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        createUserDto.password
      );
    if (!isStrongPassword) {
      throw new BadRequestError(
        "Password must contain a number, a special character, a lowercase and a capital letter"
      );
    }
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    createUserDto.password = hashedPassword;
  }
  const newUser = new UserModel(createUserDto);
  await newUser.save();
  return newUser as Omit<IUser, "password">;
};
