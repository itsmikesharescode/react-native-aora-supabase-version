import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, { SetStateAction, useState } from 'react';
import type { VideoType } from '@/lib/types';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';
import { Video, ResizeMode } from 'expo-av';

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem: React.FC<{ activeItem: VideoType; item: VideoType }> = ({
  activeItem,
  item,
}) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View className="mr-5" animation={activeItem.id === item.id ? zoomIn : zoomOut}>
      {play ? (
        <Video
          source={{ uri: item.video }}
          className="w-52 h-72 rounded-[35px] mt-3"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        ></Video>
      ) : (
        <TouchableOpacity
          className="relative justify-center items-center"
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            className="w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40"
            resizeMode="cover"
          />

          <Image source={icons.play} className="w-12 h-12 absolute" resizeMode="contain" />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const Trending: React.FC<{ latestVideos: VideoType[] }> = ({ latestVideos }) => {
  const [activeItem, setActiveItem] = useState(latestVideos[1]);

  return (
    <FlatList
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length) {
          setActiveItem(latestVideos[viewableItems[0].index ?? 0]);
        }
      }}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
      data={latestVideos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
