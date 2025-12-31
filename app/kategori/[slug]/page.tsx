import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageBreadcrumb } from "@/components/kategori/PageBreadcrumb";
import { CategoryHeader } from "@/components/kategori/CategoryHeader";
import { ProductsGrid } from "@/components/kategori/ProductsGrid";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/catalog";

// Dynamic metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return { title: "Kategori tidak ditemukan" };
  }

  return {
    title: `${category.name} - Bank Sumsel Babel`,
    description: category.description,
  };
}

// Page component
export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />

      <main className="flex-1">
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <PageBreadcrumb items={[{ label: category.name }]} />
          
          <CategoryHeader
            name={category.name}
            description={category.description}
          />

          <ProductsGrid products={products} />
        </div>
      </main>

      <Footer />
    </div>
  );
}