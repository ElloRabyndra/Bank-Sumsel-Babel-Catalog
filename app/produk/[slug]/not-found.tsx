import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import {
  socialLinks,
  contactInfo,
  footerLinks,
  companyInfo,
  navLinks,
} from "@/data/navigation";

const iconMap = {
  Facebook,
  Instagram,
  Twitter,
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Static Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2 h-10">
              <Image
                src="/logo.png"
                alt="Logo"
                width={120}
                height={40}
                priority
              />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium rounded-md transition-colors text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Konten tidak ditemukan
          </h1>
          <p className="text-muted-foreground mb-4">
            Konten yang Anda cari tidak tersedia
          </p>
          <Link href="/" className="text-primary hover:underline">
            Kembali ke Beranda
          </Link>
        </div>
      </main>

      {/* Static Footer */}
      <footer className="bg-primary text-background">
        <div className="container mx-auto max-w-7xl px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <div className="flex items-center gap-2 mb-4 w-48">
                <Image
                  src="/logo-white.png"
                  alt={`Logo ${companyInfo.shortName}`}
                  width={192}
                  height={48}
                  priority
                />
              </div>
              <p className="text-sm text-background/70 leading-relaxed">
                {companyInfo.description}
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Produk & Layanan</h3>
              <ul className="space-y-2">
                {footerLinks.products.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/70 hover:text-background transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Hubungi Kami</h3>
              <ul className="-ml-7 space-y-3">
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 mt-0.5 text-primary" />
                  <span className="text-sm text-background/70">
                    {contactInfo.phone}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 mt-0.5 text-primary" />
                  <span className="text-sm text-background/70">
                    {contactInfo.email}
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                  <span className="text-sm text-background/70">
                    {contactInfo.address}
                  </span>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div>
              <h3 className="font-semibold mb-4">Ikuti Kami</h3>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
                      aria-label={social.name}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/50">
            <p>
              © {new Date().getFullYear()} {companyInfo.name}. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
