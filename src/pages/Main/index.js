import React from 'react';
import * as S from './styles';
import {FaGithub, FaPlus} from 'react-icons/fa';
export default function Main(){
  return(
    <div>
      <S.Container>
        <h1>
          <FaGithub size={38}/>
          Meus repositorios
        </h1>
          <S.Form onSubmit={()=>{}}>
              <input type="text" placeholder="adicionar repositorio"/>
              <S.SubmitButton>
              <FaPlus color="#FFF" size={14}/>
              </S.SubmitButton>
        </S.Form>
      </S.Container>
    </div>
  );
}