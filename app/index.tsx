import { SafeAreaView, View } from 'react-native';
import '../global.css';
import CustomCalendar from './components/calendar/CustomCalendar';
import MicrofoneButton from './components/MicrofoneButton';
import { CalendarEventsProvider } from './context/CalendarEventsContext';

export default function App() {
  return (
    <CalendarEventsProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
          <View className="flex-1 bg-gray-100 justify-center items-center mx-4 mt-4 rounded-lg">
            <CustomCalendar />
          </View>
          <View className="items-center py-8">
            <MicrofoneButton onPress={() => console.log('Gravar áudio')} />
          </View>
        </View>
      </SafeAreaView>
    </CalendarEventsProvider>
  );
}
