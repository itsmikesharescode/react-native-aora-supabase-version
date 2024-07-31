import { PostgrestError } from '@supabase/supabase-js';
import { CreateSchema } from '../schema';
import { supabase } from '../supabase';
import uuid from 'react-native-uuid';

const createVideo = async (createVideo: CreateSchema, userId: string) => {
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

    const { error } = await supabase.from('videos_tb').insert([
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

export default createVideo;
