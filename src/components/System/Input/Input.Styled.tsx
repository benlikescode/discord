import styled from 'styled-components'


const StyledInput = styled.div`
  width: 100%;
  
  label {
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
    color: #8e9297;
    font-size: 12px;
    text-transform: uppercase;
  }
  .input-styled {
    height: 40px;
    display: flex;
    align-items: center;
   
    input {
      height: 100%;
      border-radius: 3px;
      padding: 0 14px;
      background-color: #0000001A;
      width: 100%;
      box-sizing: border-box;
      color: #dcddde;
      border: 1px solid rgba(0,0,0,0.3);
      outline: none;
      font-size: 1rem;
      
      &::placeholder {
        color: #dcddde;
      }
      &:focus {
        border-color: #040405;
      } 
      
    }
  }
`

export default StyledInput