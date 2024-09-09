import { z } from "zod";

export const formSchema = z.object({
  name: z.string(),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(6),
  cif: z.string().min(2),
  profileImage: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

export const formDefaultValues: FormSchema = {
  name: "",
  country: "",
  website: "",
  phone: "",
  cif: "",
  profileImage: "",
};