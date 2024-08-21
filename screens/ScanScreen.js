import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import TokenContext from '../context/TokenProvider';

export default function ScanScreen({ navigation }) {
    const { scannedData } = useContext(TokenContext);

    return (
        <View style={styles.container}>

            <Button
                title="Escanear otro producto"
                onPress={() => navigation.navigate('Home')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});
