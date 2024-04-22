import React from 'react';
import styled from 'styled-components'


import Lupa from './imgs/lupa.png'

const CampoStyled = styled.div`
    position: relative;
    display: flex;
`

const InputStyled = styled.input`
    border: 0px;
    border-radius: 50px 0px 0px 50px;
    padding-right: 20px;
    padding-left: 20px;
    width: 400px;
    height: 40px;
    font-size: large;
`

const BtStyled = styled.button`
    width: 70px;
    height: 42px;
    background-color: #ddd;
    border: none;
    border-radius: 0 50px 50px 0;
    cursor: pointer;
`

const LupaStyled = styled.img`
    position: relative;
    top: 2px;
    width: 50%;
    height: auto;
`


function CampoBusca(){
    return(
        <CampoStyled>
            <InputStyled id="entrada"/>
            <BtStyled id="botaoBusca">
                <LupaStyled  src={Lupa}/>
            </BtStyled>
        </CampoStyled>
    )
}


export default CampoBusca