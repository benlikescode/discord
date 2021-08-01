import { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledUserControls } from '.'
import { selectVoice, updateVoice } from '../../reducers/voice'
import { Deafen, GearIcon, Mute, Muted } from '../Icon'
import { UserInfo } from '../UserInfo'



const UserControls: FC = ({}) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const voice = useSelector(selectVoice)

  const handleUserSettingsClick = () => {
    history.push('/settings')
  }

  const handleMute = () => {
    if (voice.isMuted) {
      dispatch(updateVoice({isMuted: false}))
    }
    if (!voice.isMuted) {
      dispatch(updateVoice({isMuted: true}))
    }
  }

  const handleDeafen = () => {

  }

  return (
    <StyledUserControls>    
      <div className="userInfo">
        <UserInfo />
      </div>
      <div className="footerButtons">
        <button className="footerButton" onClick={() => handleMute()}>
          { voice.isMuted ? <Muted size={20}/> : <Mute size={20}/> }
        </button>
        <button className="footerButton" onClick={() => handleDeafen()}>
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