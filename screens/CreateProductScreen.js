import React, {useContext, useState} from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import TokenContext from "../context/TokenProvider";

export default function CreateProductScreen({ route }) {
    const { codigo } = route.params; // Obtener el código escaneado
    const http = "https://secure-island-46662-cd8fbd3886e4.herokuapp.com";
    const { scannedData, ipScanned } = useContext(TokenContext);

    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [existencia, setExistencia] = useState("");
    const [tipoVenta, setTipoVenta] = useState("");
    const [categoria, setCategoria] = useState("");
    const [seleccion, setSeleccion] = useState("");
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
                fileName: scannedData // Ajusta el nombre del archivo según tu caso
            });

            console.log("Producto creado con éxito");
            // Navegar de vuelta a la pantalla anterior
            navigation.goBack();
        } catch (error) {
            console.error("Error al crear el producto:", error);
            console.log(error.response.data);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
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

            <TextInput
                style={styles.input}
                placeholder="Categoría"
                value={categoria}
                onChangeText={setCategoria}
            />

            <TextInput
                style={styles.input}
                placeholder="Selección"
                value={seleccion}
                onChangeText={setSeleccion}
            />

            <Button title="Crear Producto" onPress={handleCreateProduct} />

            {loading && <Text>Cargando...</Text>}
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
