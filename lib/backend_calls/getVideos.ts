import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { VideoType } from '../types';

const getVideos = async () => {
  const { data, error } = (await supabase.from('videos_tb').select('*')) as {
    data: VideoType[];
    error: PostgrestError | null;
  };
  if (error) return error;
  return data;
};

export default getVideos;
