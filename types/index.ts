export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  thumbnailUrl: string;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  categoryId: string;
  title: string;
  slug: string;
  thumbnailUrl: string;
  shortDescription: string;
  kenaliProduk: string;
  namaPenerbit: string;
  fiturUtama: string;
  manfaat: string;
  risiko: string;
  persyaratan: string;
  biaya: string;
  informasiTambahan: string;
  featuredImageUrl: string;
  youtubeVideoUrl: string;
  galleryImages: string[];
  isPublished: boolean;
  orderIndex: number;
  createdAt: string;
  updatedAt: string;
}

export type LucideIconName = 
  | 'Wallet'
  | 'Settings'
  | 'FileText'
  | 'CreditCard'
  | 'Building'
  | 'Banknote'
  | 'PiggyBank'
  | 'TrendingUp'
  | 'Shield'
  | 'Users'
  | 'Home'
  | 'Car'
  | 'GraduationCap'
  | 'Heart'
  | 'Briefcase';
