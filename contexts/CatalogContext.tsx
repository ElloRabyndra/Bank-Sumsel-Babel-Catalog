"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Category, Product, ProductType } from "@/types";
import * as categoriesApi from "@/lib/api/categories";
import * as productsApi from "@/lib/api/products";

interface CatalogContextType {
  categories: Category[];
  products: Product[];
  isLoading: boolean;
  error: string | null;
  
  // Category methods
  addCategory: (data: Omit<Category, "id" | "slug" | "createdAt" | "updatedAt">) => Promise<void>;
  updateCategory: (id: string, data: Partial<Category>) => Promise<void>;
  deleteCategory: (id: string) => Promise<void>;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getCategoryById: (id: string) => Category | undefined;
  
  // Product methods
  addProduct: (data: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">) => Promise<void>;
  updateProduct: (id: string, data: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  togglePublish: (id: string) => Promise<void>;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  getProductsByType: (type: ProductType) => Product[];
  searchProducts: (query: string) => Product[];
  getPublishedProducts: () => Product[];
  getProductCount: (categoryId: string) => number;
  
  // Refresh methods
  refreshCategories: () => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch initial data
  const refreshCategories = useCallback(async () => {
    try {
      const data = await categoriesApi.fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError("Failed to load categories");
    }
  }, []);

  const refreshProducts = useCallback(async () => {
    try {
      const data = await productsApi.fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products");
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        await Promise.all([refreshCategories(), refreshProducts()]);
      } catch (err) {
        console.error("Error loading data:", err);
        setError("Failed to load data");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [refreshCategories, refreshProducts]);

  // Category methods
  const addCategory = async (
    data: Omit<Category, "id" | "slug" | "createdAt" | "updatedAt">
  ) => {
    const newCategory = await categoriesApi.createCategory(data);
    setCategories((prev) => [...prev, newCategory]);
  };

  const updateCategory = async (id: string, data: Partial<Category>) => {
    const updated = await categoriesApi.updateCategory(id, data);
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? updated : cat))
    );
  };

  const deleteCategory = async (id: string) => {
    await categoriesApi.deleteCategory(id);
    setCategories((prev) => prev.filter((cat) => cat.id !== id));
    setProducts((prev) => prev.filter((prod) => prod.categoryId !== id));
  };

  const getCategoryBySlug = (slug: string) =>
    categories.find((cat) => cat.slug === slug);

  const getCategoryById = (id: string) =>
    categories.find((cat) => cat.id === id);

  // Product methods
  const addProduct = async (
    data: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">
  ) => {
    const newProduct = await productsApi.createProduct(data);
    setProducts((prev) => [...prev, newProduct]);
  };

  const updateProduct = async (id: string, data: Partial<Product>) => {
    const updated = await productsApi.updateProduct(id, data);
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? updated : prod))
    );
  };

  const deleteProduct = async (id: string) => {
    await productsApi.deleteProduct(id);
    setProducts((prev) => prev.filter((prod) => prod.id !== id));
  };

  const togglePublish = async (id: string) => {
    const updated = await productsApi.toggleProductPublish(id);
    setProducts((prev) =>
      prev.map((prod) => (prod.id === id ? updated : prod))
    );
  };

  const getProductBySlug = (slug: string) =>
    products.find((prod) => prod.slug === slug);

  const getProductById = (id: string) =>
    products.find((prod) => prod.id === id);

  const getProductsByCategory = (categoryId: string) =>
    products.filter(
      (prod) => prod.categoryId === categoryId && prod.isPublished
    );

  const getProductsByType = (type: ProductType) =>
    products.filter((prod) => prod.type === type && prod.isPublished);

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return products.filter(
      (prod) =>
        prod.isPublished &&
        (prod.title.toLowerCase().includes(lowerQuery) ||
          prod.shortDescription.toLowerCase().includes(lowerQuery))
    );
  };

  const getPublishedProducts = () =>
    products.filter((prod) => prod.isPublished);

  const getProductCount = (categoryId: string) =>
    products.filter(
      (prod) => prod.categoryId === categoryId && prod.isPublished
    ).length;

  return (
    <CatalogContext.Provider
      value={{
        categories,
        products,
        isLoading,
        error,
        addCategory,
        updateCategory,
        deleteCategory,
        getCategoryBySlug,
        getCategoryById,
        addProduct,
        updateProduct,
        deleteProduct,
        togglePublish,
        getProductBySlug,
        getProductById,
        getProductsByCategory,
        getProductsByType,
        searchProducts,
        getPublishedProducts,
        getProductCount,
        refreshCategories,
        refreshProducts,
      }}
    >
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalog = () => {
  const context = useContext(CatalogContext);
  if (!context) {
    throw new Error("useCatalog must be used within a CatalogProvider");
  }
  return context;
};