import React from "react";
import { Link } from "react-router-dom";
import {
  Phone,
  Mail,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-primary text-background">
      <div className="container mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4 w-48">
              <img
                src="/public/logo-white.png"
                alt=""
                className="w-full h-full"
              />
            </div>
            <p className="text-sm text-background/70 leading-relaxed">
              Bank Pembangunan Daerah Sumatera Selatan dan Bangka Belitung,
              melayani dengan sepenuh hati untuk kemajuan bersama.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Produk & Layanan</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/kategori/tabungan"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Tabungan
                </Link>
              </li>
              <li>
                <Link
                  to="/kategori/giro"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Giro
                </Link>
              </li>
              <li>
                <Link
                  to="/kategori/kredit"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Kredit
                </Link>
              </li>
              <li>
                <Link
                  to="/kategori/fasilitas-layanan"
                  className="text-sm text-background/70 hover:text-background transition-colors"
                >
                  Fasilitas Layanan
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Hubungi Kami</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-sm text-background/70">
                  (0711) 350000
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-sm text-background/70">
                  info@banksumselbabel.com
                </span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary" />
                <span className="text-sm text-background/70">
                  Jl. Gubernur H. A. Bastari No. 7, Palembang
                </span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Ikuti Kami</h3>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center hover:bg-primary transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center text-sm text-background/50">
          <p>
            © {new Date().getFullYear()} PT Bank Pembangunan Daerah Sumatera
            Selatan dan Bangka Belitung. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
