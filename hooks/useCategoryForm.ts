import { useState } from "react";
import { LucideIconName } from "@/types";

interface CategoryFormData {
  name: string;
  description: string;
  icon: LucideIconName;
  thumbnailUrl: string;
}

const initialFormData: CategoryFormData = {
  name: "",
  description: "",
  icon: "Wallet" as LucideIconName,
  thumbnailUrl: "",
};

export const useCategoryForm = () => {
  const [formData, setFormData] = useState<CategoryFormData>(initialFormData);

  const updateField = <K extends keyof CategoryFormData>(
    field: K,
    value: CategoryFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setFormData(initialFormData);
  };

  const loadCategory = (data: CategoryFormData) => {
    setFormData(data);
  };

  return {
    formData,
    updateField,
    resetForm,
    loadCategory,
  };
};
