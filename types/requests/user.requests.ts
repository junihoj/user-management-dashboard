import { createUserSchema } from "@/lib/validation/user.validation";
import { z } from "zod";

export type TCreateUserRequest = z.infer<typeof createUserSchema>;
