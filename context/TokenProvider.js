// context/TokenProvider.js
import React, { createContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [scannedData, setScannedData] = useState("");
    const [ipScanned, setIpScanned] = useState("");

    return (
        <TokenContext.Provider value={{ scannedData, setScannedData,ipScanned,setIpScanned }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
