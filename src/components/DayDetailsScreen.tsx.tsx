import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCalendarEvents } from '../../src/context/CalendarEventsContext';

interface DayDetailsScreenProps {
  selectedDate: string; // formato: 'YYYY-MM-DD'
  visible: boolean;
  onClose: () => void;
}

const DayDetailsScreen: React.FC<DayDetailsScreenProps> = ({
  selectedDate,
  visible,
  onClose,
}) => {
  const { getPings, addPing, removePing, updatePing } = useCalendarEvents();
  const [isAddingPing, setIsAddingPing] = useState(false);
  const [newPingColor, setNewPingColor] = useState('#3b82f6');
  const [newPingHour, setNewPingHour] = useState('');
  const [newPingMinute, setNewPingMinute] = useState('');
  const [newPingAnnotation, setNewPingAnnotation] = useState('');

  // Estado para altura dinâmica dos TextInputs de cada ping
  const [pingInputHeights, setPingInputHeights] = useState<
    Record<string, number>
  >({});
  // Estado para altura dinâmica do input de nova anotação
  const [newPingAnnotationHeight, setNewPingAnnotationHeight] =
    useState<number>(0);

  const pings = getPings(selectedDate);
  const sortedPings = [...pings].sort((a, b) => a.timestamp - b.timestamp);

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  };

  const handleAddPing = () => {
    const hour = Number.parseInt(newPingHour, 10);
    const minute = newPingMinute ? Number.parseInt(newPingMinute, 10) : 0;

    if (hour >= 0 && hour <= 23 && minute >= 0 && minute <= 59) {
      addPing(selectedDate, {
        color: newPingColor,
        hour,
        minute,
        annotation: newPingAnnotation,
        metadata: {},
      });
      setNewPingHour('');
      setNewPingMinute('');
      setNewPingAnnotation('');
      setIsAddingPing(false);
    }
  };

  const handleDeletePing = (pingId: string) => {
    removePing(selectedDate, pingId);
  };

  const handleUpdateAnnotation = (pingId: string, annotation: string) => {
    updatePing(selectedDate, pingId, { annotation });
  };

  const predefinedColors = [
    { color: '#ef4444', name: 'Vermelho' },
    { color: '#f59e0b', name: 'Laranja' },
    { color: '#eab308', name: 'Amarelo' },
    { color: '#22c55e', name: 'Verde' },
    { color: '#3b82f6', name: 'Azul' },
    { color: '#8b5cf6', name: 'Roxo' },
    { color: '#ec4899', name: 'Rosa' },
  ];

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={false}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-white">
        {/* Header */}
        <View className="pt-2 pb-5 px-5 bg-gray-50 border-b border-gray-200">
          <View className="flex-row items-center justify-between">
            <View className="flex-1 items-center">
              <Text className="text-lg text-gray-600">
                {formatDate(selectedDate)}
              </Text>
            </View>
            <TouchableOpacity className="ml-3" onPress={onClose}>
              <Text className="text-base text-blue-600 font-semibold">
                ← Voltar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Lista de Pings */}
        <ScrollView className="flex-1 px-5 pt-5">
          {sortedPings.length === 0 ? (
            <View className="py-10 items-center">
              <Text className="text-base text-gray-400 text-center">
                Nenhuma anotação para este dia
              </Text>
            </View>
          ) : (
            sortedPings.map((ping) => (
              <View
                key={ping.id}
                className="flex flex-col bg-gray-50 rounded-xl p-4 mb-3"
              >
                <View className="flex-row items-center">
                  <View
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: ping.color }}
                  />
                  <Text className="text-lg font-semibold text-gray-800">
                    {String(ping.hour).padStart(2, '0')}:
                    {String(ping.minute || 0).padStart(2, '0')}
                  </Text>
                  <TouchableOpacity
                    className="ml-auto p-2"
                    onPress={() => handleDeletePing(ping.id)}
                  >
                    <Text className="text-xl">🗑️</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  className="bg-white rounded-lg p-3 text-base text-gray-800 border border-gray-200 mt-2"
                  style={{
                    minHeight: 40,
                    height: Math.max(40, pingInputHeights[ping.id] || 40),
                  }}
                  placeholder="Escreva seu pensamento aqui..."
                  placeholderTextColor="#9ca3af"
                  multiline
                  scrollEnabled={false}
                  value={ping.annotation || ''}
                  onChangeText={(text) => handleUpdateAnnotation(ping.id, text)}
                  onContentSizeChange={(e) => {
                    const height = e.nativeEvent.contentSize.height;
                    setPingInputHeights((prev) => ({
                      ...prev,
                      [ping.id]: height,
                    }));
                  }}
                  textAlignVertical="top"
                />
              </View>
            ))
          )}
        </ScrollView>

        {/* Formulário de Adicionar Ping */}
        {isAddingPing ? (
          <View className="bg-gray-50 rounded-xl p-4 mx-5 mb-5">
            <Text className="text-lg font-semibold text-gray-800 mb-4">
              Nova Anotação
            </Text>

            {/* Seletor de Cor */}
            <View className="flex-row justify-between mb-4">
              {predefinedColors.map((colorOption) => (
                <TouchableOpacity
                  key={colorOption.color}
                  className={`w-10 h-10 rounded-full border-2 ${newPingColor === colorOption.color ? 'border-gray-800' : 'border-transparent'}`}
                  style={{ backgroundColor: colorOption.color }}
                  onPress={() => setNewPingColor(colorOption.color)}
                />
              ))}
            </View>

            {/* Input de Hora */}
            <View className="flex-row items-center justify-center mb-4">
              <TextInput
                className="bg-white rounded-lg p-3 text-lg w-20 text-center border border-gray-200"
                placeholder="Hora (0-23)"
                keyboardType="numeric"
                value={newPingHour}
                onChangeText={setNewPingHour}
                maxLength={2}
              />
              <Text className="text-2xl font-bold mx-2 text-gray-800">:</Text>
              <TextInput
                className="bg-white rounded-lg p-3 text-lg w-20 text-center border border-gray-200"
                placeholder="Min (0-59)"
                keyboardType="numeric"
                value={newPingMinute}
                onChangeText={setNewPingMinute}
                maxLength={2}
              />
            </View>

            {/* Input de Anotação */}
            <TextInput
              className="bg-white rounded-lg p-3 text-base text-gray-800 border border-gray-200 min-h-[100px] mt-2"
              placeholder="Escreva seu pensamento aqui..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              value={newPingAnnotation}
              onChangeText={setNewPingAnnotation}
              textAlignVertical="top"
            />

            {/* Botões */}
            <View className="flex-row gap-3 mt-4">
              <TouchableOpacity
                className="flex-1 rounded-lg p-3 items-center bg-white border border-gray-200"
                onPress={() => {
                  setIsAddingPing(false);
                  setNewPingHour('');
                  setNewPingMinute('');
                  setNewPingAnnotation('');
                }}
              >
                <Text className="text-gray-500 font-semibold">Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="flex-1 rounded-lg p-3 items-center bg-blue-600"
                onPress={handleAddPing}
              >
                <Text className="text-white font-semibold">Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity
            className="bg-blue-600 rounded-xl p-4 items-center mx-5 mb-5"
            onPress={() => setIsAddingPing(true)}
          >
            <Text className="text-white text-lg font-semibold">
              + Adicionar Anotação
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};

export default DayDetailsScreen;
