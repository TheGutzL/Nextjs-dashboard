import { z } from "zod";

export const companyFormSchema = z.object({
  name: z.string(),
  country: z.string().min(2),
  website: z.string().min(2),
  phone: z.string().min(6),
  cif: z.string().min(6),
  profileImage: z.string(),
  description: z.string().nullable(),
});

export type CompanyFormSchema = z.infer<typeof companyFormSchema>;

export const defaultValues: CompanyFormSchema = {
  name: "",
  country: "",
  website: "",
  phone: "",
  cif: "",
  profileImage: "",
  description: "",
}