import { Type } from 'lucide-react-native';
import { Pressable } from 'react-native';

interface TextButtonProps {
  onPress?: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-500 p-6 rounded-full items-center justify-center shadow-lg active:bg-blue-600"
    >
      <Type size={32} color="white" />
    </Pressable>
  );
};

export default TextButton;
