import styled from 'styled-components'

type StyledProps = {
  buttonBgColor: string
  buttonColor: string
}

const NavbarStyled = styled.div<StyledProps>`
  width: var(--home-page-width);
  height: 80px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  .navbar-logo {
    height: 34px;
    width: 124px;
  }

  .navbar-logo img {
    height: 34px;
  }

  .login-btn button:hover {
    color: ${({ buttonBgColor }) => buttonBgColor === "#fff" ? "#7289da" : ""};
    background-color: ${({ buttonBgColor }) => buttonBgColor === "#fff" ? "" : "#8ea1e1"};
  }

  .login-btn button {
    height: 38px;
    width: 113px;
    outline: none;
    border: none;
    background: transparent;
    background-color: ${({ buttonBgColor }) => buttonBgColor};
    border-radius: 40px;
    font-size: 14px;
    color: ${({buttonColor}) => buttonColor};
    box-shadow: 0 8px 15px rgb(0 0 0 / 20%);
    cursor: pointer;
  }

  
`

export default NavbarStyled