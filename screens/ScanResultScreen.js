import React, { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  TextInput,
} from "react-native";
import axios from "axios";
import { Camera, CameraView } from "expo-camera";
import TokenContext from "../context/TokenProvider";

export default function ScanResultScreen() {
  const http = "https://secure-island-46662-cd8fbd3886e4.herokuapp.com";
  const { scannedData, ipScanned } = useContext(TokenContext);

  const [cameraActive, setCameraActive] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(null);

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log(data);
    setScanned(true);
    setLoading(true);
    setCameraActive(false);

    try {
      const response = await axios.post(http + "/consult", {
        codigo: data, // Usar el código escaneado directamente
        fileName: scannedData, // Ajusta el nombre del archivo según tu caso
      });
      console.log(response.data);
      setErrorText("");

      setProductInfo(response.data.item);
    } catch (error) {
      setErrorText("Codigo no encontrado 😿😿");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!productInfo) return;

    setLoading(true);

    try {
      const response = await axios.put(http + "/update", {
        codigo: productInfo.Codigo,
        fileName: scannedData,
        cantidad: Number(quantity), // Enviar la cantidad como número
      });

      console.log("Producto actualizado:", response.data);

      // Limpiar el producto después de actualizar
      setProductInfo(null);
      setQuantity("1"); // Restablecer la cantidad a 1
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{scannedData}</Text>
      {errorText && (
        <Text>
          {" "}
          {errorText} for {error}{" "}
        </Text>
      )}
      {cameraActive && (
        <CameraView
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "pdf417", "ean13", "code39"],
          }}
          style={StyleSheet.absoluteFillObject}
        />
      )}
      {!cameraActive && (
        <Button
          title={"Presiona para escanear un código"}
          onPress={() => {
            setScanned(false);
            setCameraActive(true);
          }}
        />
      )}

      {productInfo && (
        <View>
          <Text style={styles.text}>Código: {productInfo.Codigo}</Text>
          <Text style={styles.text}>
            Descripción: {productInfo.Descripcion}
          </Text>
          <Text style={styles.text}>Existencia: {productInfo.Existencia}</Text>
          <TextInput
            style={styles.input}
            placeholder="Cantidad"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity} // Actualizar la cantidad cuando el usuario escribe
          />

          <Button
            title="Actualizar cantidad"
            onPress={handleUpdateProduct} // Llamar a la función para actualizar el producto
          />
        </View>
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
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
