/**
 * Navigation configuration for the application
 */

export interface NavLink {
  href: string;
  label: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: "Facebook" | "Instagram" | "Twitter";
}

export const navLinks: NavLink[] = [
  { href: "/", label: "Beranda" },
  { href: "/kategori/tabungan", label: "Tabungan" },
  { href: "/kategori/fasilitas-layanan", label: "Layanan" },
  { href: "/kategori/giro", label: "Giro" },
  { href: "/kategori/kredit", label: "Kredit" },
];

export const socialLinks: SocialLink[] = [
  { name: "Facebook", href: "#", icon: "Facebook" },
  { name: "Instagram", href: "#", icon: "Instagram" },
  { name: "Twitter", href: "#", icon: "Twitter" },
];

export const contactInfo = {
  phone: "(0711) 350000",
  email: "info@banksumselbabel.com",
  address: "Jl. Gubernur H. A. Bastari No. 7, Palembang",
};

export const footerLinks = {
  products: [
    { href: "/kategori/tabungan", label: "Tabungan" },
    { href: "/kategori/giro", label: "Giro" },
    { href: "/kategori/kredit", label: "Kredit" },
    { href: "/kategori/fasilitas-layanan", label: "Fasilitas Layanan" },
  ],
};

export const companyInfo = {
  name: "PT Bank Pembangunan Daerah Sumatera Selatan dan Bangka Belitung",
  shortName: "Bank Sumsel Babel",
  description:
    "Bank Pembangunan Daerah Sumatera Selatan dan Bangka Belitung, melayani dengan sepenuh hati untuk kemajuan bersama.",
};
