import styled from 'styled-components'

const RegisterStyled = styled.div`
  background: #36393f;

  .splash-image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  .auth-container {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #36393f;
    max-width: 480px;
    padding: 32px;
    width: 100%;
    box-sizing: border-box;
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
    border-radius: 5px;
  }

  .auth-container h1 {
    margin: 0;
    font-size: 24px;
    line-height: 30px;
    font-weight: 600;
    color: white;
    text-align: center;
  }

  .auth-inputs {
    margin-top: 20px;
    display: grid;
    row-gap: 20px;
  }

  .auth-inputs input {
    padding: 10px;
    height: 40px;
    font-size: 16px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    border-radius: 3px;
    color: #dcddde;
    background-color: #0000001a;
    border: none;
    outline: none;
  }

  .auth-inputs input:focus {
    border: 1px solid #7289da;
  }

  .auth-container button {
    background: none;
    border: none;
    border-radius: 3px;
    font-weight: 500;
    height: 44px;
    min-width: 130px;
    min-height: 44px;
    color: #fff;
    background-color: #7289da;
    line-height: 16px;
    padding: 2px 16px;
    width: 100%;
    font-size: 16px;
    margin-top: 20px;
  }

  .auth-container a {
    background: none;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    margin-top: 8px;
    color: #7289da;
    display: block;
  }

  .auth-inputs label {
    font-size: 12px;
    line-height: 16px;
    color: #8e9297;
    margin-bottom: 8px;
    font-weight: 600;
    text-transform: uppercase;
    display: block;
    cursor: auto;
  }

  .auth-sizer {
    position: relative;
    height: 100vh;
    max-width: 1480px;
  }

  .register-error-msg {
    color: #f04747;
    font-size: 12px;
    font-weight: 500;
    font-style: italic;
    display: block;
    padding-top: 8px;
  }
`

export default RegisterStyled