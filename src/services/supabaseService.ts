
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
  next_episode_date: string | null;
  next_episode_number: number | null;
}

export interface AnimeCategoryMapping {
  id: string;
  anime_id: string;
  category_id: string;
  position: number | null;
}

export interface Episode {
  id: string;
  anime_id: string;
  episode_number: number;
  title: string | null;
  description: string | null;
  thumbnail: string | null;
  video_url: string | null;
  release_date: string | null;
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
      .map(item => item.anime as unknown as AnimeRecord);
    
    return animeList;
  } catch (error) {
    console.error(`Error in fetchAnimeByCategory for ${categoryName}:`, error);
    return [];
  }
}

// دالة لإضافة أنمي جديد من AniList
export async function addAnimeFromAniList(anime: AniListMedia): Promise<AnimeRecord> {
  try {
    // استخراج تاريخ الحلقة القادمة إذا كان متوفرًا
    let nextEpisodeDate = null;
    let nextEpisodeNumber = null;

    if (anime.nextAiringEpisode) {
      // تحويل unixTime إلى تاريخ
      nextEpisodeDate = new Date(anime.nextAiringEpisode.airingAt * 1000).toISOString();
      nextEpisodeNumber = anime.nextAiringEpisode.episode;
    }

    // تحويل بيانات AniList إلى تنسيق جدول الأنمي لدينا
    const animeData = {
      title: anime.title.english || anime.title.romaji,
      description: anime.description,
      cover_image: anime.coverImage.large,
      banner_image: anime.bannerImage,
      episodes: anime.episodes,
      status: anime.status,
      genres: anime.genres as string[],
      mean_score: anime.meanScore / 10, // تحويل من 100 إلى 10
      season: anime.season,
      season_year: anime.seasonYear,
      anilist_id: anime.id,
      next_episode_date: nextEpisodeDate,
      next_episode_number: nextEpisodeNumber
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

    // إضافة الحلقات إذا كانت متوفرة
    if (anime.streamingEpisodes && anime.streamingEpisodes.length > 0) {
      await addEpisodesFromAniList(data.id, anime.streamingEpisodes);
    }

    return data as unknown as AnimeRecord;
  } catch (error) {
    console.error('Error in addAnimeFromAniList:', error);
    if (error instanceof Error) {
      throw new Error(`فشل إضافة الأنمي: ${error.message}`);
    } else {
      throw new Error('فشل إضافة الأنمي لسبب غير معروف');
    }
  }
}

// دالة لإضافة الحلقات من AniList
async function addEpisodesFromAniList(
  animeId: string,
  streamingEpisodes: { title: string; url: string; thumbnail: string; site: string; }[]
): Promise<void> {
  try {
    // تحويل بيانات الحلقات إلى التنسيق المناسب
    const episodes = streamingEpisodes.map((ep, index) => ({
      anime_id: animeId,
      episode_number: index + 1,
      title: ep.title,
      thumbnail: ep.thumbnail,
      video_url: ep.url
    }));

    // إضافة الحلقات إلى قاعدة البيانات
    // سنستخدم مجموعة من متغيرات للحفاظ على القيم التي سيتم استخدامها في الجدول
    for (const episode of episodes) {
      const { error } = await supabase.rpc('upsert_episode', {
        p_anime_id: episode.anime_id,
        p_episode_number: episode.episode_number,
        p_title: episode.title,
        p_thumbnail: episode.thumbnail,
        p_video_url: episode.video_url
      });

      if (error) {
        console.error('Error adding episode:', error);
        throw error;
      }
    }
  } catch (error) {
    console.error('Error in addEpisodesFromAniList:', error);
    throw error;
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

    return data as unknown as AnimeRecord[];
  } catch (error) {
    console.error('Error in fetchAllAnime:', error);
    return [];
  }
}

// دالة حذف أنمي من قاعدة البيانات
export async function deleteAnime(animeId: string): Promise<void> {
  try {
    // أولاً، نحذف جميع الحلقات المرتبطة بالأنمي
    await supabase.rpc('delete_anime_episodes', { p_anime_id: animeId });

    // ثانياً، نحذف جميع علاقات الأنمي بالفئات
    const { error: mappingError } = await supabase
      .from('anime_category_mapping')
      .delete()
      .eq('anime_id', animeId);

    if (mappingError) {
      console.error('Error deleting anime mappings:', mappingError);
      throw mappingError;
    }

    // أخيراً، نحذف الأنمي نفسه
    const { error } = await supabase
      .from('anime')
      .delete()
      .eq('id', animeId);

    if (error) {
      console.error('Error deleting anime:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteAnime:', error);
    throw error;
  }
}

// دالة لجلب حلقات أنمي معين
export async function fetchAnimeEpisodes(animeId: string): Promise<Episode[]> {
  try {
    const { data, error } = await supabase.rpc('get_anime_episodes', {
      p_anime_id: animeId
    });

    if (error) {
      console.error(`Error fetching episodes for anime ${animeId}:`, error);
      return [];
    }

    return data as Episode[];
  } catch (error) {
    console.error('Error in fetchAnimeEpisodes:', error);
    return [];
  }
}

// دالة لإضافة رابط حلقة
export async function addEpisodeLink(
  animeId: string, 
  episodeNumber: number, 
  videoUrl: string,
  title?: string
): Promise<void> {
  try {
    // استخدم دالة لإضافة أو تحديث الحلقة
    const { error } = await supabase.rpc('upsert_episode', {
      p_anime_id: animeId,
      p_episode_number: episodeNumber,
      p_title: title || `الحلقة ${episodeNumber}`,
      p_thumbnail: null,
      p_video_url: videoUrl
    });

    if (error) {
      console.error('Error adding/updating episode:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in addEpisodeLink:', error);
    throw error;
  }
}

// دالة لحذف حلقة
export async function deleteEpisodeLink(episodeId: string): Promise<void> {
  try {
    const { error } = await supabase.rpc('delete_episode', {
      p_episode_id: episodeId
    });

    if (error) {
      console.error('Error deleting episode:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error in deleteEpisodeLink:', error);
    throw error;
  }
}
