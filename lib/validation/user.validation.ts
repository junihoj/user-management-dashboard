import { UserRoleEnum, UserStatusEnum } from "@/constants/enums";
import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "Name is Required"),
  email: z.string().email("Invalid Email Provided"),
  role: z.nativeEnum(UserRoleEnum).optional(),
  status: z.nativeEnum(UserStatusEnum).optional(),
  profilePhoto: z.string().startsWith("data:image/").nullable().optional(),
  password: z.string(),
});
