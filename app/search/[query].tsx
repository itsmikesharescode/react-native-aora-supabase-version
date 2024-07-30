import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const Search = () => {
  const { query } = useLocalSearchParams();
  //tutorial stops at 3:11:13
  return (
    <SafeAreaView className="bg-primary h-full">
      <Text className="text-3xl text-white">{query}</Text>
    </SafeAreaView>
  );
};

export default Search;
