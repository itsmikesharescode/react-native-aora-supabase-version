import { StyleSheet, Text, View, Image } from 'react-native';
import { images } from '@/constants';
import CustomButton from './CustomButton';
import { router } from 'expo-router';

interface EmptyState {
  title: string;
  subtitle: string;
}

const EmptyState: React.FC<EmptyState> = ({ title, subtitle }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image source={images.empty} className="w-[270px] h-[215px]" />
      <Text className="text-xl text-center font-pmedium text-white mt-2">{title}</Text>

      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>

      <CustomButton
        title="Create Video"
        handPress={() => router.push('/create')}
        containerStyle="w-full my-5"
        isLoading={false}
        textStyle=""
      />
    </View>
  );
};

export default EmptyState;

const styles = StyleSheet.create({});
