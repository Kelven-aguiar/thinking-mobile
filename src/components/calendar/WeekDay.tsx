import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { DateData } from 'react-native-calendars';
import type { Ping } from '../../utils/DataDay';

interface WeekDayProps {
  date: Date;
  dateString: string;
  dayName: string;
  pings?: Ping[];
  isToday?: boolean;
  onPress?: (date: DateData) => void;
}

const WeekDay: React.FC<WeekDayProps> = ({
  date,
  dateString,
  dayName,
  pings = [],
  isToday = false,
  onPress,
}) => {
  const dayNumber = date.getDate();

  // Ordenar pings por timestamp
  const sortedPings = React.useMemo(() => {
    return [...pings].sort((a, b) => a.timestamp - b.timestamp);
  }, [pings]);

  // Calcular posições dos pings na barra vertical
  const pingPositions = React.useMemo(() => {
    const barHeight = 160; // Altura da barra de pings aumentada
    const pingSize = 10;

    return sortedPings.map((ping) => {
      const totalMinutes = ping.hour * 60 + (ping.minute || 0);
      const minutesInDay = 24 * 60;
      const position = (totalMinutes / minutesInDay) * barHeight;

      return {
        ping,
        top: Math.min(position, barHeight - pingSize),
      };
    });
  }, [sortedPings]);

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        minWidth: 56,
        maxWidth: 90,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 6,
        borderRadius: 16,
        backgroundColor: isToday ? '#dbeafe' : 'transparent',
        marginHorizontal: 2,
      }}
      onPress={() => {
        if (onPress) {
          const [year, month, day] = dateString.split('-').map(Number);
          onPress({
            dateString,
            day,
            month,
            year,
            timestamp: date.getTime(),
          });
        }
      }}
      activeOpacity={0.7}
    >
      {/* Nome do dia da semana */}
      <Text
        style={{
          fontSize: 14,
          fontWeight: '700',
          color: isToday ? '#2563eb' : '#6b7280',
          marginBottom: 6,
          textAlign: 'center',
        }}
      >
        {dayName}
      </Text>

      {/* Número do dia */}
      <View
        style={{
          width: '70%',
          aspectRatio: 1,
          minWidth: 36,
          maxWidth: 48,
          borderRadius: 24,
          backgroundColor: isToday ? '#2563eb' : '#f3f4f6',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 10,
          alignSelf: 'center',
        }}
      >
        <Text
          style={{
            fontSize: 18,
            fontWeight: 'bold',
            color: isToday ? '#ffffff' : '#1f2937',
            textAlign: 'center',
          }}
        >
          {dayNumber}
        </Text>
      </View>

      {/* Barra de pings */}
      <View
        style={{
          width: '60%',
          minWidth: 10,
          maxWidth: 18,
          height: 160,
          backgroundColor: '#e5e7eb',
          borderRadius: 9,
          position: 'relative',
          overflow: 'hidden',
          alignSelf: 'center',
        }}
      >
        {pingPositions.map(({ ping, top }) => (
          <View
            key={ping.id}
            style={{
              position: 'absolute',
              width: 12,
              height: 12,
              borderRadius: 6,
              backgroundColor: ping.color,
              top,
              left: '50%',
              marginLeft: -6,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.3,
              shadowRadius: 1,
              elevation: 2,
            }}
          />
        ))}
      </View>

      {/* Contador de pings */}
      {pings.length > 0 && (
        <Text
          style={{
            fontSize: 13,
            color: '#6b7280',
            marginTop: 10,
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          {pings.length} {pings.length === 1 ? 'ping' : 'pings'}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default WeekDay;
