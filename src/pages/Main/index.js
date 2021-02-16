import React, {useState, useCallback} from 'react';
import * as S from './styles';
import {FaBars, FaGithub, FaPlus, FaSpinner, FaTrash} from 'react-icons/fa';
import api from '../../services/api';
export default function Main(){

  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);


   const handleSubmit = useCallback((e)=>{
    e.preventDefault();
    
    async function submit(){

      setLoading(true);

      try{
      const response = await api.get(`repos/${newRepo}`);

      const data = {
      name: response.data.full_name,
      }
      setRepositorios([...repositorios, data]);
      setNewRepo('');
      console.log(response);

    }catch(error){
      console.log(error);
    }finally{
      setLoading(false);
    }
    }
    submit();

  }, [newRepo, repositorios]);

  function handleinputChange(e){
    setNewRepo(e.target.value);
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
          <S.Form onSubmit={handleSubmit}>
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
              <a href="">
                <FaBars size={20}/>
              </a>
            </li>
          ))} 
        </S.ListRepo>

      </S.Container>
    </div>
  );
}