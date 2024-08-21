import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import TokenContext from '../context/TokenProvider';

export default function HomeScreen({ navigation }) {
    const { setScannedData } = useContext(TokenContext);
    const [scanned, setScanned] = useState(false);
    const [cameraActive, setCameraActive] = useState(false);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setScannedData(data); // Guardar el texto escaneado en el contexto global
        setCameraActive(false);
        navigation.navigate('Scan'); // Navegar a la siguiente pantalla
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
                    title={"Presiona para escanear un código"}
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
        justifyContent: 'center',
        alignItems: 'center',
    },
});
