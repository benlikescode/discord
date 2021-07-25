import React, { FC } from 'react'
import { HeroSectionTextStyled } from '.'
import { Link } from 'react-router-dom'

type Props = {
  isLoggedIn: boolean
  serverPath: string
}

const HeroSectionText: FC<Props> = ({ isLoggedIn, serverPath }) => {
  return (
    <HeroSectionTextStyled>
      <h1>Your place to talk</h1>
      <div className="hero-section-text">
        Whether you’re part of a school club, gaming group, worldwide art community, or just a handful of friends that want to spend time together, Discord makes it easy to talk every day and hang out more often.
      </div>
      {
        isLoggedIn ?
        <Link to={serverPath} className="login-btn">
          <button>Open Discord in your browser</button>
        </Link>
        :
        <Link to="/login" className="login-btn">
          <button>Open Discord in your browser</button>
        </Link>
      } 
    </HeroSectionTextStyled>
  )
}

export default HeroSectionText
