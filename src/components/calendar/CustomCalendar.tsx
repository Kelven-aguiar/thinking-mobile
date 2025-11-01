import React from 'react';
import { View } from 'react-native';
import type { CalendarProps, DateData } from 'react-native-calendars';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useCalendarEvents } from '../../../src/context/CalendarEventsContext';
import CustomDay from './CustomDay';

// Configuração opcional de localidade para português
LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ],
  monthNamesShort: [
    'Jan.',
    'Fev.',
    'Mar.',
    'Abr.',
    'Mai.',
    'Jun.',
    'Jul.',
    'Ago.',
    'Set.',
    'Out.',
    'Nov.',
    'Dez.',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
  today: 'Hoje',
};
LocaleConfig.defaultLocale = 'pt-br';

interface CustomCalendarProps extends CalendarProps {
  onDayPress?: (date: DateData) => void;
}
// Removido customEvents das props, pois agora será gerado internamente
const CustomCalendar: React.FC<CustomCalendarProps> = ({
  onDayPress,
  ...rest
}) => {
  // Consumir dados do contexto
  const { events } = useCalendarEvents();

  return (
    <View style={{ width: '100%', paddingHorizontal: 4 }}>
      <Calendar
        dayComponent={({ date, state, marking }) => {
          const eventData = events[date?.dateString || ''];
          return (
            <CustomDay
              date={date}
              state={state as '' | 'disabled' | 'today' | undefined}
              marking={marking || eventData}
              onPress={onDayPress}
            />
          );
        }}
        markedDates={events}
        monthFormat={'MMMM yyyy'}
        firstDay={1}
        style={{ width: '100%' }}
        theme={{
          arrowColor: '#3B82F6',
          todayTextColor: '#ef4444',
          monthTextColor: '#1f2937',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayHeaderFontSize: 14,
          calendarBackground: 'transparent',
          textSectionTitleColor: '#374151',
          dayTextColor: '#1f2937',
          textDisabledColor: '#9ca3af',
          contentStyle: {
            paddingLeft: 0,
            paddingRight: 0,
          },
        }}
        {...rest}
      />
    </View>
  );
};

export default CustomCalendar;
