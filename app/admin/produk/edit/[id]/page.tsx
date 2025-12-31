import ProductForm from "@/components/admin/ProductForm";

interface PageProps {
  params: { id: string };
}

export default function EditProductPage({ params }: PageProps) {
  return <ProductForm productId={params.id} />;
}
