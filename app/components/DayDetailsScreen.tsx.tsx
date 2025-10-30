import React, { useState } from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCalendarEvents } from '../context/CalendarEventsContext';

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
  const [editingPingId, setEditingPingId] = useState<string | null>(null);
  const [newPingColor, setNewPingColor] = useState('#3b82f6');
  const [newPingHour, setNewPingHour] = useState('');
  const [newPingMinute, setNewPingMinute] = useState('');

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
        metadata: {},
      });
      setNewPingHour('');
      setNewPingMinute('');
      setIsAddingPing(false);
    }
  };

  const handleDeletePing = (pingId: string) => {
    removePing(selectedDate, pingId);
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
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Anotações do Dia</Text>
            <Text style={styles.dateText}>{formatDate(selectedDate)}</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Lista de Pings */}
          <ScrollView style={styles.pingsList}>
            {sortedPings.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>
                  Nenhuma anotação para este dia
                </Text>
              </View>
            ) : (
              sortedPings.map((ping) => (
                <View key={ping.id} style={styles.pingItem}>
                  <View
                    style={[
                      styles.pingColorIndicator,
                      { backgroundColor: ping.color },
                    ]}
                  />
                  <View style={styles.pingContent}>
                    <Text style={styles.pingTime}>
                      {String(ping.hour).padStart(2, '0')}:
                      {String(ping.minute || 0).padStart(2, '0')}
                    </Text>
                    {ping.annotation && (
                      <Text style={styles.pingAnnotation}>
                        {ping.annotation}
                      </Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => handleDeletePing(ping.id)}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))
            )}
          </ScrollView>

          {/* Formulário de Adicionar Ping */}
          {isAddingPing ? (
            <View style={styles.addPingForm}>
              <Text style={styles.formTitle}>Nova Anotação</Text>

              {/* Seletor de Cor */}
              <View style={styles.colorSelector}>
                {predefinedColors.map((colorOption) => (
                  <TouchableOpacity
                    key={colorOption.color}
                    style={[
                      styles.colorOption,
                      { backgroundColor: colorOption.color },
                      newPingColor === colorOption.color &&
                        styles.colorOptionSelected,
                    ]}
                    onPress={() => setNewPingColor(colorOption.color)}
                  />
                ))}
              </View>

              {/* Input de Hora */}
              <View style={styles.timeInputContainer}>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Hora (0-23)"
                  keyboardType="numeric"
                  value={newPingHour}
                  onChangeText={setNewPingHour}
                  maxLength={2}
                />
                <Text style={styles.timeSeparator}>:</Text>
                <TextInput
                  style={styles.timeInput}
                  placeholder="Min (0-59)"
                  keyboardType="numeric"
                  value={newPingMinute}
                  onChangeText={setNewPingMinute}
                  maxLength={2}
                />
              </View>

              {/* Botões */}
              <View style={styles.formButtons}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={() => {
                    setIsAddingPing(false);
                    setNewPingHour('');
                    setNewPingMinute('');
                  }}
                >
                  <Text style={styles.cancelButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.saveButton]}
                  onPress={handleAddPing}
                >
                  <Text style={styles.saveButtonText}>Salvar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => setIsAddingPing(true)}
            >
              <Text style={styles.addButtonText}>+ Adicionar Anotação</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  pingAnnotation: {
    fontSize: 15,
    color: '#374151',
    marginTop: 4,
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  dateText: {
    fontSize: 16,
    color: '#6b7280',
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: 8,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#6b7280',
  },
  pingsList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
    textAlign: 'center',
  },
  pingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  pingColorIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  pingContent: {
    flex: 1,
  },
  pingTime: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
  },
  deleteButton: {
    padding: 8,
  },
  deleteButtonText: {
    fontSize: 20,
  },
  addButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  addPingForm: {
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    padding: 16,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 16,
  },
  colorSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionSelected: {
    borderColor: '#1f2937',
    borderWidth: 3,
  },
  timeInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  timeInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    width: 80,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  timeSeparator: {
    fontSize: 24,
    fontWeight: 'bold',
    marginHorizontal: 8,
    color: '#1f2937',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#3b82f6',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});

export default DayDetailsScreen;
