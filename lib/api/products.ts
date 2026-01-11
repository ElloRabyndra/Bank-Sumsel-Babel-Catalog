import { supabase, Database } from '@/lib/supabase';
import { Product, ProductType } from '@/types';
import { generateSlug } from '@/lib/utils';
import { deleteImage } from './storage';

type ProductRow = Database['public']['Tables']['products']['Row'];
type ProductInsert = Database['public']['Tables']['products']['Insert'];

// Converter functions
function dbToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    categoryId: row.category_id,
    type: row.type,
    title: row.title,
    slug: row.slug,
    thumbnailUrl: row.thumbnail_url,
    shortDescription: row.short_description,
    kenaliProduk: row.kenali_produk || '',
    namaPenerbit: row.nama_penerbit || '',
    fiturUtama: row.fitur_utama || '',
    manfaat: row.manfaat || '',
    risiko: row.risiko || '',
    persyaratan: row.persyaratan || '',
    biaya: row.biaya || '',
    informasiTambahan: row.informasi_tambahan || '',
    featuredImageUrl: row.featured_image_url || '',
    youtubeVideoUrl: row.youtube_video_url || '',
    galleryImages: row.gallery_images || [],
    isPublished: row.is_published,
    orderIndex: row.order_index,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function productToDb(product: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): ProductInsert {
  return {
    category_id: product.categoryId,
    type: product.type,
    title: product.title,
    slug: generateSlug(product.title),
    thumbnail_url: product.thumbnailUrl,
    short_description: product.shortDescription,
    kenali_produk: product.kenaliProduk || null,
    nama_penerbit: product.namaPenerbit || null,
    fitur_utama: product.fiturUtama || null,
    manfaat: product.manfaat || null,
    risiko: product.risiko || null,
    persyaratan: product.persyaratan || null,
    biaya: product.biaya || null,
    informasi_tambahan: product.informasiTambahan || null,
    featured_image_url: product.featuredImageUrl || null,
    youtube_video_url: product.youtubeVideoUrl || null,
    gallery_images: product.galleryImages,
    is_published: product.isPublished,
    order_index: product.orderIndex,
  };
}

/**
 * Helper function to extract images from HTML content
 */
function extractImagesFromHtml(html: string): string[] {
  const imgRegex = /<img[^>]+src="([^">]+)"/g;
  const images: string[] = [];
  let match;
  
  while ((match = imgRegex.exec(html)) !== null) {
    const src = match[1];
    // Only include Supabase storage URLs
    if (src.includes('supabase.co/storage')) {
      images.push(src);
    }
  }
  
  return images;
}

/**
 * Collect all image URLs from a product
 */
function getAllProductImages(product: Product): string[] {
  const images: string[] = [];
  
  // Thumbnail
  if (product.thumbnailUrl?.includes('supabase')) {
    images.push(product.thumbnailUrl);
  }
  
  // Featured image
  if (product.featuredImageUrl?.includes('supabase')) {
    images.push(product.featuredImageUrl);
  }
  
  // Gallery images
  product.galleryImages?.forEach(img => {
    if (img.includes('supabase')) {
      images.push(img);
    }
  });
  
  // Images in rich text content
  const htmlFields = [
    product.kenaliProduk,
    product.fiturUtama,
    product.manfaat,
    product.risiko,
    product.persyaratan,
    product.biaya,
    product.informasiTambahan,
  ];
  
  htmlFields.forEach(html => {
    if (html) {
      images.push(...extractImagesFromHtml(html));
    }
  });
  
  return [...new Set(images)]; // Remove duplicates
}

// API Functions
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data.map(dbToProduct);
}

export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return dbToProduct(data);
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return dbToProduct(data);
}

export async function fetchProductsByCategory(categoryId: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('category_id', categoryId)
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data.map(dbToProduct);
}

export async function fetchProductsByType(type: ProductType): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('type', type)
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data.map(dbToProduct);
}

export async function fetchPublishedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data.map(dbToProduct);
}

export async function searchProducts(query: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('is_published', true)
    .or(`title.ilike.%${query}%,short_description.ilike.%${query}%`)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data.map(dbToProduct);
}

export async function createProduct(
  product: Omit<Product, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
): Promise<Product> {
  const dbData = productToDb(product);
  
  const { data, error } = await supabase
    .from('products')
    .insert(dbData)
    .select()
    .single();

  if (error) throw error;
  return dbToProduct(data);
}

export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Product> {
  // Fetch old product data to handle image replacements
  const oldProduct = await fetchProductById(id);
  
  const dbUpdates: Partial<ProductInsert> = {};
  
  if (updates.categoryId !== undefined) dbUpdates.category_id = updates.categoryId;
  if (updates.type !== undefined) dbUpdates.type = updates.type;
  if (updates.title !== undefined) {
    dbUpdates.title = updates.title;
    dbUpdates.slug = generateSlug(updates.title);
  }
  
  // Handle thumbnail replacement
  if (updates.thumbnailUrl !== undefined) {
    if (oldProduct?.thumbnailUrl && 
        oldProduct.thumbnailUrl !== updates.thumbnailUrl &&
        oldProduct.thumbnailUrl.includes('supabase')) {
      await deleteImage(oldProduct.thumbnailUrl).catch(err => 
        console.warn('Failed to delete old thumbnail:', err)
      );
    }
    dbUpdates.thumbnail_url = updates.thumbnailUrl;
  }
  
  // Handle featured image replacement
  if (updates.featuredImageUrl !== undefined) {
    if (oldProduct?.featuredImageUrl && 
        oldProduct.featuredImageUrl !== updates.featuredImageUrl &&
        oldProduct.featuredImageUrl.includes('supabase')) {
      await deleteImage(oldProduct.featuredImageUrl).catch(err => 
        console.warn('Failed to delete old featured image:', err)
      );
    }
    dbUpdates.featured_image_url = updates.featuredImageUrl || null;
  }
  
  // Handle gallery images
  if (updates.galleryImages !== undefined) {
    // Delete removed gallery images
    if (oldProduct?.galleryImages) {
      const removedImages = oldProduct.galleryImages.filter(
        img => !updates.galleryImages?.includes(img) && img.includes('supabase')
      );
      
      await Promise.all(
        removedImages.map(img => 
          deleteImage(img).catch(err => 
            console.warn('Failed to delete gallery image:', err)
          )
        )
      );
    }
    dbUpdates.gallery_images = updates.galleryImages;
  }
  
  if (updates.shortDescription !== undefined) dbUpdates.short_description = updates.shortDescription;
  if (updates.kenaliProduk !== undefined) dbUpdates.kenali_produk = updates.kenaliProduk || null;
  if (updates.namaPenerbit !== undefined) dbUpdates.nama_penerbit = updates.namaPenerbit || null;
  if (updates.fiturUtama !== undefined) dbUpdates.fitur_utama = updates.fiturUtama || null;
  if (updates.manfaat !== undefined) dbUpdates.manfaat = updates.manfaat || null;
  if (updates.risiko !== undefined) dbUpdates.risiko = updates.risiko || null;
  if (updates.persyaratan !== undefined) dbUpdates.persyaratan = updates.persyaratan || null;
  if (updates.biaya !== undefined) dbUpdates.biaya = updates.biaya || null;
  if (updates.informasiTambahan !== undefined) dbUpdates.informasi_tambahan = updates.informasiTambahan || null;
  if (updates.youtubeVideoUrl !== undefined) dbUpdates.youtube_video_url = updates.youtubeVideoUrl || null;
  if (updates.isPublished !== undefined) dbUpdates.is_published = updates.isPublished;
  if (updates.orderIndex !== undefined) dbUpdates.order_index = updates.orderIndex;

  const { data, error } = await supabase
    .from('products')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return dbToProduct(data);
}

export async function toggleProductPublish(id: string): Promise<Product> {
  // Fetch current state first
  const { data: currentData, error: fetchError } = await supabase
    .from('products')
    .select('is_published')
    .eq('id', id)
    .single();

  if (fetchError) throw fetchError;

  // Toggle the value
  const { data, error } = await supabase
    .from('products')
    .update({ is_published: !currentData.is_published })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return dbToProduct(data);
}

export async function deleteProduct(id: string): Promise<void> {
  // 1. Fetch product to get all image URLs
  const product = await fetchProductById(id);
  
  if (!product) {
    throw new Error('Product not found');
  }
  
  // 2. Delete from database first
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);

  if (error) throw error;
  
  // 3. Delete all associated images from storage
  const imagesToDelete = getAllProductImages(product);
  
  if (imagesToDelete.length > 0) {
    console.log(`Deleting ${imagesToDelete.length} images for product: ${product.title}`);
    
    // Delete images in parallel but don't fail if some deletions fail
    await Promise.allSettled(
      imagesToDelete.map(async (imageUrl) => {
        try {
          await deleteImage(imageUrl);
          console.log(`✓ Deleted: ${imageUrl}`);
        } catch (err) {
          console.warn(`✗ Failed to delete: ${imageUrl}`, err);
        }
      })
    );
  }
}