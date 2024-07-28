import { Text, View, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useForm, Controller } from 'react-hook-form';
import CustomButton from '@/components/CustomButton';
import FormField from '@/components/FormField';
import { Link } from 'expo-router';
import { signUpSchema } from '@/lib/schema';
import type { SignUpSchema } from '@/lib/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { images } from '../../constants';

const SignUp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<SignUpSchema>({ resolver: zodResolver(signUpSchema) });

  return (
    <SafeAreaView className="bg-primary h-full ">
      <ScrollView>
        <View className="w-full justify-center h-full px-4 my-6">
          <Image source={images.logo} resizeMode="contain" className="w-[115px] h-[35px]" />
          <Text className="text-white text-2xl text-semibold mt-10 font-psemibold">
            Sign up to Aora
          </Text>

          <Controller
            control={control}
            name="username"
            render={({ field: { value, onBlur, onChange } }) => (
              <FormField
                title="Username"
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Enter username"
              />
            )}
          />

          {errors.username && (
            <Text className="text-sm font-pregular text-red-500 mt-[10px]">
              {errors.username.message}
            </Text>
          )}

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
                placeholder="Enter your email"
                keyboardType="email-address"
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

          <Controller
            control={control}
            name="confirmPwd"
            render={({ field: { value, onBlur, onChange } }) => (
              <FormField
                title="Confirm Password"
                value={value}
                onBlur={onBlur}
                handleChangeText={onChange}
                otherStyles="mt-7"
                placeholder="Confirm your password"
                secureTextEntry={true}
              />
            )}
          />

          {errors.confirmPwd && (
            <Text className="text-sm font-pregular text-red-500 mt-[10px]">
              {errors.confirmPwd.message}
            </Text>
          )}

          <CustomButton
            title="Sign Up"
            handPress={handleSubmit((v) => console.log(v))}
            isLoading={false}
            containerStyle="mt-7"
            textStyle=""
          />

          <View className="justify-center pb-[5vh] pt-5 flex-row gap-2">
            <Text className="text-lg text-gray-100 font-pregular">Already have an account?</Text>
            <Link href="/sign-in" className="text-lg font-psemibold text-secondary">
              Log in here
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
