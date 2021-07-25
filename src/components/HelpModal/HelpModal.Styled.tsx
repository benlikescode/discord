import styled from 'styled-components'

const HelpModalStyled = styled.div`
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

  .social-links-wrapper {
    max-width: 400px;
    display: flex;
    align-items: center;
    margin-top: 50px;
  }

  .github-link {
    background-color: #7289DA;
    color: #fff;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    padding: 2px 16px;
    height: 38px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .email-link {
    background-color: none;
    color: #fff;
    border: 2px solid #7289DA;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    padding: 2px 16px;
    height: 34px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 25px;
  }

  .modal-text {
    text-align: center;
    line-height: 25px;
    color: #B9BBBE;
  }
`

export default HelpModalStyled