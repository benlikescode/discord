import styled from 'styled-components'

const StyledCreateChannel = styled.div`

  .header {
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;

    h2 {
      color: #fff;
      padding: 16px;
    }
  }

  .close-modal-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    border: none;
    background: none;
    color: #b9bbbe;
    opacity: 0.5;

    :hover {
      opacity: 1;
      color: #dcddde;
    }
  }

  .modal-input-wrapper {
    margin-bottom: 40px;
    padding: 0 16px;
  } 
`

export default StyledCreateChannel
