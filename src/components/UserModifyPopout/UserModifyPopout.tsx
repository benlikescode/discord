import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { StyledUserModifyPopout } from '.'
import { Button } from '../System'

type Props = {
  userId: string
  cursorX: number
  cursorY: number
  closePopout: any
  setKickModalOpen: any
  setBanModalOpen: any
}

const UserModifyPopout: FC<Props> = ({ userId, cursorX, cursorY, closePopout, setKickModalOpen, setBanModalOpen }) => {
  const history = useHistory()

  const handleMessage = () => {
    history.push('/home')
  }

  const handleMute = () => {
    alert("Muted")
  }

  const handleChangeNickname = () => {
    alert("nick changed")
  }

  const handleAddFriend = () => {
    alert("nick changed")
  }

  const handleKick = () => {
    setKickModalOpen(true)
    closePopout()
  }

  const handleBan= () => {
    setBanModalOpen(true)
    closePopout()
  }

  return (
    <StyledUserModifyPopout cursorX={cursorX} cursorY={cursorY}>
      <Button type="solid" width="100%" callback={() => handleMessage()}>
        <div className="buttonItem">
          <span>Message</span>
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleMute()}>
        <div className="buttonItem">
          <span>Mute</span>
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleChangeNickname()}>
        <div className="buttonItem">
          <span>Change Nickname</span>
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleAddFriend()}>
        <div className="buttonItem">
          <span>Add Friend</span>
        </div>
      </Button>

      <Button type="solid" width="100%" callback={() => handleKick()}>
        <div className="buttonItem">
          <span>Kick Honda</span>
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleBan()}>
        <div className="buttonItem">
          <span>Ban Honda</span>
        </div>
      </Button>
      
    </StyledUserModifyPopout>
  )
}

export default UserModifyPopout
