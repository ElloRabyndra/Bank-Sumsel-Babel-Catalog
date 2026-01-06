import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase env variables are missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          icon: string;
          thumbnail_url: string;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["categories"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["categories"]["Insert"]>;
      };
      products: {
        Row: {
          id: string;
          category_id: string;
          type: "produk" | "layanan";
          title: string;
          slug: string;
          thumbnail_url: string;
          short_description: string;
          kenali_produk: string | null;
          nama_penerbit: string | null;
          fitur_utama: string | null;
          manfaat: string | null;
          risiko: string | null;
          persyaratan: string | null;
          biaya: string | null;
          informasi_tambahan: string | null;
          featured_image_url: string | null;
          youtube_video_url: string | null;
          gallery_images: string[];
          is_published: boolean;
          order_index: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<
          Database["public"]["Tables"]["products"]["Row"],
          "id" | "created_at" | "updated_at"
        >;
        Update: Partial<Database["public"]["Tables"]["products"]["Insert"]>;
      };
    };
  };
}
