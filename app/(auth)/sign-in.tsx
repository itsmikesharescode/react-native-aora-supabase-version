import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';
import FormField from '@/components/FormField';
import CustomButton from '@/components/CustomButton';
import { Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { signInSchema } from '@/lib/types';
import type { SignInSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';

const SignIn = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInSchema>({ resolver: zodResolver(signInSchema) });

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView className="mt-[10vh]">
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
            Log in to Aora
          </Text>
        </View>

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
          handPress={handleSubmit((v) => console.log(v))}
          containerStyle="mt-7"
          isLoading={false}
          textStyle=""
        />

        <View className="justify-center pt-5 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">Don't have an account?</Text>
          <Link href="/sign-up" className="text-lg font-psemibold text-secondary">
            Sign Up Free
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
