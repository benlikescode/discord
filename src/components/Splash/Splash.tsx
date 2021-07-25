import React, { FC } from 'react'
import video from './splash.webm'
import { SplashStyled } from '.'

const Splash: FC = () => {
  return (
    <SplashStyled>
      <video src={video} loop autoPlay muted />
    </SplashStyled>
  )
}

export default Splash
