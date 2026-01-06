import { supabaseServer } from '@/lib/supabase/server';
import { initialCategories, createInitialProducts } from '@/data/mockData';

async function migrateData() {
  console.log('🚀 Starting migration...');

  try {
    // 1. Insert Categories
    console.log('📦 Inserting categories...');
    const categoryInserts = initialCategories.map((cat) => ({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      icon: cat.icon,
      thumbnail_url: cat.thumbnailUrl,
      order_index: cat.orderIndex,
    }));

    const { data: insertedCategories, error: catError } =
      await supabaseServer
        .from('categories')
        .insert(categoryInserts)
        .select();

    if (catError) throw catError;
    if (!insertedCategories) throw new Error('No categories inserted');

    console.log(`✅ Inserted ${insertedCategories.length} categories`);

    // Map old category ID → new category ID
    const categoryIdMap = new Map<string, string>();
    initialCategories.forEach((oldCat, index) => {
      categoryIdMap.set(oldCat.id, insertedCategories[index].id);
    });

    // 2. Insert Products
    console.log('📦 Inserting products...');
    const initialProducts = createInitialProducts(initialCategories);

    const productInserts = initialProducts.map((prod) => ({
      category_id: categoryIdMap.get(prod.categoryId),
      type: prod.type,
      title: prod.title,
      slug: prod.slug,
      thumbnail_url: prod.thumbnailUrl,
      short_description: prod.shortDescription,
      kenali_produk: prod.kenaliProduk ?? null,
      nama_penerbit: prod.namaPenerbit ?? null,
      fitur_utama: prod.fiturUtama ?? null,
      manfaat: prod.manfaat ?? null,
      risiko: prod.risiko ?? null,
      persyaratan: prod.persyaratan ?? null,
      biaya: prod.biaya ?? null,
      informasi_tambahan: prod.informasiTambahan ?? null,
      featured_image_url: prod.featuredImageUrl ?? null,
      youtube_video_url: prod.youtubeVideoUrl ?? null,
      gallery_images: prod.galleryImages,
      is_published: prod.isPublished,
      order_index: prod.orderIndex,
    }));

    const { data: insertedProducts, error: prodError } =
      await supabaseServer
        .from('products')
        .insert(productInserts)
        .select();

    if (prodError) throw prodError;
    if (!insertedProducts) throw new Error('No products inserted');

    console.log(`✅ Inserted ${insertedProducts.length} products`);
    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateData();
