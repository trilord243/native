import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TokenProvider } from "./context/TokenProvider";

import HomeScreen from "./screens/HomeScreen";
import ScanResultScreen from "./screens/ScanResultScreen";

import CreateProductScreen from "./screens/CreateProductScreen";
import Imprimir from "./screens/Imprimir"; // Importa la nueva pantalla

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
          <Stack.Screen name="Imprimir" component={Imprimir} />
        </Stack.Navigator>
      </NavigationContainer>
    </TokenProvider>
  );
}
