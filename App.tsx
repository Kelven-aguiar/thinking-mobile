import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import './styles/global.css';

export default function App() {
	return (
		<View className="flex-1 bg-blue-500 justify-center items-center px-4">
			<Text className="text-white text-2xl font-bold text-center mb-4">
				Tailwind CSS está funcionando!
			</Text>
			<Text className="text-blue-100 text-lg text-center mb-8">
				Open up App.tsx to start working on your app!
			</Text>
			<View className="bg-white rounded-lg p-6 shadow-lg">
				<Text className="text-gray-800 text-base text-center">
					Este é um card com Tailwind CSS
				</Text>
			</View>
			<StatusBar style="light" />
		</View>
	);
}
