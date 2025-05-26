import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { DayProps } from "react-native-calendars/src/calendar/day";
import type { MarkingProps } from "react-native-calendars/src/calendar/day/marking";

interface CustomDayProps {
	date?: {
		dateString: string;
		day: number;
		month: number;
		year: number;
		timestamp: number;
	};
	state?: "disabled" | "today" | "";
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
	const isToday = state === "today";
	const isDisabled = state === "disabled";
	const dayNumber = date ? date.day : "";
	// Estilos base do container do dia
	const containerStyle = [
		{
			flex: 1,
			minHeight: 60,
			alignItems: "center" as const,
			justifyContent: "flex-start" as const,
			borderWidth: 0.5,
			borderColor: "#e5e7eb",
			margin: 0.5,
			paddingVertical: 2,
			paddingHorizontal: 1,
		},
		isToday && { backgroundColor: "#dbeafe" },
		isDisabled && { backgroundColor: "#f3f4f6" },
		marking?.marked && { backgroundColor: "#dcfce7" },
	];
	// Estilos do número do dia
	const dayTextStyle = [
		{
			fontSize: 14,
			fontWeight: "500" as const,
			marginBottom: 2,
		},
		isToday && { color: "#2563eb", fontWeight: "bold" as const },
		isDisabled && { color: "#9ca3af" },
		!isToday && !isDisabled && { color: "#1f2937" },
	];
	return (
		<TouchableOpacity
			style={containerStyle}
			disabled={isDisabled}
			onPress={() => console.log("Dia pressionado:", date?.dateString)}
			activeOpacity={0.7}
		>
			<Text style={dayTextStyle}>{dayNumber}</Text>
			<View
				style={{
					flex: 1,
					alignItems: "center",
					justifyContent: "center",
					width: "100%",
					paddingHorizontal: 2,
				}}
			>
				{customContent ? customContent : <View style={{ minHeight: 20 }} />}
			</View>
		</TouchableOpacity>
	);
};

export default CustomDay;
