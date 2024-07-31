import { supabase } from '../supabase';

const getSearchVideos = async (searchValue: string) => {
  const { data, error } = await supabase
    .from('videos_tb')
    .select()
    .ilike('title', `%${searchValue}%`);
  if (error) return error;
  return data;
};

export default getSearchVideos;
