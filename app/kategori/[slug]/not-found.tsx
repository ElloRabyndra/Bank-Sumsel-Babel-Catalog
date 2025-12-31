import Link from "next/link";
import { Navbar } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Kategori tidak ditemukan
          </h1>
          <p className="text-muted-foreground mb-4">
            Kategori yang Anda cari tidak tersedia
          </p>
          <Link href="/" className="text-primary hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
