// components/produk/ProductVideoSection.tsx
import { YouTubeEmbed } from "./YouTubeEmbed";

interface ProductVideoSectionProps {
  videoUrl: string;
}

export function ProductVideoSection({ videoUrl }: ProductVideoSectionProps) {
  if (!videoUrl) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-semibold text-foreground mb-4">
        Video Produk
      </h2>
      <YouTubeEmbed url={videoUrl} />
    </section>
  );
}