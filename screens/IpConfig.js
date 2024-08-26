import React, { useContext, useState } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import { Camera, CameraView } from "expo-camera";
import TokenContext from "../context/TokenProvider";

export default function IpConfig({ navigation }) {
  const { setIpScanned } = useContext(TokenContext);
  const [scanned, setScanned] = useState(false);
  const [cameraActive, setCameraActive] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setIpScanned(data); // Guardar la IP escaneada en el contexto global
    setCameraActive(false);
    navigation.navigate("Home"); // Navegar al HomeScreen después de escanear
  };

  return (
    <View style={styles.container}>
      {cameraActive && (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}

      {!cameraActive && (
        <Button
          title={"Presiona para escanear la IP"}
          onPress={() => {
            setScanned(false);
            setCameraActive(true);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
