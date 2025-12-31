"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ZoomableContent } from "@/components/ZoomableContent";
import type { Product } from "@/types";

interface ProductTabsProps {
  product: Product;
}

export function ProductTabs({ product }: ProductTabsProps) {
  return (
    <Tabs defaultValue="overview" className="mt-12">
      <TabsList className="flex flex-wrap h-auto gap-1 bg-muted/50 p-1 rounded-lg">
        <TabsTrigger value="overview" className="flex-1 min-w-30">
          Overview
        </TabsTrigger>
        <TabsTrigger value="features" className="flex-1 min-w-30">
          Fitur & Manfaat
        </TabsTrigger>
        <TabsTrigger value="risks" className="flex-1 min-w-30">
          Risiko
        </TabsTrigger>
        <TabsTrigger value="requirements" className="flex-1 min-w-30">
          Persyaratan
        </TabsTrigger>
        <TabsTrigger value="costs" className="flex-1 min-w-30">
          Biaya
        </TabsTrigger>
        <TabsTrigger value="additional" className="flex-1 min-w-30">
          Info Tambahan
        </TabsTrigger>
      </TabsList>

      <div className="mt-6 bg-card rounded-xl border border-border p-6">
        <TabsContent value="overview" className="m-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Kenali Produk
            </h3>
            <ZoomableContent
              html={product.kenaliProduk || ""}
              className="prose-content text-muted-foreground"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-1">
              Nama Penerbit
            </h3>
            <p className="text-muted-foreground">{product.namaPenerbit}</p>
          </div>
        </TabsContent>

        <TabsContent value="features" className="m-0">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Fitur Utama
            </h3>
            <ZoomableContent
              html={product.fiturUtama || ""}
              className="prose-content text-muted-foreground"
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">
              Manfaat
            </h3>
            <ZoomableContent
              html={product.manfaat || ""}
              className="prose-content text-muted-foreground"
            />
          </div>
        </TabsContent>

        <TabsContent value="risks" className="mt-0">
          <h3 className="text-lg font-semibold text-foreground mb-3">Risiko</h3>
          <ZoomableContent
            html={product.risiko || ""}
            className="prose-content text-muted-foreground"
          />
        </TabsContent>

        <TabsContent value="requirements" className="mt-0">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Persyaratan
          </h3>
          <ZoomableContent
            html={product.persyaratan || ""}
            className="prose-content text-muted-foreground"
          />
        </TabsContent>

        <TabsContent value="costs" className="mt-0">
          <h3 className="text-lg font-semibold text-foreground mb-3">Biaya</h3>
          <ZoomableContent
            html={product.biaya || ""}
            className="prose-content text-muted-foreground"
          />
        </TabsContent>

        <TabsContent value="additional" className="mt-0">
          <h3 className="text-lg font-semibold text-foreground mb-3">
            Informasi Tambahan
          </h3>
          {product.informasiTambahan ? (
            <ZoomableContent
              html={product.informasiTambahan}
              className="prose-content text-muted-foreground"
            />
          ) : (
            <p className="text-muted-foreground">
              Tidak ada informasi tambahan
            </p>
          )}
        </TabsContent>
      </div>
    </Tabs>
  );
}
