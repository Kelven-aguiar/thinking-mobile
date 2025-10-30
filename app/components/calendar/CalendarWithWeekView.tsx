import React, { useRef, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import type { DateData } from 'react-native-calendars';
import DayDetailsScreen from '../DayDetailsScreen.tsx';
import CustomCalendar from './CustomCalendar';
import WeekView from './WeekView';

type ViewMode = 'month' | 'week';

interface CalendarWithWeekViewProps {
  initialMode?: ViewMode;
}

const CalendarWithWeekView: React.FC<CalendarWithWeekViewProps> = ({
  initialMode = 'month',
}) => {
  const [viewMode, setViewMode] = useState<ViewMode>(initialMode);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [renderedMode, setRenderedMode] = useState<ViewMode>(initialMode);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const handleDayPress = (date: DateData) => {
    console.log('Dia selecionado:', date.dateString);
    setSelectedDate(date.dateString);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  // Função para animar a transição
  const animateTransition = (nextMode: ViewMode) => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setRenderedMode(nextMode);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 180,
        useNativeDriver: true,
      }).start();
    });
  };

  // Troca de visualização com animação
  const handleSwitch = (mode: ViewMode) => {
    if (mode !== viewMode) {
      setViewMode(mode);
      animateTransition(mode);
    }
  };

  return (
    <View style={{ flex: 1, width: '100%' }}>
      {/* Toggle entre visualizações */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 16,
          paddingHorizontal: 16,
          gap: 8,
        }}
      >
        <TouchableOpacity
          onPress={() => handleSwitch('month')}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: viewMode === 'month' ? '#3b82f6' : '#f3f4f6',
            alignItems: 'center',
          }}
          activeOpacity={0.7}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: viewMode === 'month' ? '#ffffff' : '#6b7280',
            }}
          >
            Mês
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleSwitch('week')}
          style={{
            flex: 1,
            paddingVertical: 12,
            paddingHorizontal: 16,
            borderRadius: 8,
            backgroundColor: viewMode === 'week' ? '#3b82f6' : '#f3f4f6',
            alignItems: 'center',
          }}
          activeOpacity={0.7}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: viewMode === 'week' ? '#ffffff' : '#6b7280',
            }}
          >
            Semana
          </Text>
        </TouchableOpacity>
      </View>

      {/* Renderizar visualização atual com fade */}
      <Animated.View style={{ flex: 1, opacity: fadeAnim }}>
        {renderedMode === 'month' ? (
          <CustomCalendar onDayPress={handleDayPress} />
        ) : (
          <WeekView onDayPress={handleDayPress} />
        )}
      </Animated.View>

      {/* Modal de detalhes do dia */}
      {selectedDate && (
        <DayDetailsScreen
          selectedDate={selectedDate}
          visible={modalVisible}
          onClose={handleCloseModal}
        />
      )}
    </View>
  );
};

export default CalendarWithWeekView;
