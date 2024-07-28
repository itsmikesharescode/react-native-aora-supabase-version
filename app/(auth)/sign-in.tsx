import { Text, View, ScrollView, Image, AppState } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link, router } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { signInSchema } from '@/lib/schema';
import type { SignInSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({ resolver: zodResolver(signInSchema) });

  const onSubmit = async (formData: SignInSchema) => {
    setErrMsg('');
    setLoading(true);
    const {
      data: { user },
      error,
    } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    });

    if (error) setErrMsg(error.message);
    else if (user) {
      router.replace('/home');
    }
    setLoading(false);
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="mt-[10vh]">
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>

          <Controller
            control={control}
            name="email"
            render={({ field: { value, onBlur, onChange } }) => (
              <FormField
                title="Email"
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
                otherStyles="mt-7"
                keyboardType="email-address"
                placeholder="Enter your email"
              />
            )}
          />

          {errors.email && (
            <Text className="text-sm font-pregular text-red-500 mt-[10px]">
              {errors.email.message}
            </Text>
          )}

          <Controller
            control={control}
            name="password"
            render={({ field: { value, onBlur, onChange } }) => (
              <FormField
                title="Password"
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Enter your password"
                secureTextEntry={true}
              />
            )}
          />

          {errors.password && (
            <Text className="text-sm font-pregular text-red-500 mt-[10px]">
              {errors.password.message}
            </Text>
          )}

          <CustomButton
            title="Sign In"
            handPress={handleSubmit(onSubmit)}
            containerStyle="mt-7"
            isLoading={loading}
            textStyle=""
          />

          <View className="justify-center pt-5 gap-2 flex-col">
            <View className="justify-center flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
              <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
                Sign Up Free
              </Link>
            </View>

            <Text className="font-pregular text-sm text-red-500 text-center">{errMsg}</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
