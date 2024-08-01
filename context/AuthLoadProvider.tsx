import { supabase } from '@/lib/supabase';
import { AuthLoadType, VideoType } from '@/lib/types';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { useAuth } from './AuthProvider';

interface AuthLoadContextType {
  allVideos: VideoType[] | null;
  setAllVideos: (allVideos: VideoType[] | null) => void;

  personalVideos: VideoType[] | null;
  setPersonalVideos: (personalVideos: VideoType[] | null) => void;
}

const AuthLoadContext = createContext<AuthLoadContextType | undefined>(undefined);

export const useAuthLoad = () => {
  const context = useContext(AuthLoadContext);
  if (!context) {
    throw new Error('useAuthLoad must be used within an AuthLoadProvider');
  }
  return context;
};

export const AuthLoadProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();
  const [allVideos, setAllVideos] = useState<VideoType[] | null>(null);
  const [personalVideos, setPersonalVideos] = useState<VideoType[] | null>(null);

  useEffect(() => {
    const getAuthLoad = async () => {
      const { data, error } = (await supabase.rpc(
        'auth_load',
      )) as PostgrestSingleResponse<AuthLoadType>;

      if (error) Alert.alert('Auth Load Error', error.message);
      if (data) {
        console.log(data);
        setAllVideos(data.allvideos);
        setPersonalVideos(data.personal_videos);
      }
    };

    getAuthLoad();
  }, [auth.user]);

  const value = {
    allVideos,
    setAllVideos,
    personalVideos,
    setPersonalVideos,
  };

  return <AuthLoadContext.Provider value={value}>{children}</AuthLoadContext.Provider>;
};
