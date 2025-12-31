import type { Metadata } from "next";
import { CatalogProvider } from "@/contexts/CatalogContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Katalog Bank Sumsel Babel",
  description: "Katalog layanan dan produk Bank Sumsel Babel untuk kebutuhan perbankan Bank Sumsel Babel.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <CatalogProvider>
          {children}
        </CatalogProvider>
      </body>
    </html>
  );
}
