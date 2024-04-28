import React, { createContext, useMemo,useContext, useState } from 'react';

const resultadoContext = createContext()

export function useResultado(){
    return useContext(resultadoContext)
}


export function ResultadoProvider({children}){
    const [resultados, setResultado] = useState([]);
    
    const novosResultados = (novosResultados) => {
        setResultado(novosResultados);
    };

    const value = useMemo(() => {
        return { resultados, novosResultados };
    }, [resultados])

    return (
        <resultadoContext.Provider value={value}>
            {children}
        </resultadoContext.Provider>
    );
}
