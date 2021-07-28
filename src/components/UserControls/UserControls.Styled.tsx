import styled from 'styled-components'

const StyledUserControls = styled.div`

  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  
  .footerButtons {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .footerButton {
    background: transparent;
    height: fit-content;
    width: 32px;
    height: 32px;
    display: flex;   
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    color: #b9bbbe;

    :hover {
      color: #dcddde;
      background-color: rgba(79, 84, 92, 0.32);
    }
  }
  
`

export default StyledUserControls
