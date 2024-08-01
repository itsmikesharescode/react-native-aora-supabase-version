import { Image, Text, TouchableOpacity, View, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import type { VideoType } from '@/lib/types';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';
import { useAuth } from '@/context/AuthProvider';
import CustomButton from './CustomButton';
import { useAuthLoad } from '@/context/AuthLoadProvider';
import bookmarkEvent from '@/lib/backend_calls/bookmarkEvent';

const VideoCard: React.FC<VideoType> = (params) => {
  const auth = useAuth();
  const authLoad = useAuthLoad();

  const [showMenu, setShowMenu] = useState(false);
  const [play, setPlay] = useState(false);

  const [bookmark, setBookmark] = useState(false);

  const bookmarkEventHandler = async () => {
    setBookmark(true);
    const data = await bookmarkEvent(params.id);
    authLoad.setBookmarks(data);
    setBookmark(false);
  };

  return (
    <View className="flex-col items-center px-4 mb-14">
      <View className="flex-row gap-3 items-start">
        <View className="justify-center flex-row flex-1 relative">
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

          <TouchableOpacity onPress={() => setShowMenu(true)}>
            <View className="flex items-center justify-center p-[10px]">
              <Image source={icons.menu} className="w-5 h-5 " resizeMode="contain" />
            </View>
          </TouchableOpacity>

          {showMenu && (
            <Modal
              transparent={true}
              animationType="fade"
              visible={showMenu}
              onRequestClose={() => setShowMenu(false)}
            >
              <TouchableOpacity
                onPress={() => setShowMenu(false)}
                className="bg-[#0000007c] w-full h-full -z-10 flex items-center justify-end"
              >
                <View className="w-[100%] p-[10px] bg-black-100 z-10">
                  {authLoad.bookmarks?.find((item) => item.id === params.id) ? (
                    <CustomButton
                      isLoading={bookmark}
                      title="Unsave"
                      containerStyle="w-full"
                      handPress={bookmarkEventHandler}
                    />
                  ) : (
                    <CustomButton
                      isLoading={bookmark}
                      title="Save to Bookmark"
                      containerStyle="w-full"
                      handPress={bookmarkEventHandler}
                    />
                  )}
                  <CustomButton
                    isLoading={false}
                    title="Delete"
                    containerStyle="w-full mt-[10px]"
                    handPress={() =>
                      Alert.alert('Cannot be undone', 'Are you sure?', [
                        { text: 'Cancel', style: 'cancel' },
                        { text: 'Ok', style: 'destructive', isPreferred: true },
                      ])
                    }
                  />
                </View>
              </TouchableOpacity>
            </Modal>
          )}
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
        />
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
