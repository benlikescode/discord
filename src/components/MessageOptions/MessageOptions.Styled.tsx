import styled from 'styled-components'

const StyledMessageOptions = styled.div`
  border: var(--border);
  border-radius: 3px;
  display: flex;
  align-items: center;
  position: absolute;
  top: -15px;
  right: 10px;
  background-color: var(--bencordGray2);
  z-index: 2;

  .optionItem {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 3px;

    :hover {
      background-color: var(--bencordGray3);
    }
  }

  
`

export default StyledMessageOptions
