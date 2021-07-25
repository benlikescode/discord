import { FC } from 'react'
import { StyledHeader } from '.'
import { XIcon } from '@heroicons/react/outline'
import { Button, Icon } from '../../../System'
import { useHistory } from 'react-router'

const Header: FC = () => {
  const history = useHistory()

  const closeSettings = () => {
    history.goBack()
  }

  return (
    <StyledHeader> 
      <span>Roles</span>
      <Button type="closeButton" callback={() => closeSettings()}>
        <Icon size={18} fill="#fff">
          <XIcon />
        </Icon>
      </Button>  
    </StyledHeader>
  )
}

export default Header
