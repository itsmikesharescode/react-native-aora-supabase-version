import VideoCard from '@/components/VideoCard';
import { useAuthLoad } from '@/context/AuthLoadProvider';
import { useAuth } from '@/context/AuthProvider';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BookMark = () => {
  const auth = useAuth();
  const authLoad = useAuthLoad();

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="p-[15px]">
        <Text className="font-pmedium text-2xl text-gray-100">Bookmarks</Text>
      </View>
      <FlatList
        data={authLoad.bookmarks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListEmptyComponent={() => (
          <View className="p-[15px]">
            <Text className="font-pregular text-gray-100 text-base ">You have no bookmarks.</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default BookMark;
