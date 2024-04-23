import React from 'react';
import styled from 'styled-components'
import { useResultado } from './ResultadoContext';


const ResultadoStyled = styled.div`
    font-size: large;
    color: white;
    text-align:  center;
    margin-top: 20px;
    div{
        margin-bottom: 15px;
        font-size: 25px;
    }
`

function Resultado(){
    const {resultados} = useResultado()
        if(resultados === undefined){
            return <ResultadoStyled>Pesquisa vazia</ResultadoStyled>
        } else if(resultados === 0){
            return <ResultadoStyled>Local inválido</ResultadoStyled>
        }
        return (<ResultadoStyled>
                {resultados.map((cidade,index) => {
                    return <div key={index}>{(`Local: ${cidade.name}, População: ${cidade.population}, Região/Estado: ${cidade.region}, Latitude/Longitude: ${cidade.latitude}/ ${cidade.longitude}`)}</div>
                })}
        </ResultadoStyled>
    )}





export default Resultado