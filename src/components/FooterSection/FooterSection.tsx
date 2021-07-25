import React, { FC } from 'react'
import { FooterSectionStyled } from '.'
import { Navbar } from '../Navbar'

type Props = {
  isLoggedIn: boolean
  serverPath: string
}

const FooterSection: FC<Props> = ({ isLoggedIn, serverPath}) => {
  return (
    <FooterSectionStyled>
      <Navbar buttonBgColor={"#7289da"} buttonColor={"#fff"} isLoggedIn={isLoggedIn} serverPath={serverPath}/>
    </FooterSectionStyled>
  )
}

export default FooterSection
