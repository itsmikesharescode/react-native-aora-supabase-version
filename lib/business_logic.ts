import { PostgrestError } from '@supabase/supabase-js';
import { supabase } from './supabase';
import type { VideoType } from './types';
import type { CreateSchema } from './schema';
import uuid from 'react-native-uuid';

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

export const createVideo = async (createVideo: CreateSchema, userId: string) => {
  const newUID = uuid.v4();
  const videoBlob = createVideo.uploadVideo as Blob;
  const imageBlob = createVideo.uploadImage as Blob;
  const publicURL =
    'https://lcscgbuwhivxxhzujbfg.supabase.co/storage/v1/object/public/aora-videos/';

  try {
    const [videoData, imageData] = await Promise.all([
      await supabase.storage
        .from('aora-videos')
        .upload(`${userId}/${newUID}/${createVideo.uploadVideo.name}`, videoBlob, {
          contentType: createVideo.uploadVideo.type,
        }),

      await supabase.storage
        .from('aora-videos')
        .upload(`${userId}/${newUID}/${createVideo.uploadImage.name}`, imageBlob, {
          contentType: createVideo.uploadImage.type,
        }),
    ]);

    const { error } = await supabase.from('videos').insert([
      {
        user_id: userId,
        title: createVideo.videoTitle,
        prompt: createVideo.aiPrompt,
        thumbnail: `${publicURL}/${imageData.data?.path}`,
        video: `${publicURL}/${videoData.data?.path}`,
      },
    ]);
    console.log(error);
    if (error) return error;
    return null;
  } catch (error) {
    console.log(error);
    return error as PostgrestError;
  }
};
