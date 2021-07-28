import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { StyledUserControls } from '.'
import { Deafen, GearIcon, Mute } from '../Icon'
import { UserInfo } from '../UserInfo'

const UserControls: FC = () => {
  const history = useHistory()

  const handleUserSettingsClick = () => {
    history.push('/settings')
  }

  return (
    <StyledUserControls>    
      <div className="userInfo">
        <UserInfo />
      </div>
      <div className="footerButtons">
        <button className="footerButton">
          <Mute size={20}/>
        </button>
        <button className="footerButton">
          <Deafen size={20}/>
        </button>
        <button className="footerButton" onClick={() => handleUserSettingsClick()}>
          <GearIcon size={20}/>          
        </button>            
      </div>
     
    </StyledUserControls>
  )
}

export default UserControls
