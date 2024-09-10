import { z } from "zod";

export const formEventSchema = z.object({
  eventName: z.string().min(2),
  companieSelected: z.object({
    name: z.string().min(2),
    id: z.string(),
  }),
});

export type FormEventSchema = z.infer<typeof formEventSchema>;

export const defaultValues = {
  eventName: "",
  companieSelected: { name: "", id: "" },
};