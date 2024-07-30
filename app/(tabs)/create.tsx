import FormField from '@/components/FormField';
import { ScrollView, Text, TouchableOpacity, View, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller, useWatch } from 'react-hook-form';
import { CreateSchema, createSchema } from '@/lib/schema';
import { ResizeMode, Video } from 'expo-av';
import { icons } from '@/constants';
import CustomButton from '@/components/CustomButton';
import * as DocumentPicker from 'expo-document-picker';
import { useEffect } from 'react';

const Create = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateSchema>({ resolver: zodResolver(createSchema) });

  const formValues = useWatch({ control });

  const onSubmit = async (formData: CreateSchema) => {
    console.log(formData);
  };

  const openPicker = async (selectType: 'Video' | 'Image') => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === 'Image'
          ? ['image/png', 'image/jpeg', 'image/jpg']
          : ['video/mp4', 'video/gif'],
    });

    if (!result.canceled) {
      const file = result.assets[0];
      const fileInfo = {
        uri: file.uri,
        type: file.mimeType ?? '',
        name: file.name,
        size: file.size ?? 0,
      };

      if (selectType === 'Image') setValue('uploadImage', fileInfo);
      if (selectType === 'Video') setValue('uploadVideo', fileInfo);
    } else {
      setTimeout(() => {
        Alert.alert('Document Picked', JSON.stringify(result, null, 2));
      }, 1000);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-2xl text-white font-psemibold">Upload Video</Text>

        <Controller
          control={control}
          name="videoTitle"
          render={({ field: { onBlur, onChange, value } }) => (
            <FormField
              title="Video Title"
              placeholder="Enter video title"
              onBlur={onBlur}
              value={value}
              handleChangeText={onChange}
              otherStyles="mt-7"
            />
          )}
        />

        {errors.videoTitle && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.videoTitle.message}
          </Text>
        )}

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Upload Video</Text>

          <TouchableOpacity onPress={() => openPicker('Video')}>
            {formValues.uploadVideo?.uri ? (
              <Video
                source={{ uri: formValues.uploadVideo.uri }}
                className="w-full h-64 rounded-2xl"
                useNativeControls
                resizeMode={ResizeMode.COVER}
                isLooping
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-14 h-14 border border-dashed border-secondary-100 justify-center items-center">
                  <Image source={icons.upload} resizeMode="contain" className="w-1/2" />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {errors.uploadVideo && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.uploadVideo.message}
            {errors.uploadVideo.size?.message}(e) => console.log(e)
          </Text>
        )}

        <View className="mt-7 space-y-2">
          <Text className="text-base text-gray-100 font-pmedium">Thumbnail Image</Text>

          <TouchableOpacity onPress={() => openPicker('Image')}>
            {formValues.uploadImage?.uri ? (
              <Image
                source={{ uri: formValues.uploadImage.uri }}
                resizeMode="contain"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-16 px-4 bg-black-100 rounded-2xl justify-center items-center flex-row space-x-2">
                <Image source={icons.upload} resizeMode="contain" className="w-5 h-5" />
                <Text className="text-sm text-gray-100 font-pmedium">Choose a file.</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {errors.uploadImage && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.uploadImage?.message}
            {errors.uploadImage?.size?.message}
          </Text>
        )}

        <Controller
          control={control}
          name="aiPrompt"
          render={({ field: { onBlur, onChange, value } }) => (
            <FormField
              title="AI Prompt"
              placeholder="Enter ai prompt"
              onBlur={onBlur}
              value={value}
              handleChangeText={onChange}
              otherStyles="mt-7"
            />
          )}
        />

        {errors.aiPrompt && (
          <Text className="text-sm font-pregular text-red-500 mt-[10px]">
            {errors.aiPrompt.message}
          </Text>
        )}

        <CustomButton
          title="Submit & Publish"
          handPress={handleSubmit(onSubmit)}
          containerStyle="mt-7 w-full"
          textStyle=""
          isLoading={false}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;
