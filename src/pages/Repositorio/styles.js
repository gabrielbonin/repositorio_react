import  styled from 'styled-components';
import {Link} from 'react-router-dom';

export const Loading = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  max-width: 700px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const Owner = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;

    img{
      width: 150px;
      border-radius: 20%;
      margin: 15px 0;
    }

    h1{
      font-size: 30px;
    }

    p{
      margin-top: 5px;
      font-size: 14px;
      color: black;
      text-align: center;
      line-height: 1.4;
      max-width: 400px;
    }
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
  color: black;
`;

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style: none;

  li{
    display:flex;
    padding: 15px 10px;

    & + li{
      margin-top: 12px;
    }
  }

  img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border: 2px solid #0d2636;
  }

  div{
    flex: 1;
    margin-left: 12px;

    p{
      margin-top: 10px;
      font-size: 12px;
      color: darkblue;
    }
  }

  strong{
    font-size: 16px;

  a{
    text-decoration: none;
    font-weight: bold;
    color:  black;
    transition: 0.3s;
    

    &:hover{
      color: #0071db;
    }
  }

  span{
    background: #222;
    color: #fff;
    border-radius: 4px;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 7px;
    margin-left: 10px;

  }

  }
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid #eee; 
  margin-top: 15px;

  button{
    outline: 0;
    border: 0;
    background-color: #0D2636;
    color: #FFF;
    padding: 5px 10px;
    border-radius: 4px;
    margin-top: 10px;


    &:disabled{
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;