import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator, // Importar ActivityIndicator
  TextInput,
} from "react-native";
import axios from "axios";
import { CameraView } from "expo-camera";
import TokenContext from "../context/TokenProvider";
import { useNavigation } from "@react-navigation/native"; // Usar el hook de navegación
import { Picker } from '@react-native-picker/picker';

export default function ScanResultScreen() {

  const http = "https://secure-island-46662-cd8fbd3886e4.herokuapp.com";
  const { scannedData, ipScanned } = useContext(TokenContext);

  const [cameraActive, setCameraActive] = useState(false);
  const [productInfo, setProductInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [categoria, setCategoria] = useState("N/A");
  const [seleccion, setSeleccion] = useState("");
  const [errorText, setErrorText] = useState("");
  const [error, setError] = useState(null);

  const navigation = useNavigation(); // Hook para navegación

  const handleBarCodeScanned = async ({ type, data }) => {
    console.log(data);
    setScanned(true);
    setLoading(true); // Mostrar el loader
    setCameraActive(false);

    try {
      const response = await axios.post(http + "/consult", {
        codigo: data,
        fileName: scannedData,
      });
      console.log(response.data);
      setErrorText("");

      setProductInfo(response.data.item);
      setCategoria(response.data.item.Categoria || "N/A");
      setSeleccion(response.data.item.Seleccion || "");
    } catch (error) {
      setErrorText("Código no encontrado 😿");
      console.log(error);
    } finally {
      setLoading(false); // Ocultar el loader
    }
  };

  const handleUpdateProduct = async () => {
    if (!productInfo) return;

    setLoading(true); // Mostrar el loader

    try {
      const responseQuantity = await axios.put(http + "/update", {
        codigo: productInfo.Codigo,
        fileName: scannedData,
        cantidad: Number(quantity),
      });

      const responseCategory = await axios.put(http + "/update-category", {
        codigo: productInfo.Codigo,
        fileName: scannedData,
        categoria,
      });

      const responseSelection = await axios.put(http + "/update-selection", {
        codigo: productInfo.Codigo,
        fileName: scannedData,
        seleccion,
      });

      console.log("Producto actualizado:", responseQuantity.data, responseCategory.data, responseSelection.data);

      // Limpiar los campos
      setProductInfo(null);
      setQuantity("1");
      setCategoria("N/A");
      setSeleccion("");
    } catch (error) {
      console.error("Error actualizando producto:", error);
    } finally {
      setLoading(false); // Ocultar el loader
    }
  };

  return (
      <View style={styles.container}>
        {/* Mostrar el loader mientras loading es true */}
        {loading ? (
            <ActivityIndicator size="large" color="#0000ff" /> // Loader visible mientras carga
        ) : (
            <>
              <Text style={styles.text}>{scannedData}</Text>
              {errorText && (
                  <View>
                    <Text>{errorText}</Text>
                    <Button
                        title="Crear Producto"
                        onPress={() => navigation.navigate("CreateProductScreen", { codigo: scannedData })}
                    />
                  </View>
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
                    <Text style={styles.text}>Descripción: {productInfo.Descripcion}</Text>
                    <Text style={styles.text}>Existencia: {productInfo.Existencia}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad"
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={setQuantity}
                    />

                    <Picker
                        selectedValue={categoria}
                        style={{ height: 50, width: 200 }}
                        onValueChange={(itemValue) => {
                          console.log("Selected Value:", itemValue);
                          setCategoria(itemValue);
                        }}
                    >
                      <Picker.Item label="Keto" value="keto" />
                      <Picker.Item label="Sin Gluten" value="sin gluten" />
                      <Picker.Item label="Granel" value="granel" />
                      <Picker.Item label="Bebidas" value="bebidas" />
                      <Picker.Item label="Vegano" value="vegano" />
                      <Picker.Item label="Aceites" value="aceites" />
                      <Picker.Item label="Café" value="cafe" />
                      <Picker.Item label="Infusiones y Té" value="infusiones y té" />
                      <Picker.Item label="Carnes Veganas" value="carnes veganas" />
                      <Picker.Item label="Tortillas" value="tortillas" />
                      <Picker.Item label="Chocolates" value="chocolates" />
                      <Picker.Item label="Endulzantes" value="endulzantes" />
                      <Picker.Item label="Frutos Secos y Deshidratados" value="frutos secos y deshidratados" />
                      <Picker.Item label="Pastas y Noodles Sin Gluten" value="pastas y noodles sin gluten" />
                      <Picker.Item label="Salsas y Conservas" value="salsa y conservas" />
                      <Picker.Item label="Panadería Saludable" value="panaderia saludable" />
                      <Picker.Item label="Snacks Saludables" value="snacks saludables" />
                      <Picker.Item label="N/A" value="N/A" />
                      <Picker.Item label="" value="" />
                    </Picker>

                    <Picker
                        selectedValue={seleccion}
                        style={{height: 50, width: 200}}
                        onValueChange={(itemValue) => setSeleccion(itemValue)}
                    >
                      <Picker.Item label="Tienda" value="tienda" />
                      <Picker.Item label="Web" value="web" />
                    </Picker>

                    <Button
                        title="Actualizar producto"
                        onPress={handleUpdateProduct}
                    />
                  </View>
              )}
            </>
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
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "80%",
  },
});
