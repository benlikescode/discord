import styled from 'styled-components'

const StyledSearchbar = styled.div`
  height: 32px;
  padding-right: 8px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  overflow: hidden;
  background-color: #202225;

  input {
    border: none;
    outline: none;
    font-size: 16px;
    line-height: 32px;
    height: 30px;
    padding: 0 8px;
    color: #dcddde;
    background: transparent;
    flex: 1;
  }
  
`

export default StyledSearchbar
