// context/TokenProvider.js
import React, { createContext, useState } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [scannedData, setScannedData] = useState("");

    return (
        <TokenContext.Provider value={{ scannedData, setScannedData }}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;
