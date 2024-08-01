import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { VideoType } from '../types';
import { Alert } from 'react-native';

const bookmarkEvent = async (videoId: number) => {
  const { data, error } = (await supabase.rpc('bookmark_event', {
    video_id_client: videoId,
  })) as PostgrestSingleResponse<VideoType[]>;

  if (error) Alert.alert('Bookmark Error', error.message);
  return data;
};

export default bookmarkEvent;
