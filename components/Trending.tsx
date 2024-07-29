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
import type { Video } from '@/lib/types';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants';

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

const TrendingItem: React.FC<{ activeItem: Video; item: Video }> = ({ activeItem, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View className="mr-5" animation={activeItem.id === item.id ? zoomIn : zoomOut}>
      {play ? (
        <Text className="text-white">Playing</Text>
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

const Trending: React.FC<{ latestVideos: Video[] }> = ({ latestVideos }) => {
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
      data={latestVideos}
      keyExtractor={(item) => String(item.id)}
      renderItem={({ item }) => <TrendingItem activeItem={activeItem} item={item} />}
      horizontal
    />
  );
};

export default Trending;

const styles = StyleSheet.create({});
