import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";
import type { CalendarProps } from "react-native-calendars";
import CustomDay from "./CustomDay";

// Configuração opcional de localidade para português
LocaleConfig.locales["pt-br"] = {
	monthNames: [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	],
	monthNamesShort: [
		"Jan.",
		"Fev.",
		"Mar.",
		"Abr.",
		"Mai.",
		"Jun.",
		"Jul.",
		"Ago.",
		"Set.",
		"Out.",
		"Nov.",
		"Dez.",
	],
	dayNames: [
		"Domingo",
		"Segunda-feira",
		"Terça-feira",
		"Quarta-feira",
		"Quinta-feira",
		"Sexta-feira",
		"Sábado",
	],
	dayNamesShort: ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SÁB"],
	today: "Hoje",
};
LocaleConfig.defaultLocale = "pt-br";

// Interface para estender as props do Calendar e adicionar as nossas
interface CustomCalendarProps extends CalendarProps {
	// Você pode adicionar props customizadas aqui se necessário
	customEvents?: {
		[date: string]: {
			customContent?: React.ReactNode;
			marked?: boolean;
			dotColor?: string;
			// Adicione outras propriedades de marcação se necessário
		};
	};
}

const CustomCalendar: React.FC<CustomCalendarProps> = ({
	customEvents,
	...rest
}) => {
	// Exemplo de como preparar markedDates com customContent
	const markedDates = { ...customEvents };
	// Adiciona exemplos de conteúdo customizado
	const today = new Date();
	const todayString = today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
	if (!markedDates[todayString]) markedDates[todayString] = {};
	markedDates[todayString].customContent = (
		<View style={{ alignItems: "center", width: "100%" }}>
			<Text style={{ color: "#ef4444", fontSize: 10, fontWeight: "bold" }}>
				Hoje!
			</Text>
		</View>
	);

	// Exemplo com um ícone (requer uma biblioteca de ícones como react-native-vector-icons)
	const tomorrow = new Date();
	tomorrow.setDate(today.getDate() + 1);
	const tomorrowString = tomorrow.toISOString().split("T")[0];
	if (!markedDates[tomorrowString]) markedDates[tomorrowString] = {};
	markedDates[tomorrowString].customContent = (
		<View style={{ alignItems: "center", width: "100%" }}>
			<Text style={{ fontSize: 16 }}>⭐</Text>
		</View>
	);
	markedDates[tomorrowString].marked = true; // Marca o dia

	// Exemplo com um botão compacto
	const dayAfterTomorrow = new Date();
	dayAfterTomorrow.setDate(today.getDate() + 2);
	const dayAfterTomorrowString = dayAfterTomorrow.toISOString().split("T")[0];
	if (!markedDates[dayAfterTomorrowString])
		markedDates[dayAfterTomorrowString] = {};
	markedDates[dayAfterTomorrowString].customContent = (
		<TouchableOpacity
			style={{
				backgroundColor: "#3B82F6",
				paddingVertical: 2,
				paddingHorizontal: 4,
				borderRadius: 4,
				minWidth: "80%",
				alignItems: "center",
			}}
			onPress={() => alert("Evento!")}
		>
			<Text style={{ color: "white", fontSize: 9, fontWeight: "bold" }}>
				Ver
			</Text>
		</TouchableOpacity>
	);
	return (
		<View style={{ width: "100%", paddingHorizontal: 4 }}>
			<Calendar
				// Passa o componente CustomDay para renderizar cada dia
				dayComponent={({ date, state, marking }) => {
					// Busca o conteúdo customizado para esta data específica
					const eventData = markedDates[date?.dateString || ""];
					const dayCustomContent = eventData?.customContent;

					return (
						<CustomDay
							date={date}
							state={state as "" | "disabled" | "today" | undefined}
							marking={marking || eventData} // Passa marcações originais e as customizadas
							customContent={dayCustomContent} // Passa o conteúdo customizado
						/>
					);
				}}
				// Passa as marcações que podem incluir customContent
				markedDates={markedDates}
				// Outras props do react-native-calendars podem ser passadas aqui
				monthFormat={"MMMM yyyy"} // Formato do título do mês
				firstDay={1} // Começa a semana na Segunda (0 para Domingo)
				// Configurações para maximizar largura
				style={{
					width: "100%",
				}}
				// Estilos podem ser customizados via theme prop
				theme={{
					arrowColor: "#3B82F6",
					todayTextColor: "#ef4444",
					monthTextColor: "#1f2937",
					textMonthFontWeight: "bold",
					textDayHeaderFontWeight: "600",
					textDayHeaderFontSize: 14,
					calendarBackground: "transparent",
					textSectionTitleColor: "#374151",
					dayTextColor: "#1f2937",
					textDisabledColor: "#9ca3af",
					// Remove padding/margin extras
					contentStyle: {
						paddingLeft: 0,
						paddingRight: 0,
					},
				}}
				{...rest} // Passa quaisquer outras props recebidas
			/>
		</View>
	);
};

export default CustomCalendar;
