import { CatalogProvider } from "@/contexts/CatalogContext";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body suppressHydrationWarning>
        <CatalogProvider>
          {children}
        </CatalogProvider>
      </body>
    </html>
  );
}
