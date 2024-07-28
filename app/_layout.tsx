import { Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-xl font-semibold text-red-500">Hello World</Text>
    </View>
  );
};

export default RootLayout;
