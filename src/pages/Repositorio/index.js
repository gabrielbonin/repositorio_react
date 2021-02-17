import React, {useState, useEffect} from 'react';
import api from '../../services/api';
import * as S from './styles';
import {FaArrowLeft} from 'react-icons/fa';
      

export default function Repositorio({match}){

  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [load, setLoad] = useState(true);
  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState('all');
  const [ativo, setAtivo] = useState('all');
 
  
  
 

  useEffect(()=>{

    async function load(){
      const nomeRepo = decodeURIComponent(match.params.repositorio)

    const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params:{
            state: filter,
            per_page: 5
          }
        })
      ])

      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);
      setLoad(false);
    

    }

    load(); 

  }, [match.params.repositorio, filter, ativo])


  useEffect(()=>{
    async function loadIssue(){
      const nomeRepo = decodeURIComponent(match.params.repositorio);
      const response = await api.get(`/repos/${nomeRepo}/issues`,{
        params:{
          state: filter,
          page: page,
          per_page: 5,
        }
      });
      setIssues(response.data);
      
      
    }
    loadIssue();
  }, [match.params.repositorio, filter, page, ativo])

  function handlePage(action){
    setPage(action === 'back' ? page - 1 : page + 1)
  }

 function handleActive(action){
  
    setFilter(action);
    setAtivo(action);
    console.log(ativo);
 }

  if(load){
    return (
      <S.Loading>
        <h1>Carregando..</h1>
      </S.Loading>
    )
  }

  return(
    <div>
      <S.Container>
        <S.BackButton to="/">
          <FaArrowLeft size={30} color="#000"/>
        </S.BackButton>
          <S.Owner>
            <img src={repositorio.owner.avatar_url} alt="logo repositorio"/>
            <h1>{repositorio.name}</h1>
            <p>{repositorio.description}</p>
            <S.Filter  active={ativo}>
              <strong>Filter issues:</strong>
              <button type="button"  onClick={()=>handleActive('all')} id="all"
               
              >All</button>
              <button type="button"  onClick={()=>handleActive('open')} id="open"
              
              >Open</button>
              <button type="button"  onClick={()=>handleActive('closed')} id="closed"
             
              >Closed</button>
            </S.Filter>
          </S.Owner>
          <S.IssuesList>
            {issues.map(issue => (
              <li key={String(issue.id)}>
                <img src={issue.user.avatar_url} alt={issue.user.login}/>
                <div>
                  <strong>
                    <a href={issue.html_url}>{issue.title}</a>
                    {issue.labels.map(label => (
                      <span key={String(label.id)}>{label.name}</span>
                    ))}
                    <p>By: {issue.user.login}</p>
                  </strong>
                </div>
              </li>
            ))}
          </S.IssuesList>
          <S.PageActions>
            <button type="button" onClick={()=>handlePage('back')}
            disabled={page < 2}
            >Voltar</button>
            <button type="button" onClick={()=>handlePage('next')}>Proxima</button>
          </S.PageActions>
      </S.Container>
    </div>
  );
}