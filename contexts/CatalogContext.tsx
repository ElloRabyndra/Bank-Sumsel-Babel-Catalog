"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
} from "react";
import { Category, Product } from "@/types";
import { initialCategories, createInitialProducts } from "@/data/mockData";
import { generateId, generateSlug } from "@/lib/utils";

interface CatalogState {
  categories: Category[];
  products: Product[];
}

type CatalogAction =
  | { type: "SET_DATA"; payload: CatalogState }
  | {
      type: "ADD_CATEGORY";
      payload: Omit<Category, "id" | "slug" | "createdAt" | "updatedAt">;
    }
  | {
      type: "UPDATE_CATEGORY";
      payload: { id: string; data: Partial<Category> };
    }
  | { type: "DELETE_CATEGORY"; payload: string }
  | {
      type: "ADD_PRODUCT";
      payload: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">;
    }
  | { type: "UPDATE_PRODUCT"; payload: { id: string; data: Partial<Product> } }
  | { type: "DELETE_PRODUCT"; payload: string }
  | { type: "TOGGLE_PUBLISH"; payload: string };

interface CatalogContextType extends CatalogState {
  addCategory: (
    data: Omit<Category, "id" | "slug" | "createdAt" | "updatedAt">
  ) => void;
  updateCategory: (id: string, data: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  getCategoryBySlug: (slug: string) => Category | undefined;
  getCategoryById: (id: string) => Category | undefined;
  addProduct: (
    data: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">
  ) => void;
  updateProduct: (id: string, data: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  togglePublish: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  getProductsByCategory: (categoryId: string) => Product[];
  searchProducts: (query: string) => Product[];
  getPublishedProducts: () => Product[];
  getProductCount: (categoryId: string) => number;
}

const STORAGE_KEY = "bsb_catalog_data";

const catalogReducer = (
  state: CatalogState,
  action: CatalogAction
): CatalogState => {
  switch (action.type) {
    case "SET_DATA":
      return action.payload;

    case "ADD_CATEGORY": {
      const newCategory: Category = {
        ...action.payload,
        id: generateId(),
        slug: generateSlug(action.payload.name),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, categories: [...state.categories, newCategory] };
    }

    case "UPDATE_CATEGORY": {
      return {
        ...state,
        categories: state.categories.map((cat) =>
          cat.id === action.payload.id
            ? {
                ...cat,
                ...action.payload.data,
                slug: action.payload.data.name
                  ? generateSlug(action.payload.data.name)
                  : cat.slug,
                updatedAt: new Date().toISOString(),
              }
            : cat
        ),
      };
    }

    case "DELETE_CATEGORY":
      return {
        ...state,
        categories: state.categories.filter((cat) => cat.id !== action.payload),
        products: state.products.filter(
          (prod) => prod.categoryId !== action.payload
        ),
      };

    case "ADD_PRODUCT": {
      const newProduct: Product = {
        ...action.payload,
        id: generateId(),
        slug: generateSlug(action.payload.title),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      return { ...state, products: [...state.products, newProduct] };
    }

    case "UPDATE_PRODUCT": {
      return {
        ...state,
        products: state.products.map((prod) =>
          prod.id === action.payload.id
            ? {
                ...prod,
                ...action.payload.data,
                slug: action.payload.data.title
                  ? generateSlug(action.payload.data.title)
                  : prod.slug,
                updatedAt: new Date().toISOString(),
              }
            : prod
        ),
      };
    }

    case "DELETE_PRODUCT":
      return {
        ...state,
        products: state.products.filter((prod) => prod.id !== action.payload),
      };

    case "TOGGLE_PUBLISH":
      return {
        ...state,
        products: state.products.map((prod) =>
          prod.id === action.payload
            ? {
                ...prod,
                isPublished: !prod.isPublished,
                updatedAt: new Date().toISOString(),
              }
            : prod
        ),
      };

    default:
      return state;
  }
};

const CatalogContext = createContext<CatalogContextType | undefined>(undefined);

export const CatalogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(catalogReducer, {
    categories: [],
    products: [],
  });

  // Load data from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        dispatch({ type: "SET_DATA", payload: parsed });
      } catch {
        // If parsing fails, use initial data
        const cats = initialCategories;
        const prods = createInitialProducts(cats);
        dispatch({
          type: "SET_DATA",
          payload: { categories: cats, products: prods },
        });
      }
    } else {
      // First time: use initial mock data
      const cats = initialCategories;
      const prods = createInitialProducts(cats);
      dispatch({
        type: "SET_DATA",
        payload: { categories: cats, products: prods },
      });
    }
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (state.categories.length > 0 || state.products.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  }, [state]);

  const addCategory = (
    data: Omit<Category, "id" | "slug" | "createdAt" | "updatedAt">
  ) => {
    dispatch({ type: "ADD_CATEGORY", payload: data });
  };

  const updateCategory = (id: string, data: Partial<Category>) => {
    dispatch({ type: "UPDATE_CATEGORY", payload: { id, data } });
  };

  const deleteCategory = (id: string) => {
    dispatch({ type: "DELETE_CATEGORY", payload: id });
  };

  const getCategoryBySlug = (slug: string) => {
    return state.categories.find((cat) => cat.slug === slug);
  };

  const getCategoryById = (id: string) => {
    return state.categories.find((cat) => cat.id === id);
  };

  const addProduct = (
    data: Omit<Product, "id" | "slug" | "createdAt" | "updatedAt">
  ) => {
    dispatch({ type: "ADD_PRODUCT", payload: data });
  };

  const updateProduct = (id: string, data: Partial<Product>) => {
    dispatch({ type: "UPDATE_PRODUCT", payload: { id, data } });
  };

  const deleteProduct = (id: string) => {
    dispatch({ type: "DELETE_PRODUCT", payload: id });
  };

  const togglePublish = (id: string) => {
    dispatch({ type: "TOGGLE_PUBLISH", payload: id });
  };

  const getProductBySlug = (slug: string) => {
    return state.products.find((prod) => prod.slug === slug);
  };

  const getProductById = (id: string) => {
    return state.products.find((prod) => prod.id === id);
  };

  const getProductsByCategory = (categoryId: string) => {
    return state.products.filter(
      (prod) => prod.categoryId === categoryId && prod.isPublished
    );
  };

  const searchProducts = (query: string) => {
    const lowerQuery = query.toLowerCase();
    return state.products.filter(
      (prod) =>
        prod.isPublished &&
        (prod.title.toLowerCase().includes(lowerQuery) ||
          prod.shortDescription.toLowerCase().includes(lowerQuery))
    );
  };

  const getPublishedProducts = () => {
    return state.products.filter((prod) => prod.isPublished);
  };

  const getProductCount = (categoryId: string) => {
    return state.products.filter(
      (prod) => prod.categoryId === categoryId && prod.isPublished
    ).length;
  };

  return (
    <CatalogContext.Provider
      value={{
        ...state,
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
        searchProducts,
        getPublishedProducts,
        getProductCount,
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
