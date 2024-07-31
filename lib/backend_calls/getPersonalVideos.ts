import { supabase } from '../supabase';

const getPersonalVideos = async (userId: string | undefined) => {
  const { data, error } = await supabase.from('videos_tb').select().eq('user_id', userId);
  if (error) return error;
  return data;
};

export default getPersonalVideos;
