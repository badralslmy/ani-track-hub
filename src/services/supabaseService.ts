
import { supabase } from "@/integrations/supabase/client";
import { AniListMedia } from "./aniListApi";

// أنواع البيانات
export interface AnimeCategory {
  id: string;
  name: string;
  display_name: string;
  description: string | null;
}

export interface AnimeRecord {
  id: string;
  title: string;
  description: string | null;
  cover_image: string | null;
  banner_image: string | null;
  episodes: number | null;
  status: string | null;
  genres: string[] | null;
  mean_score: number | null;
  season: string | null;
  season_year: number | null;
  anilist_id: number | null;
}

export interface AnimeCategoryMapping {
  id: string;
  anime_id: string;
  category_id: string;
  position: number | null;
}

// دالة لجلب جميع فئات الأنمي
export async function fetchAnimeCategories(): Promise<AnimeCategory[]> {
  const { data, error } = await supabase
    .from('anime_categories')
    .select('*')
    .order('display_name');

  if (error) {
    console.error('Error fetching anime categories:', error);
    throw error;
  }

  return data || [];
}

// دالة لجلب الأنمي حسب الفئة
export async function fetchAnimeByCategory(categoryName: string): Promise<AnimeRecord[]> {
  try {
    // جلب معرف الفئة أولاً
    const { data: categoryData, error: categoryError } = await supabase
      .from('anime_categories')
      .select('id')
      .eq('name', categoryName)
      .single();

    if (categoryError) {
      console.error(`Error fetching category ${categoryName}:`, categoryError);
      return [];
    }

    if (!categoryData) {
      console.log(`Category ${categoryName} not found`);
      return [];
    }

    // استخدام معرف الفئة لجلب الأنمي المرتبط بها
    const { data, error } = await supabase
      .from('anime_category_mapping')
      .select(`
        anime_id,
        position,
        anime:anime_id (*)
      `)
      .eq('category_id', categoryData.id)
      .order('position');

    if (error) {
      console.error(`Error fetching anime by category ${categoryName}:`, error);
      return [];
    }

    // التحقق من وجود البيانات وتحويلها إلى الشكل المطلوب
    if (!data || data.length === 0) {
      console.log(`No anime found for category ${categoryName}`);
      return [];
    }

    // استخراج بيانات الأنمي من النتائج
    const animeList = data
      .filter(item => item.anime) // تجاهل أي عناصر بدون بيانات أنمي
      .map(item => item.anime as AnimeRecord);
    
    return animeList;
  } catch (error) {
    console.error(`Error in fetchAnimeByCategory for ${categoryName}:`, error);
    return [];
  }
}

// دالة لإضافة أنمي جديد من AniList
export async function addAnimeFromAniList(anime: AniListMedia): Promise<AnimeRecord> {
  try {
    // تحويل بيانات AniList إلى تنسيق جدول الأنمي لدينا
    const animeData = {
      title: anime.title.english || anime.title.romaji,
      description: anime.description,
      cover_image: anime.coverImage.large,
      banner_image: anime.bannerImage,
      episodes: anime.episodes,
      status: anime.status,
      genres: anime.genres,
      mean_score: anime.meanScore / 10, // تحويل من 100 إلى 10
      season: anime.season,
      season_year: anime.seasonYear,
      anilist_id: anime.id
    };

    // إضافة الأنمي إلى قاعدة البيانات
    const { data, error } = await supabase
      .from('anime')
      .upsert(animeData, { onConflict: 'anilist_id' })
      .select()
      .single();

    if (error) {
      console.error('Error adding anime from AniList:', error);
      throw new Error(`فشل إضافة الأنمي: ${error.message}`);
    }

    if (!data) {
      throw new Error('لم يتم إرجاع بيانات الأنمي بعد الإضافة');
    }

    return data;
  } catch (error) {
    console.error('Error in addAnimeFromAniList:', error);
    if (error instanceof Error) {
      throw new Error(`فشل إضافة الأنمي: ${error.message}`);
    } else {
      throw new Error('فشل إضافة الأنمي لسبب غير معروف');
    }
  }
}

// دالة لإضافة أنمي إلى فئة معينة
export async function addAnimeToCategory(
  animeId: string, 
  categoryId: string, 
  position?: number
): Promise<void> {
  try {
    // إذا لم يتم تحديد موضع، نضع الأنمي في النهاية
    let finalPosition = position;
    
    if (finalPosition === undefined) {
      // جلب آخر موضع في الفئة
      const { data, error } = await supabase
        .from('anime_category_mapping')
        .select('position')
        .eq('category_id', categoryId)
        .order('position', { ascending: false })
        .limit(1);
      
      if (!error && data && data.length > 0) {
        finalPosition = (data[0].position || 0) + 1;
      } else {
        finalPosition = 1;
      }
    }
    
    // التحقق من وجود نفس الأنمي في الفئة
    const { data: existingMapping, error: checkError } = await supabase
      .from('anime_category_mapping')
      .select('id')
      .eq('anime_id', animeId)
      .eq('category_id', categoryId)
      .maybeSingle();

    if (checkError) {
      console.error('Error checking existing mapping:', checkError);
    }

    // إذا كان الأنمي موجود بالفعل في الفئة، لا نضيفه مرة أخرى
    if (existingMapping) {
      console.log('Anime already exists in this category');
      return;
    }
    
    // إضافة الأنمي إلى الفئة
    const { error } = await supabase
      .from('anime_category_mapping')
      .insert({
        anime_id: animeId,
        category_id: categoryId,
        position: finalPosition
      });

    if (error) {
      console.error('Error adding anime to category:', error);
      throw new Error(`فشل إضافة الأنمي للفئة: ${error.message}`);
    }
  } catch (error) {
    console.error('Error in addAnimeToCategory:', error);
    if (error instanceof Error) {
      throw new Error(`فشل إضافة الأنمي للفئة: ${error.message}`);
    } else {
      throw new Error('فشل إضافة الأنمي للفئة لسبب غير معروف');
    }
  }
}

// دالة لإزالة أنمي من فئة معينة
export async function removeAnimeFromCategory(animeId: string, categoryId: string): Promise<void> {
  try {
    const { error } = await supabase
      .from('anime_category_mapping')
      .delete()
      .eq('anime_id', animeId)
      .eq('category_id', categoryId);

    if (error) {
      console.error('Error removing anime from category:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in removeAnimeFromCategory:', error);
    throw error;
  }
}

// دالة لجلب جميع الأنمي
export async function fetchAllAnime(): Promise<AnimeRecord[]> {
  try {
    const { data, error } = await supabase
      .from('anime')
      .select('*')
      .order('title');

    if (error) {
      console.error('Error fetching all anime:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error in fetchAllAnime:', error);
    return [];
  }
}
