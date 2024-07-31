import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { VideoType } from '../types';

const getLatestVideos = async () => {
  const { data, error } = (await supabase
    .from('videos_tb')
    .select('*')
    .limit(7)
    .order('created_at', { ascending: true })) as {
    data: VideoType[];
    error: PostgrestError | null;
  };
  if (error) return error;
  return data;
};

export default getLatestVideos;
