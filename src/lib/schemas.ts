"use client";

import { z } from "zod";

export const RegistrationFromSchema = z.object({
  fullName: z.string().min(2).max(50),
  email: z.string().email({ message: "Must be a valid email" }),
  phoneNumber: z.string().min(8).max(11),
});
