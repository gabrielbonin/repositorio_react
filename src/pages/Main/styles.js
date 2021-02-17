import styled, {keyframes, css} from 'styled-components';

export const Container = styled.div `
  max-width: 700px;
  background: #FFF;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0,0,0, 0.2);
  padding: 30px;
  margin: 80px auto;
  h1{
    display:flex;
    flex-direction: row;
    align-items: center;
    font-size: 30px;

    svg{
      margin-right: 10px;
    }
  }
`;

export const Form = styled.form `
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  input{
    flex: 1;
    border: 1px solid ${props =>  (props.error ? '#FF0000' : '#DDD')};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

//animação
const animate = keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }

`;



export const SubmitButton = styled.button.attrs(props =>({
  type: 'submit',
  disabled: props.loading,
})) `
  background: #0d2636;
  border: 0;
  border-radius: 4px;
  margin-left: 10px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  &[disabled]{
    cursor: not-allowed;
    opacity: 0.7;
  }

  ${props => props.loading && 
  css`
    svg{
      animation: ${animate} 2s linear infinite;
    }
  `
  }
`;


export const ListRepo = styled.ul`

  list-style: none;
  margin-top: 20px;

  li{
    display: flex;
    padding: 15px 0;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 15px;
    font-weight: bold;

    & + li {
      border-top: 1px solid #eee;
    }

    a{
      color: #0d2626;
      text-decoration: none;
    }
  }

`;

export const DeleteButton = styled.button.attrs({
  type: 'button'
})`
  background: transparent;
  color: #0d2626;
  border: 0;
  padding: 8px 7px;
  outline: 0;
  border-radius: 4px;

`;