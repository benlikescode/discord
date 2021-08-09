import styled from 'styled-components'

const StyledChangeEmail = styled.div`
  .topSection {
    padding: 16px;
  }

  .header {
    font-size: 24px;
    line-height: 30px;
    font-weight: 700;
    color: #fff;
    text-align: center;
  }

  .subHeader {
    margin-top: 8px;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    color: #b9bbbe;
  }

  .inputsWrapper {
    padding: 10px 16px;
    display: grid;
    gap: 15px;
  }

  .closeModalBtn {
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

  .errorMessage {
    color: #ED4245;
    font-size: 14px;
    font-weight: 500;
  }
  
`

export default StyledChangeEmail
