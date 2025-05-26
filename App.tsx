import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaView, ScrollView, Text, View } from "react-native";
import "./styles/global.css";
import CustomCalendar from "./components/Calendar/CustomCalendar";

export default function App() {
	// Exemplo de eventos/conteúdo customizado para o calendário
	const myCustomEvents = {
		"2025-05-28": {
			customContent: (
				<Text className="text-xs text-purple-600 font-semibold">Reunião</Text>
			),
			marked: true,
			dotColor: "purple",
		},
		"2025-05-30": {
			customContent: <Text className="text-lg">🎉</Text>,
		},
		"2025-06-02": {
			customContent: (
				<Text className="text-[10px] text-center text-blue-700">Evento</Text>
			),
			marked: true,
		},
	};

	return (
		<SafeAreaView className="flex-1 bg-gray-50">
			<ScrollView className="p-4">
				<Text className="text-2xl font-bold mb-6 text-center text-gray-800">
					Meu Calendário Customizado
				</Text>

				<View className="bg-white rounded-lg shadow p-2 mb-4">
					<CustomCalendar
						customEvents={myCustomEvents}
						current={"2025-05-01"}
						theme={{
							calendarBackground: "#ffffff",
							textSectionTitleColor: "#b6c1cd",
							selectedDayBackgroundColor: "#00adf5",
							selectedDayTextColor: "#ffffff",
							todayTextColor: "#00adf5",
							dayTextColor: "#2d4150",
							textDisabledColor: "#d9e1e8",
							dotColor: "#00adf5",
							selectedDotColor: "#ffffff",
							arrowColor: "#3B82F6",
							monthTextColor: "#1F2937",
							textDayFontWeight: "300",
							textMonthFontWeight: "bold",
							textDayHeaderFontWeight: "300",
							textDayFontSize: 16,
							textMonthFontSize: 16,
							textDayHeaderFontSize: 14,
						}}
					/>
				</View>

				<Text className="text-center text-gray-500">
					Calendário funcionando com eventos customizados!
				</Text>
			</ScrollView>
			<StatusBar style="auto" />
		</SafeAreaView>
	);
}
