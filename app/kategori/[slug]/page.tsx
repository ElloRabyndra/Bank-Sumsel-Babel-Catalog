import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PageBreadcrumb } from "@/components/PageBreadcrumb";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/catalog";
import { truncate } from "@/lib/utils";

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
          {/* Breadcrumb */}
          <PageBreadcrumb items={[{ label: category.name }]} />

          {/* Category Header */}
          <div className="mt-8 mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              {category.name}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {category.description}
            </p>
          </div>

          {/* Products Grid */}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/produk/${product.slug}`}
                  className="group animate-slide-up"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <Card className="h-full overflow-hidden card-hover border-border/50 hover:border-primary/30">
                    <div className="aspect-16/10 relative overflow-hidden">
                      <img
                        src={product.thumbnailUrl}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {truncate(product.shortDescription, 100)}
                      </p>
                      <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                        Lihat Detail
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">
                Belum ada produk dalam kategori ini
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
