import { useState } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  KeyboardTypeOptions,
  Alert,
} from 'react-native';

import { icons } from '../constants';
import { router, usePathname } from 'expo-router';

interface SearchInput {
  value: string;
  placeholder: string;
  handleChangeText?: ((text: string) => void) | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const SearchInput: React.FC<SearchInput> = ({
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  onBlur,
  keyboardType,
}) => {
  const pathName = usePathname();
  const [query, setQuery] = useState('');

  return (
    <View className="w-full space-x-4 flex-row h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center">
      <TextInput
        keyboardType={keyboardType}
        onBlur={onBlur}
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={query}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onChangeText={(e) => setQuery(e)}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert(
              'Missing Query',
              'Please input something to search results across database.',
            );

          if (pathName.startsWith('/search')) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
