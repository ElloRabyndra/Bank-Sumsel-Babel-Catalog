import SearchPageClient from "@/components/search/SearchPageClient";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  
  return <SearchPageClient initialQuery={q} />;
}
