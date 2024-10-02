// FechaContext.tsx
import React, { createContext, useContext, useState } from 'react';

// Definimos el tipo del contexto
interface FechaContextType {
    fechaSeleccionada: Date | null;
    setFechaSeleccionada: React.Dispatch<React.SetStateAction<Date | null>>;
}

// Creamos el contexto
const FechaContext = createContext<FechaContextType | undefined>(undefined);

// Proveedor del contexto
export const FechaProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null);

    return (
        <FechaContext.Provider value={{ fechaSeleccionada, setFechaSeleccionada }}>
            {children}
        </FechaContext.Provider>
    );
};

// Hook para usar el contexto
export const useFechaContext = () => {
    const context = useContext(FechaContext);
    if (context === undefined) {
        throw new Error('useFechaContext must be used within a FechaProvider');
    }
    return context;
};
