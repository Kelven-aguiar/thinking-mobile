import { SafeAreaView, View } from 'react-native';
import '../global.css';
import MicrofoneButton from '../src/components/buttons/MicrofoneButton';
import TextButton from '../src/components/buttons/TextButton';
import CalendarWithWeekView from '../src/components/calendar/CalendarWithWeekView';
import { CalendarEventsProvider } from '../src/context/CalendarEventsContext';

export default function App() {
  return (
    <CalendarEventsProvider>
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
          <View className="flex-1 bg-gray-100 justify-center items-center mx-4 mt-4 rounded-lg">
            <CalendarWithWeekView initialMode="week" />
          </View>
          <View className="flex-row items-center justify-center gap-4 py-8">
            <MicrofoneButton onPress={() => console.log('Gravar áudio')} />
            <TextButton onPress={() => console.log('Inserir texto')} />
          </View>
        </View>
      </SafeAreaView>
    </CalendarEventsProvider>
  );
}
