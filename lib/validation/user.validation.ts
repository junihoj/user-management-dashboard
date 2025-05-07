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

// Extended schema with firstName/lastName that auto-generates name
export const createUserFormSchema = z
  .object({
    firstName: z.string().min(1, "First Name is required"),
    lastName: z.string().min(1, "Last Name is required"),
  })
  .merge(
    createUserSchema.pick({
      // Explicitly pick which fields to merge
      email: true,
      role: true,
      status: true,
      profilePhoto: true,
      password: true,
    })
  )
  .extend({
    // Make name optional here while keeping all other createUserSchema fields
    name: z.string().optional(),
  })
  .transform((data) => {
    // Auto-generate name if firstName/lastName exist and name wasn't provided
    // Auto-generate name when firstName and lastName exist
    if (data.firstName && data.lastName) {
      return {
        ...data,
        name: `${data.firstName} ${data.lastName}`.trim(),
      };
    }
    return data;
  });
