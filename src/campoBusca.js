import React from 'react';
import styled from 'styled-components'
import {useState} from 'react'
import { useResultado } from './ResultadoContext';
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

    const [valorInput,setInput] = useState('')
    const {novosResultados} = useResultado()


    const apertarBotao = async () => {
        try{
            const resposta = await fetch(`https://wft-geo-db.p.rapidapi.com/v1/geo/places?namePrefix=${valorInput}`, {
                headers: {
                    "x-rapidapi-host": 'wft-geo-db.p.rapidapi.com',
                    "x-rapidapi-key": '41fd8fb333mshf25dc5b0353d429p1146c1jsn49b5f408504e'
                }
            });
            const respostaJson = await resposta.json()
            novosResultados(respostaJson)
        }catch(error){
            console.log(`deu erro ${error.message}`)
        }
    }

    return(
        <CampoStyled>
            <InputStyled type="text" value={valorInput} onChange={(e) => setInput(e.target.value)}/>
            <BtStyled onClick={apertarBotao}>
                <LupaStyled  src={Lupa}/>
            </BtStyled>
        </CampoStyled>
    )
}


export default CampoBusca