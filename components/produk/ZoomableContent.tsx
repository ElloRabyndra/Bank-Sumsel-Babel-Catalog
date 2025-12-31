import React, { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { Phone, Building, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";
import { PageBreadcrumb } from "@/components/kategori/PageBreadcrumb";
import { YouTubeEmbed } from "@/components/produk/YouTubeEmbed";
import { ImageLightbox } from "@/components/admin/produk/ImageLightbox";
import { useCatalog } from "@/contexts/CatalogContext";
import { truncate } from "@/lib/utils";
export const ZoomableContent: React.FC<{
  html: string;
  className?: string;
}> = ({ html, className }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<Array<{ src: string; caption: string }>>(
    []
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageItems, setImageItems] = useState<
    Array<{ src: string; caption: string }>
  >([]);
  const [isClient, setIsClient] = useState(false);

  // Pastikan hanya render di client
  useEffect(() => {
    setIsClient(true);

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const imgEls = Array.from(doc.querySelectorAll("img"));

    const parsedItems = imgEls
      .map((img) => ({
        src: img.getAttribute("src") || "",
        caption: img.getAttribute("alt") || img.getAttribute("title") || "",
      }))
      .filter((i) => i.src);

    setImageItems(parsedItems);
  }, [html]);

  // Jangan render apapun sampai client-side hydration selesai
  if (!isClient) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: html }}
        suppressHydrationWarning
      />
    );
  }

  const hasStepImages = imageItems.length > 0;

  const openLightbox = (index: number) => {
    setItems(imageItems);
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  const current = items[currentIndex];

  // If content has step images, render as step cards
  if (hasStepImages) {
    // Remove images from original HTML for text-only content
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    doc.querySelectorAll("img").forEach((img) => img.remove());
    const textContent = doc.body.innerHTML.trim();

    return (
      <>
        {/* Text content without images */}
        {textContent && (
          <div
            className={className}
            dangerouslySetInnerHTML={{ __html: textContent }}
          />
        )}

        {/* Step-by-step cards */}
        <div className="grid gap-4 mt-6">
          {imageItems.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 p-4 border border-border rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors"
            >
              {/* Step number */}
              <div className="shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                {idx + 1}
              </div>

              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => openLightbox(idx)}
                className="shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden border border-border cursor-zoom-in group"
              >
                <img
                  src={item.src}
                  alt={item.caption || `Langkah ${idx + 1}`}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                />
              </button>

              {/* Caption */}
              <div className="flex-1 flex items-center">
                <p className="text-sm md:text-base text-foreground">
                  {item.caption || `Langkah ${idx + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <VisuallyHidden>
            <DialogTitle>Gambar Langkah</DialogTitle>
          </VisuallyHidden>
          <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-background/95 backdrop-blur-sm border-0">
            <div className="relative flex flex-col items-center justify-center min-h-[80vh] p-4">
              {items.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToPrevious}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 hover:bg-background"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={goToNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-50 bg-background/80 hover:bg-background"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </Button>
                </>
              )}

              {current?.src && (
                <img
                  src={current.src}
                  alt={current.caption}
                  className="max-w-full max-h-[70vh] object-contain rounded-lg"
                />
              )}

              {current?.caption && (
                <div className="mt-4 max-w-3xl text-center">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium mb-2">
                    Langkah {currentIndex + 1}
                  </span>
                  <p className="text-foreground">{current.caption}</p>
                </div>
              )}

              {items.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-4 py-2 rounded-full text-sm font-medium">
                  {currentIndex + 1} / {items.length}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  // No step images, render as regular content
  return (
    <div className={className} dangerouslySetInnerHTML={{ __html: html }} />
  );
};
