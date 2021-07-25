import styled from 'styled-components'

type Props = {
  modalType: string
}

const ModalStyled = styled.div<Props>`
  .layer-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: none!important;
    pointer-events: none;
    z-index: 1002;
  }

  .backdrop {
    opacity: 0.85;
    background: rgb(0, 0, 0);
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: all;
  }

  .modal-container {
    height: 420px;
    width: 440px;
    background-color: #36393f;
    border-radius: 5px;
    display: flex;
    align-items: center;
    flex-direction: column;
    position: relative;
    padding: 15px;
    box-sizing: border-box;
    opacity: 1 !important;
    z-index: 99999;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    pointer-events: all;

    h2 {
      color: #fff;
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
  }

  .close-modal-btn:hover {
    opacity: 1;
    color: #dcddde;
  }

  .modal-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 35px 0;
  }

  .modal-input-wrapper label {
    color: #dcddde;
    font-size: 12px;
    font-weight: 600;
  }

  .modal-input {
    height: 40px;
    border-radius: 3px;
    color: #fff;
    border: 1px solid rgba(0,0,0,0.3);
    outline: none;
    font-size: 16px;
    width: 100%;
    padding: 0 0 0 8px;
    margin-top: 8px;
    background: rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
  }
  
  .modal-input:focus {
    border: 1px solid #7289da; 
  }
  
  .modal-bottom-wrapper button {
    color: #fff;
    background-color: #7289da;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    height: 38px;
  }

  .modal-bottom-wrapper button:hover {
    background-color: #677bc4;
  }

  .modal-text {
    color: #B9BBBE;
    text-align: center;
    font-size: 16px;
    line-height: 20px;
    max-width: 320px;
  }
`

export default ModalStyled