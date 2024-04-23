
import React from 'react';
import styled from 'styled-components'
import CampoBusca from './campoBusca'


const DadosStyled = styled.div`
    display: flex;
    align-items: center;
    text-align: center;
    background-color: #404040;
    height: 300px;
    flex-direction: column;
    font-size: 20px;
    color: white;
`

function Dados() {


    return (
            <DadosStyled>
                <p>Busca de cidades e locais ao redor do mundo</p>
                <br />
                <br />
                <p>Insira a cidade ou local desejado</p>
                <CampoBusca/>
            </DadosStyled>
    )
}

export default Dados