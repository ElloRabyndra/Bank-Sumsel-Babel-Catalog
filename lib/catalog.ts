import { Category, Product } from '@/types';
import { initialCategories, createInitialProducts } from '@/data/mockData';

// Data di-cache di memory (untuk development)
const categories: Category[] = initialCategories;
const products: Product[] = createInitialProducts(categories);

// ============================================
// CATEGORY FUNCTIONS
// ============================================

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((cat) => cat.slug === slug);
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((cat) => cat.id === id);
}

export function getAllCategories(): Category[] {
  return categories;
}

// ============================================
// PRODUCT FUNCTIONS
// ============================================

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.categoryId === categoryId && p.isPublished);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getPublishedProducts(): Product[] {
  return products.filter((p) => p.isPublished);
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.isPublished &&
      (p.title.toLowerCase().includes(q) || p.shortDescription.toLowerCase().includes(q))
  );
}

export function getProductCount(categoryId: string): number {
  return products.filter((p) => p.categoryId === categoryId && p.isPublished).length;
}
