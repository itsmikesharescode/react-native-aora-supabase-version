import { Text, View, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SearchInput from '@/components/SearchInput';
import EmptyState from '@/components/EmptyState';
import { useEffect, useState } from 'react';
import { useRenderDB } from '@/lib/custom_hooks';
import { searchVideos } from '@/lib/business_logic';
import VideoCard from '@/components/VideoCard';
import { useLocalSearchParams } from 'expo-router';

const Search = () => {
  const { query } = useLocalSearchParams();

  const { data, isLoading, refetch } = useRenderDB(() =>
    searchVideos(Array.isArray(query) ? query[0] : (query ?? '')),
  );

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4">
            <Text className="font-pmedium text-sm text-gray-100">Search Results</Text>
            <Text className="font-pmedium text-2xl text-white">{query}</Text>

            <View className="mt-6 mb-8">
              <SearchInput initialQuery="" placeholder="Search for video titles" />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState title="No Videos Found" subtitle="No videos found for this query." />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
