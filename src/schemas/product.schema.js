import z from "zod";

export const productSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name must be required" })
      .min(2, "Name must at least 2 chaacter"),
    price: z
      .number({ required_error: "Price must be required" })
      .min(0, "Price must be grater than or equal to  0"),
    quantity: z.number().min(0, "Quantity shuldn't be less than 0"),
  }),
});
