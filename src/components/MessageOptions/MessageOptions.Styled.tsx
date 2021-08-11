import styled from 'styled-components'

const StyledMessageOptions = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: -15px;
  right: 10px;
  background-color: var(--bencordGray2);
  z-index: 2;
  box-shadow: 0 0 0 1px rgba(4,4,5,0.15);
  box-sizing: border-box;
  height: 32px;
  border-radius: 4px;
  user-select: none;
  overflow: hidden;
}

  .optionItem {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 4px;
    color: #b9bbbe;

    :hover {
      background-color: var(--bencordGray3);
    }
  }

  .optionBtn {
    background: transparent;
    color: #b9bbbe;
    border-radius: 50%;
    padding: 7px;

    :hover {
      color: #fff;
    }

  }

  
`

export default StyledMessageOptions
