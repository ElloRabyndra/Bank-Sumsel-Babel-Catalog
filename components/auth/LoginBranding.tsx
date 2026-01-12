import Link from "next/link"
import Image from "next/image"
import { Sparkles } from "lucide-react"

export function LoginBranding() {
  return (
    <div className="hidden lg:flex lg:w-1/2 relative bg-linear-to-br from-primary via-primary/90 to-primary/70 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-accent/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between p-12 text-white">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-white.png"
              alt="Logo"
              width={120}
              height={40}
              priority
            />
          </Link>
        </div>

        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm">
            <Sparkles className="w-4 h-4" />
            <span>Platform Katalog Digital</span>
          </div>
          
          <h1 className="text-4xl xl:text-5xl font-bold leading-tight">
            Kelola Produk & Layanan
            <br />
            <span className="text-white/80">Dengan Mudah</span>
          </h1>
          
          <p className="text-lg text-white/70 max-w-md leading-relaxed">
            Akses dashboard admin untuk mengelola katalog digital Anda. 
            Tambah, edit, dan publikasikan konten dalam hitungan menit.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            {["Manajemen Produk", "Kategori Dinamis", "Publikasi Instan"].map((feature) => (
              <div 
                key={feature}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-sm"
              >
                <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        <div className="text-white/50 text-sm">
          © 2026 Bank Sumsel Babel.
        </div>
      </div>
    </div>
  )
}