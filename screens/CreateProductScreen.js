import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import TokenContext from "../context/TokenProvider";
import { Picker } from "@react-native-picker/picker"; // Importar Picker

export default function CreateProductScreen({ route }) {
  const { codigo } = route.params; // Obtener el código escaneado'

  console.log(codigo);
  const http = "https://secure-island-46662-cd8fbd3886e4.herokuapp.com";
  const { scannedData } = useContext(TokenContext);

  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [existencia, setExistencia] = useState("");
  const [tipoVenta, setTipoVenta] = useState("");
  const [categoria, setCategoria] = useState("keto"); // Inicializar con un valor por defecto
  const [seleccion, setSeleccion] = useState("tienda"); // Inicializar con un valor por defecto
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleCreateProduct = async () => {
    setLoading(true);
    try {
      await axios.post(http + "/add-product", {
        codigo,
        descripcion,
        precio: Number(precio),
        existencia: Number(existencia),
        tipoVenta,
        categoria,
        seleccion,
        fileName: scannedData, // Ajusta el nombre del archivo según tu caso
      });

      console.log("Producto creado con éxito");
      // Navegar de vuelta a la pantalla anterior
      navigation.goBack();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <Text style={styles.text}>Código: {codigo}</Text>

      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={descripcion}
        onChangeText={setDescripcion}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
      />

      <TextInput
        style={styles.input}
        placeholder="Existencia"
        keyboardType="numeric"
        value={existencia}
        onChangeText={setExistencia}
      />

      <TextInput
        style={styles.input}
        placeholder="Tipo de Venta"
        value={tipoVenta}
        onChangeText={setTipoVenta}
      />

      {/* Picker para la Categoría */}
      <Picker
        selectedValue={categoria}
        style={styles.input}
        onValueChange={(itemValue) => setCategoria(itemValue)}
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
        <Picker.Item
          label="Frutos Secos y Deshidratados"
          value="frutos secos y deshidratados"
        />
        <Picker.Item
          label="Pastas y Noodles Sin Gluten"
          value="pastas y noodles sin gluten"
        />
        <Picker.Item label="Salsas y Conservas" value="salsa y conservas" />
        <Picker.Item label="Panadería Saludable" value="panaderia saludable" />
        <Picker.Item label="Snacks Saludables" value="snacks saludables" />
      </Picker>

      {/* Picker para la Selección */}
      <Picker
        selectedValue={seleccion}
        style={styles.input}
        onValueChange={(itemValue) => setSeleccion(itemValue)}
      >
        <Picker.Item label="Tienda" value="tienda" />
        <Picker.Item label="Web" value="web" />
      </Picker>

      <Button title="Crear Producto" onPress={handleCreateProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    width: "100%",
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
});
