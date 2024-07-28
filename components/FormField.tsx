import { TouchableOpacity, Text, TextInput, View, Image } from 'react-native';
import type {
  KeyboardTypeOptions,
  TextInputFocusEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { icons } from '../constants';
import { useState } from 'react';

interface FormField {
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: ((text: string) => void) | undefined;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  otherStyles: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

const FormField: React.FC<FormField> = ({
  title,
  value,
  placeholder,
  handleChangeText,
  onBlur,
  otherStyles,
  keyboardType,
  secureTextEntry,
}) => {
  const [showPwd, setShowPwd] = useState(true);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <View>
        <TextInput
          keyboardType={keyboardType}
          onBlur={onBlur}
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={secureTextEntry && showPwd}
        />

        {secureTextEntry && (
          <TouchableOpacity onPress={() => setShowPwd(!showPwd)}>
            <Image
              source={!showPwd ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              className="w-6 h-6"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default FormField;
