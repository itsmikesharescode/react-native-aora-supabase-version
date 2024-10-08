import { TouchableOpacity, Text } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

interface CustomBotton {
  title: string;
  handPress: (event: GestureResponderEvent) => void;
  containerStyle: string;
  textStyle?: string;
  isLoading: boolean;
  disabled?: boolean;
}

const CustomButton: React.FC<CustomBotton> = ({
  title,
  handPress,
  containerStyle,
  textStyle,
  isLoading,
  disabled,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading || disabled}
      onPress={handPress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>
        {isLoading ? 'Please wait...' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
