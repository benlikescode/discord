import React, { FC } from 'react'
import { NavbarStyled } from '.'
import { Link } from 'react-router-dom'

type Props = {
  buttonBgColor: string
  buttonColor: string
  isLoggedIn: boolean
  serverPath: string
}

const Navbar: FC<Props> = ({ buttonBgColor, buttonColor, isLoggedIn, serverPath }) => {
  return (
    <NavbarStyled buttonBgColor={buttonBgColor} buttonColor={buttonColor}>
      
      <div className="navbar-logo">
        <img src="https://cdn.discordapp.com/attachments/809884420130734103/838191607605100554/bencord-white.png" alt=""/>
      </div>
      {
        isLoggedIn ?
        <Link to={serverPath} className="login-btn">
          <button>Open Discord</button>
        </Link>
        :
        <Link to="/login" className="login-btn">
          <button>Log in</button>
        </Link>
      } 
    </NavbarStyled>
  )
}

export default Navbar
