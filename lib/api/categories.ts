import { supabase, Database } from '@/lib/supabase';
import { Category } from '@/types';
import { generateSlug } from '@/lib/utils';

type CategoryRow = Database['public']['Tables']['categories']['Row'];
type CategoryInsert = Database['public']['Tables']['categories']['Insert'];

// Converter functions
function dbToCategory(row: CategoryRow): Category {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description || '',
    icon: row.icon,
    thumbnailUrl: row.thumbnail_url,
    orderIndex: row.order_index,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function categoryToDb(category: Omit<Category, 'id' | 'slug' | 'createdAt' | 'updatedAt'>): CategoryInsert {
  return {
    name: category.name,
    slug: generateSlug(category.name),
    description: category.description,
    icon: category.icon,
    thumbnail_url: category.thumbnailUrl,
    order_index: category.orderIndex,
  };
}

// API Functions
export async function fetchCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data.map(dbToCategory);
}

export async function fetchCategoryById(id: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null; // Not found
    throw error;
  }
  return dbToCategory(data);
}

export async function fetchCategoryBySlug(slug: string): Promise<Category | null> {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    if (error.code === 'PGRST116') return null;
    throw error;
  }
  return dbToCategory(data);
}

export async function createCategory(
  category: Omit<Category, 'id' | 'slug' | 'createdAt' | 'updatedAt'>
): Promise<Category> {
  const dbData = categoryToDb(category);
  
  const { data, error } = await supabase
    .from('categories')
    .insert(dbData)
    .select()
    .single();

  if (error) throw error;
  return dbToCategory(data);
}

export async function updateCategory(
  id: string,
  updates: Partial<Omit<Category, 'id' | 'createdAt' | 'updatedAt'>>
): Promise<Category> {
  const dbUpdates: Partial<CategoryInsert> = {};
  
  if (updates.name !== undefined) {
    dbUpdates.name = updates.name;
    dbUpdates.slug = generateSlug(updates.name);
  }
  if (updates.description !== undefined) dbUpdates.description = updates.description;
  if (updates.icon !== undefined) dbUpdates.icon = updates.icon;
  if (updates.thumbnailUrl !== undefined) dbUpdates.thumbnail_url = updates.thumbnailUrl;
  if (updates.orderIndex !== undefined) dbUpdates.order_index = updates.orderIndex;

  const { data, error } = await supabase
    .from('categories')
    .update(dbUpdates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return dbToCategory(data);
}

export async function deleteCategory(id: string): Promise<void> {
  const { error } = await supabase
    .from('categories')
    .delete()
    .eq('id', id);

  if (error) throw error;
}