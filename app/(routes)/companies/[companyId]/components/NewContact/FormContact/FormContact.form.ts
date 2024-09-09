import { z } from "zod";

export const formSchema = z.object({
  name: z.string().min(2).max(50),
  role: z.string(),
  email: z.string(),
  phone: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const defaultValues: FormSchema = {
  name: "",
  role: "",
  email: "",
  phone: "",
};