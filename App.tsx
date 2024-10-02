import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ProductConfiguratorContext } from './ProductConfiguratorContext'
import HomeScreen from './src/screens/HomeScreen'
import { Provider } from 'react-redux'
import { store } from './src/core/store'
import { PaperProvider } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import PreviewConfiguredProduct from './src/screens/PreviewConfiguredProduct'

const Stack = createNativeStackNavigator();

const App = () => {
	const [theme, setTheme] = useState<"light" | "dark">("light")

	return (
		<ProductConfiguratorContext.Provider
			value={theme}
		>
			<Provider store={store}>
				<PaperProvider>
					<NavigationContainer>
						<Stack.Navigator screenOptions={{
							title: "Product Configurator Project",
						}}>
							<Stack.Screen
								name="HomeScreen"
								component={HomeScreen}
								options={{
									title: "Configure your product",
								}}
							/>
							<Stack.Screen
								name="PreviewScreen"
								component={PreviewConfiguredProduct}
								options={{
									title: "Summary",
								}}
							/>
						</Stack.Navigator>
					</NavigationContainer>
				</PaperProvider>
			</Provider>
		</ProductConfiguratorContext.Provider>
	)
}

export default App

const styles = StyleSheet.create({})