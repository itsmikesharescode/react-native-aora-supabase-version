import { Text, View, FlatList, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import SearchInput from '@/components/SearchInput';
import Trending from '@/components/Trending';
import EmptyState from '@/components/EmptyState';
import { useState } from 'react';
import { useRenderDB } from '@/lib/custom_hooks';
import VideoCard from '@/components/VideoCard';
import { useAuth } from '@/context/AuthProvider';

import getVideos from '@/lib/backend_calls/getVideos';
import getLatestVideos from '@/lib/backend_calls/getLatestVideos';

const Home = () => {
  const auth = useAuth();

  const [refreshing, setRefreshing] = useState(false);

  const { data: videos, refetch } = useRenderDB(getVideos);
  const { data: latestVideos, refetch: latestRefetch } = useRenderDB(getLatestVideos);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await latestRefetch();
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
                <Text className="font-pmedium text-sm text-gray-100">Welcome Back,</Text>
                <Text className="font-pmedium text-2xl text-white">
                  {auth.user?.user_metadata.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image source={images.logoSmall} className="w-9 h-10" resizeMode="contain" />
              </View>
            </View>

            <SearchInput initialQuery="" placeholder="Search for a video topic" />

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
