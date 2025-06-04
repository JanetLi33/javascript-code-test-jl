import { z } from "zod";

export const nonEmptyStringValidator = z.string().trim().min(1, { message: "This field is required" });

export const yearValidator = z.string().regex(/^\d{4}$/, { message: "Invalid year format. Use YYYY (e.g. 2015)"});

export const limitNumberValidator = z.number().int().positive({ message: "Limit must be a positive integer"});