import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import type { DateData } from 'react-native-calendars';
import type { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import type { Ping } from '../../data/DataDay';

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
    pings?: Ping[];
    // Propriedades legadas (deprecated)
    hasPing?: boolean;
    pingColor?: string;
    pingHour?: number;
  };
  onPress?: (date: DateData) => void;
}

const CustomDay: React.FC<CustomDayProps> = ({
  date,
  state,
  marking,
  onPress,
}) => {
  const isToday = state === 'today';
  const isDisabled = state === 'disabled';
  const dayNumber = date ? date.day : '';

  // Otimização: Usar useMemo para processar pings apenas quando necessário
  const pingsToRender = React.useMemo(() => {
    if (!marking?.pings || marking.pings.length === 0) {
      // Compatibilidade com formato antigo
      if (marking?.hasPing) {
        return [
          {
            id: 'legacy',
            color: marking.pingColor || '#ef4444',
            hour: marking.pingHour || 0,
            timestamp: 0,
          },
        ];
      }
      return [];
    }

    // Ordenar pings por timestamp para renderização consistente
    return [...marking.pings].sort((a, b) => a.timestamp - b.timestamp);
  }, [marking?.pings, marking?.hasPing, marking?.pingColor, marking?.pingHour]);

  // Calcular posições dos pings de forma otimizada
  const pingPositions = React.useMemo(() => {
    const containerHeight = 50; // Altura disponível para pings
    const pingSize = 10;
    const maxPingsPerColumn = 5;

    return pingsToRender.map((ping, index) => {
      const totalMinutes = ping.hour * 60 + (ping.minute || 0);
      const minutesInDay = 24 * 60;
      const verticalPosition = (totalMinutes / minutesInDay) * containerHeight;

      // Se houver muitos pings, distribuir em colunas
      const column = Math.floor(index / maxPingsPerColumn);
      const horizontalOffset = column * (pingSize + 2);

      return {
        ping,
        top: Math.min(verticalPosition, containerHeight - pingSize),
        right: horizontalOffset,
      };
    });
  }, [pingsToRender]);

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
      onPress={() => {
        if (date && onPress) {
          onPress(date as DateData);
        }
      }}
      activeOpacity={0.7}
    >
      <View style={{ width: '100%', height: '100%' }}>
        <View style={{ position: 'absolute', top: 0, left: 6, zIndex: 2 }}>
          <Text style={dayTextStyle}>{dayNumber}</Text>
        </View>

        {/* Container de pings otimizado */}
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            width: '100%',
            paddingHorizontal: 2,
            position: 'relative',
          }}
        >
          {pingPositions.length > 0 ? (
            pingPositions.map(({ ping, top, right }) => (
              <View
                key={ping.id}
                style={{
                  position: 'absolute',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  backgroundColor: ping.color,
                  top: 2 + top,
                  right: 2 + right,
                  // Sombra sutil para melhor visualização
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 1 },
                  shadowOpacity: 0.2,
                  shadowRadius: 1.5,
                  elevation: 2,
                }}
              />
            ))
          ) : (
            <View style={{ minHeight: 20 }} />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CustomDay;
