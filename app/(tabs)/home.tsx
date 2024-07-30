import { Text, View, FlatList, Image, RefreshControl, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { useState } from 'react';
import { useRenderDB } from '@/lib/custom_hooks';
import { getLatestVideos, getVideos } from '@/lib/business_logic';
import VideoCard from '@/components/VideoCard';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: videos, isLoading, refetch } = useRenderDB(getVideos);
  const { data: latestVideos } = useRenderDB(getLatestVideos);

  const onRefresh = async () => {
    setRefreshing(true);

    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={videos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between flex-row mb-6 items-start">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back</Text>
                <Text className="font-pmedium text-2xl text-white">Mikey</Text>
              </View>

              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>

            <SearchInput value="" placeholder="Search for a video topic" otherStyles="" />

            <View className="w-full flex-1 pt-5 pb-8">
              <Text className="text-gray-100 text-lg font-pregular mb-3 ">Latest Videos</Text>
              <Trending latestVideos={latestVideos} />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="Be the first one to upload a video." />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      />
    </SafeAreaView>
  );
};

export default Home;
