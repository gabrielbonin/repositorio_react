import React, {useState, useCallback, useEffect} from 'react';
import * as S from './styles';
import {FaBars, FaGithub, FaPlus, FaSpinner, FaTrash} from 'react-icons/fa';
import {Link} from 'react-router-dom';
import api from '../../services/api';


export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  //buscar
  useEffect(()=>{
    const repoStorage = localStorage.getItem('repos');

    if(repoStorage){
      setRepositorios(JSON.parse(repoStorage));
    }
  }, [])


  //salvar alterações
  useEffect(()=>{
    localStorage.setItem('repos', JSON.stringify(repositorios))
  },[repositorios])


   const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    
    async function submit(){
      setAlert(null);
      setLoading(true);

      try{
        if(newRepo === ''){
          throw new Error('Voce precisa digitar um repositorio');
        }
      const response = await api.get(`repos/${newRepo}`);

      const hasRepo = repositorios.find(repo => repo.name === newRepo);
      
      if(hasRepo){
        throw new Error("repositorio ja existe");
      }
      
      const data = {
      name: response.data.full_name,
      }
      setRepositorios([...repositorios, data]);
      setNewRepo('');
      console.log(response);

    }catch(error){
      setAlert(true);
      console.log(error);
    }finally{
      setLoading(false);
    }
    }
    submit();

  }, [newRepo, repositorios]);

  function handleinputChange(e){
    setNewRepo(e.target.value);
    setAlert(null);
  }

  const handleDelete = useCallback((repo)=>{
    const find = repositorios.filter(r=> r.name !== repo);
    setRepositorios(find);
  }, [repositorios]);

  return(
    <div>
      <S.Container>
        <h1>
          <FaGithub size={38}/>
          Meus repositorios
        </h1>
          <S.Form onSubmit={handleSubmit} error={alert}>
              <input type="text" placeholder="adicionar repositorio"
              value={newRepo}
              onChange={handleinputChange}
              />
              <S.SubmitButton loading={loading ? 1 : 0}>
                {loading ? (
                  <FaSpinner color="#FFF" size={14}/>
                 
                ) : (
                  <FaPlus color="#FFF" size={14}/>
                )}
              </S.SubmitButton>
        </S.Form>

        <S.ListRepo>
          {repositorios.map((repo)=>(
            <li key={repo.name}>
              <span>
                <S.DeleteButton onClick={()=>handleDelete(repo.name)}>
                  <FaTrash size={14}/>
                </S.DeleteButton>
                {repo.name}
                </span>
              <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}> 
                <FaBars size={20}/>
              </Link>
            </li>
          ))} 
        </S.ListRepo>

      </S.Container>
    </div>
  );
}