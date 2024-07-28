import { StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Redirect, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../constants';
import CustomButton from '@/components/CustomButton';

const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="w-full justify-center items-center h-full px-4">
          <Image source={images.logo} className="w-[130px] h-[84px] " resizeMode="contain" />

          <Image source={images.cards} className="max-w-[380px] w-full h-[300px]" />

          <View className="relative mt-5">
            <Text className="text-3xl font-bold text-center text-white">
              Discover Endless Possibilities with{' '}
              <Text className="font-pbold text-secondary-200">Aora</Text>
            </Text>

            <Image
              source={images.path}
              className="w-[136px] h-[15px] absolute -bottom-2 right-16"
              resizeMode="contain"
            />
          </View>

          <Text className="text-sm font-pregular text-gray-100 mt-7 text-center">
            Where creativity meets innovations: embark on a journey of limitless exploration with
            Aora
          </Text>

          <CustomButton
            title="Sign In"
            handPress={() => router.push('/sign-in')}
            containerStyle="mt-7 w-full"
            isLoading={false}
            textStyle=""
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light" />
    </SafeAreaView>
  );
};

export default App;
