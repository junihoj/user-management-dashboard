import { IUser, UserModel } from "@/lib/db/models/user.model";
import { TCreateUserRequest } from "@/types/requests";
import bcrypt from "bcryptjs";
import { BadRequestError, NotFoundError } from "../utils/error";

export const createUser = async (createUserDto: TCreateUserRequest) => {
  const userExist = await UserModel.find({ email: createUserDto?.email });
  if (userExist) {
    throw new BadRequestError(`User already Exist`);
  }
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

export const getUsers = async ({
  page,
  limit,
  roleFilter,
  searchQuery,
  statusFilter,
}: {
  page: number;
  limit: number;
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
}) => {
  const skip = (page - 1) * limit;
  // Base query conditions
  const query: any = {};
  // // Non-admins can only see their own data
  // if (session.role !== "admin") {
  //   query._id = session.userId;
  // }

  // Apply text search if provided
  if (searchQuery) {
    query.$text = { $search: searchQuery };
  }

  // Apply role filter if provided
  if (roleFilter) {
    query.role = roleFilter;
  }

  // Apply status filter if provided
  if (statusFilter) {
    query.status = statusFilter;
  }
  const [users, total] = await Promise.all([
    await UserModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .select("-password"),
    UserModel.countDocuments(query),
  ]);

  return {
    data: users,
    pagination: {
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    },
  };
};

export const deleteUser = async (id: string) => {
  const deleted = await UserModel.findByIdAndDelete(id);
  if (!deleted) {
    throw new NotFoundError("User not found");
  }

};

export const updateUser = async (id: string, update: any) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  });
  if (!updatedUser) {
    throw new NotFoundError("User not found");
  }
  return updatedUser;
};

