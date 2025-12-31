"use client";

import React from "react";

interface EmptyProductsProps {
  message?: string;
}

export const EmptyProducts: React.FC<EmptyProductsProps> = ({
  message = "Belum ada produk dalam kategori ini",
}) => {
  return (
    <div className="text-center py-16">
      <p className="text-muted-foreground">{message}</p>
    </div>
  );
};