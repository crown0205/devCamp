import { z } from "zod";

export const formValues = z.object({
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  roles: z.string(),
});
