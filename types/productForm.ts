import { Product } from "@/types";

export type ProductFormData = Omit<
  Product,
  "id" | "slug" | "createdAt" | "updatedAt"
>;

export type UpdateFieldFunction = <K extends keyof ProductFormData>(
  key: K,
  value: ProductFormData[K]
) => void;
