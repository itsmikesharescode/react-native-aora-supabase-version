import { TouchableOpacity, Text } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

interface CustomBotton {
  title: string;
  handPress?: (event: GestureResponderEvent) => void;
  containerStyle: string;
  textStyle: string;
  isLoading: boolean;
}

const CustomButton: React.FC<CustomBotton> = ({
  title,
  handPress,
  containerStyle,
  textStyle,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={isLoading}
      onPress={handPress}
      className={`bg-secondary rounded-xl min-h-[62px] justify-center items-center ${containerStyle} ${isLoading ? 'opacity-50' : ''}`}
    >
      <Text className={`text-primary font-psemibold text-lg ${textStyle}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
