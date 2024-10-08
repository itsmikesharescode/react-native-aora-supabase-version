import { View, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import EmptyState from '@/components/EmptyState';
import { useRenderDB } from '@/lib/custom_hooks';
import VideoCard from '@/components/VideoCard';
import { useAuth } from '@/context/AuthProvider';
import { icons } from '@/constants';
import InfoBox from '@/components/InfoBox';
import { router } from 'expo-router';

import getPersonalVideos from '@/lib/backend_calls/getPersonalVideos';
import signOut from '@/lib/backend_calls/signOut';
import { useAuthLoad } from '@/context/AuthLoadProvider';

const Search = () => {
  const auth = useAuth();
  const authLoad = useAuthLoad();

  const { data } = useRenderDB(() => getPersonalVideos(auth.user?.id));

  const logout = async () => {
    await signOut();
    auth.setUser(null);
    authLoad.setAllVideos(null);
    authLoad.setPersonalVideos(null);
    router.replace('/');
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={authLoad.personalVideos}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <VideoCard {...item} />}
        ListHeaderComponent={() => (
          <View className="w-full justify-center items-center mt-6 mb-12 px-4">
            <TouchableOpacity onPress={logout} className="w-full items-end mb-10">
              <Image source={icons.logout} resizeMode="contain" className="w-6 h-6" />
            </TouchableOpacity>
            <View className="w-16 h-16 border border-secondary rounded-lg justify-center items-center">
              <Image />
              {/*  Need to add avatar in user schema */}
            </View>

            <InfoBox
              title={auth.user?.user_metadata.username}
              containerStyles="mt-5"
              titleStyles="text-lg"
            />

            <View className="mt-5 flex-row">
              <InfoBox
                title={String(data.length)}
                subtitle="Post"
                containerStyles="mr-10"
                titleStyles="text-xl"
              />
              <InfoBox title="1.2k" subtitle="Followers" titleStyles="text-xl" />
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
