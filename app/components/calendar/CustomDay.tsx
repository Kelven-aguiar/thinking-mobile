import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';

interface CustomDayProps {
  date?: {
    dateString: string;
    day: number;
    month: number;
    year: number;
    timestamp: number;
  };
  state?: 'disabled' | 'today' | '';
  marking?: MarkingProps & {
    marked?: boolean;
    dotColor?: string;
    customContent?: React.ReactNode;
  };
  customContent?: React.ReactNode;
}

const CustomDay: React.FC<CustomDayProps> = ({
  date,
  state,
  marking,
  customContent,
}) => {
  const isToday = state === 'today';
  const isDisabled = state === 'disabled';
  const dayNumber = date ? date.day : '';

  const containerStyle = [
    {
      flex: 1,
      minHeight: 80,
      minWidth: 80,
      alignItems: 'center' as const,
      justifyContent: 'flex-start' as const,
      borderWidth: 0.5,
      borderColor: '#e5e7eb',
      margin: 1,
      paddingVertical: 3,
      paddingHorizontal: 1,
      borderRadius: 8,
    },
    isToday && { backgroundColor: '#dbeafe' },
    isDisabled && { backgroundColor: '#f3f4f6' },
    marking?.marked && { backgroundColor: '#dcfce7' },
  ];
  // Estilos do número do dia
  const dayTextStyle = [
    {
      fontSize: 14,
      fontWeight: '500' as const,
      marginBottom: 2,
    },
    isToday && { color: '#2563eb', fontWeight: 'bold' as const },
    isDisabled && { color: '#9ca3af' },
    !isToday && !isDisabled && { color: '#1f2937' },
  ];
  return (
    <TouchableOpacity
      style={containerStyle}
      disabled={isDisabled}
      onPress={() => console.log('Dia pressionado:', date?.dateString)}
      activeOpacity={0.7}
    >
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ position: 'absolute', top: 0, left: 6, zIndex: 2 }}>
          <Text style={dayTextStyle}>{dayNumber}</Text>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            paddingHorizontal: 2,
          }}
        >
          {customContent ? customContent : <View style={{ minHeight: 20 }} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDay;
