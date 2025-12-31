"use client";

import React from "react";

interface CategoryHeaderProps {
  name: string;
  description: string;
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  name,
  description,
}) => {
  return (
    <div className="mt-8 mb-10">
      <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
        {name}
      </h1>
      <p className="text-lg text-muted-foreground max-w-2xl">
        {description}
      </p>
    </div>
  );
};