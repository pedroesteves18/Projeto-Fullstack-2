import React, { createContext, useContext, useState } from 'react';

const resultadoContext = createContext()

export function useResultado(){
    return useContext(resultadoContext)
}


export function ResultadoProvider({children}){
    const [resultados, setResultado] = useState([]);
    
    const novosResultados = (novosResultados) => {
        setResultado(novosResultados);
    };

    return (
        <resultadoContext.Provider value={{resultados, novosResultados}}>
            {children}
        </resultadoContext.Provider>
    );
}
