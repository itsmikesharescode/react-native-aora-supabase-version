import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import type { VideoType } from '@/lib/types';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';
import { useAuth } from '@/context/AuthProvider';

const VideoCard: React.FC<VideoType> = (params) => {
  const auth = useAuth();
  const [play, setPlay] = useState(false);

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center flex-row flex-1">
          <View className="w-[46px] rounded-lg border-secondary border h-[46px] p-0.5">
            <Image
              source={{ uri: params.thumbnail }}
              className="w-full h-full rounded-lg"
              resizeMode="cover"
            />
          </View>

          <View className="justify-center flex-1 ml-3 gap-y-1">
            <Text className="text-white font-psemibold text-sm" numberOfLines={1}>
              {params.title}
            </Text>

            <Text className="text-xs text-gray-100 font-pregular">
              {auth.user?.user_metadata.username}
            </Text>
          </View>
          <View className="pt-2">
            <Image source={icons.menu} className="w-5 h-5 " resizeMode="contain" />
          </View>
        </View>
      </View>

      {play ? (
        <Video
          className="w-full h-60 rounded-xl mt-3"
          source={{ uri: params.video }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls={true}
          shouldPlay={true}
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        ></Video>
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
          className="w-full h-60 rounded-xl mt-3 relative justify-center items-center"
        >
          <Image
            source={{ uri: params.thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default VideoCard;
