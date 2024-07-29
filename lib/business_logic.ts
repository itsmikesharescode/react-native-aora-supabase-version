import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { Video } from './types';

export const getVideos = async () => {
  const { data, error } = (await supabase.from('videos').select('*')) as {
    data: Video[];
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
    data: Video[];
    error: PostgrestError | null;
  };
  if (error) return error;
  return data;
};
