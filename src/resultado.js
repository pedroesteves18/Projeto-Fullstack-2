import React, { useState } from 'react';
import styled from 'styled-components'
import { useResultado } from './ResultadoContext';


const ResultadoStyled = styled.div`
    gap: 10px;
    font-size: large;
    color: white;
    text-align:  center;
`

function Resultado(){
    const resultados = useResultado()
    return (<ResultadoStyled>
        <ul>
            {resultados.map((resultado,index) => {
                <li key={index}>{resultado}</li>
            })}
        </ul>
    </ResultadoStyled>
    )
}




export default Resultado