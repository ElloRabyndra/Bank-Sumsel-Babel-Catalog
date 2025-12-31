"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { ImageLightbox } from "@/components/admin/produk/ImageLightbox";

interface ProductHeroProps {
  heroImage: string;
  productTitle: string;
  galleryImages: string[];
}

export function ProductHero({
  heroImage,
  productTitle,
  galleryImages,
}: ProductHeroProps) {
  const [heroOpen, setHeroOpen] = useState(false);

  return (
    <div className="space-y-4">
      <button
        onClick={() => setHeroOpen(true)}
        aria-label="Zoom gambar produk"
        className="group w-full"
      >
        <div className="aspect-video rounded-xl overflow-hidden border border-border">
          <img
            src={heroImage}
            alt={productTitle}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </button>

      <Dialog open={heroOpen} onOpenChange={setHeroOpen}>
        <VisuallyHidden>
          <DialogTitle>{productTitle}</DialogTitle>
        </VisuallyHidden>
        <DialogContent className="max-w-4xl p-0 overflow-hidden">
          <img src={heroImage} alt={productTitle} className="w-full h-auto" />
          <div className="p-4 bg-background/95">
            <p className="text-lg font-medium text-foreground">
              {productTitle}
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Gallery */}
      {galleryImages.length > 0 && <ImageLightbox images={galleryImages} />}
    </div>
  );
}
