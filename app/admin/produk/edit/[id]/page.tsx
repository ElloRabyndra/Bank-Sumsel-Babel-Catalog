import ProductForm from "@/components/admin/ProductForm";

interface PageProps {
  params: Promise<{ id: string }>; 
}

export default async function EditProductPage({ params }: PageProps) {
  const resolvedParams = await params;
  
  return <ProductForm productId={resolvedParams.id} />;
}