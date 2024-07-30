import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { VideoType } from './types';

export const getVideos = async () => {
  const { data, error } = (await supabase.from('videos').select('*')) as {
    data: VideoType[];
    error: PostgrestError | null;
  };
  if (error) return error;
  return data;
};

export const getLatestVideos = async () => {
  const { data, error } = (await supabase
    .from('videos')
    .select('*')
    .limit(7)
    .order('created_at', { ascending: true })) as {
    data: VideoType[];
    error: PostgrestError | null;
  };
  if (error) return error;
  return data;
};

export const searchVideos = async (searchValue: string) => {
  const { data, error } = await supabase.from('videos').select().ilike('title', `%${searchValue}%`);
  if (error) return error;
  return data;
};

export const getPersonalVideos = async (userId: string | undefined) => {
  const { data, error } = await supabase.from('videos').select().eq('user_id', userId);
  if (error) return error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) return error;
};
