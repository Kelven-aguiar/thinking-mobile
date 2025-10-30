import { Mic } from 'lucide-react-native';
import { Pressable } from 'react-native';

interface MicrofoneButtonProps {
  onPress?: () => void;
}

const MicrofoneButton: React.FC<MicrofoneButtonProps> = ({ onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      className="bg-red-500 p-6 rounded-full items-center justify-center shadow-lg active:bg-red-600"
    >
      <Mic size={32} color="white" />
    </Pressable>
  );
};

export default MicrofoneButton;
