import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import type { DateData } from 'react-native-calendars';
import { useCalendarEvents } from '../../../src/context/CalendarEventsContext';
import WeekDay from './WeekDay';

interface WeekViewProps {
  initialDate?: Date;
  onDayPress?: (date: DateData) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  initialDate = new Date(),
  onDayPress,
}) => {
  const { getPings } = useCalendarEvents();
  const [currentDate, setCurrentDate] = useState(initialDate);

  // Nomes dos dias da semana abreviados
  const dayNames = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'];

  // Calcular os dias da semana atual
  const weekDays = useMemo(() => {
    const days = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Encontrar o primeiro dia da semana (domingo)
    const startOfWeek = new Date(currentDate);
    const dayOfWeek = startOfWeek.getDay();
    startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);
    startOfWeek.setHours(0, 0, 0, 0);

    // Gerar os 7 dias da semana
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      date.setHours(0, 0, 0, 0);

      const dateString = date.toISOString().split('T')[0];
      const pings = getPings(dateString);
      const isToday = date.getTime() === today.getTime();

      days.push({
        date,
        dateString,
        dayName: dayNames[i],
        pings,
        isToday,
      });
    }

    return days;
  }, [currentDate, getPings]);

  // Navegar para semana anterior
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  // Navegar para próxima semana
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Voltar para semana atual
  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Formatar o período da semana
  const weekPeriod = useMemo(() => {
    const firstDay = weekDays[0].date;
    const lastDay = weekDays[6].date;

    const formatDate = (date: Date) => {
      const months = [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez',
      ];
      return `${date.getDate()} ${months[date.getMonth()]}`;
    };

    return `${formatDate(firstDay)} - ${formatDate(lastDay)}`;
  }, [weekDays]);

  return (
    <View style={{ width: '100%', paddingHorizontal: 16 }}>
      {/* Header com navegação */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16,
          paddingHorizontal: 8,
        }}
      >
        <TouchableOpacity
          onPress={goToPreviousWeek}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: '#f3f4f6',
          }}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#374151' }}>
            ‹
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: 'bold',
              color: '#1f2937',
              marginBottom: 2,
            }}
          >
            {weekPeriod}
          </Text>
          <TouchableOpacity
            onPress={goToToday}
            activeOpacity={0.7}
          ></TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={goToNextWeek}
          style={{
            padding: 8,
            borderRadius: 8,
            backgroundColor: '#f3f4f6',
          }}
          activeOpacity={0.7}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#374151' }}>
            ›
          </Text>
        </TouchableOpacity>
      </View>

      {/* Grid da semana */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          paddingHorizontal: 4,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            gap: 9,
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
        >
          {weekDays.map((day) => (
            <WeekDay
              key={day.dateString}
              date={day.date}
              dateString={day.dateString}
              dayName={day.dayName}
              pings={day.pings}
              isToday={day.isToday}
              onPress={onDayPress}
            />
          ))}
        </View>
      </ScrollView>

      {/* Resumo da semana */}
      <View
        style={{
          marginTop: 16,
          padding: 12,
          backgroundColor: '#f9fafb',
          borderRadius: 8,
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}
      >
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
            {weekDays.reduce((sum, day) => sum + day.pings.length, 0)}
          </Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Total de pings</Text>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#1f2937' }}>
            {weekDays.filter((day) => day.pings.length > 0).length}
          </Text>
          <Text style={{ fontSize: 12, color: '#6b7280' }}>Dias com pings</Text>
        </View>
      </View>
    </View>
  );
};

export default WeekView;
