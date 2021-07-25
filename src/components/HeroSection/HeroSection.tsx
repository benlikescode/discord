import React, { FC } from 'react'
import { HeroSectionStyled } from '.'
import { Navbar } from '../Navbar'
import { HeroSectionText } from '../HeroSectionText'
import splashImage from './splash.png'

type Props = {
  isLoggedIn: boolean
  serverPath: string
}

const HeroSection: FC<Props> = ({ isLoggedIn, serverPath }) => {
  return (
    <HeroSectionStyled>
      <img className="hero-section-image" src={splashImage} alt="" />
      <Navbar buttonBgColor={"#fff"} buttonColor={"#23272a"} isLoggedIn={isLoggedIn} serverPath={serverPath}/>
      <HeroSectionText serverPath={serverPath} isLoggedIn={isLoggedIn}/>
    </HeroSectionStyled>
  )
}

export default HeroSection
