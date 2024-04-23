import React from 'react';
import styled from 'styled-components'
import { useResultado } from './ResultadoContext';


const ResultadoStyled = styled.div`
    gap: 10px;
    font-size: large;
    color: white;
    text-align:  center;
`

function Resultado(){
    const {resultados} = useResultado()
    if(resultados === undefined){
        return <div></div>
    }else {
        return (<ResultadoStyled>
                {resultados.map((resultado,index) => {
                    return <div key={index}>{resultado}</div>
                    console.log(resultado)
                })}
        </ResultadoStyled>
    )}
    
}




export default Resultado