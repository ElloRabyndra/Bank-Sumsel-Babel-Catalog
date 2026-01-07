import { Category, Product } from "@/types";
import * as categoriesApi from "@/lib/api/categories";
import * as productsApi from "@/lib/api/products";

// ============================================
// CATEGORY FUNCTIONS (Server-side compatible)
// ============================================

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return await categoriesApi.fetchCategoryBySlug(slug);
}

export async function getCategoryById(id: string): Promise<Category | null> {
  return await categoriesApi.fetchCategoryById(id);
}

export async function getAllCategories(): Promise<Category[]> {
  return await categoriesApi.fetchCategories();
}

// ============================================
// PRODUCT FUNCTIONS (Server-side compatible)
// ============================================

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  return await productsApi.fetchProductsByCategory(categoryId);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return await productsApi.fetchProductBySlug(slug);
}

export async function getProductsByType(type: "produk" | "layanan"): Promise<Product[]> {
  return await productsApi.fetchProductsByType(type);
}

export async function getPublishedProducts(): Promise<Product[]> {
  return await productsApi.fetchPublishedProducts();
}

export async function searchProducts(query: string): Promise<Product[]> {
  return await productsApi.searchProducts(query);
}

export async function getProductCount(categoryId: string): Promise<number> {
  const products = await getProductsByCategory(categoryId);
  return products.length;
}