import z from "zod";
import { Categories } from "../type/product";

export const addProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().min(0),
    category: z.enum(Object.values(Categories) as [string, ...string[]]),
    stock: z.number().int().min(0),
    imageUrl: z.string(),
});

export type addProductType = z.infer<typeof addProductSchema>;
