import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TokenProvider } from "./context/TokenProvider";

import HomeScreen from "./screens/HomeScreen";
import ScanResultScreen from "./screens/ScanResultScreen";

import CreateProductScreen from "./screens/CreateProductScreen"; // Importa la nueva pantalla

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TokenProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">

          <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen
                name="CreateProductScreen"
                component={CreateProductScreen}
                options={{ title: "Crear Producto" }}
            />
          <Stack.Screen name="Scan" component={ScanResultScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </TokenProvider>
  );
}
