import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppProvider } from "./context-provider/AppProvider.js";
import MainScreen from "./screens/MainScreen";
import LocaisPonteScreen from "./screens/LocaisPonteScreen";
import RelatorioScreen from "./screens/RelatorioScreen";

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <AppProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Pontes de concreto armado com vigas em T">
            <Stack.Screen
              name="Pontes de concreto armado com vigas em T"
              component={MainScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Locais das Medidas na Ponte"
              component={LocaisPonteScreen}
            />
            <Stack.Screen
              name="Adicionar dados do relatório"
              component={RelatorioScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});