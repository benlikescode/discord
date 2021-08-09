import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledUserModifyPopout } from '.'
import { selectUser } from '../../reducers/user'
import { fireDb } from '../../utils/firebase'
import { Button } from '../System'

type Props = {
  userId: string
  cursorX: number
  cursorY: number
  closePopout: any
  setKickModalOpen: any
  setBanModalOpen: any
  setNickModalOpen: any
}

const UserModifyPopout: FC<Props> = ({ userId, cursorX, cursorY, closePopout, setKickModalOpen, setBanModalOpen, setNickModalOpen }) => {
  const history = useHistory()
  const user = useSelector(selectUser)

  const IS_THIS_USER = userId === user.id
  const [clickedUsername, setClickedUsername] = useState("")

  const getClickedUsername = async () => {
    const clickedUser = await fireDb.collection('users').doc(userId).get()
    setClickedUsername(clickedUser.data()!.username)
  }

  useEffect(() => {
    if (userId) {
      getClickedUsername()
    }  
  }, [userId])

  const handleMessage = () => {
    history.push('/home')
  }

  const handleMute = () => {
    alert("Muted")
  }

  const handleChangeNickname = () => {
    setNickModalOpen(true)
  }

  const handleAddFriend = () => {
    alert("nick changed")
  }

  const handleKick = () => {
    setKickModalOpen(true)
  }

  const handleBan= () => {
    setBanModalOpen(true)
  }

  return (
    <StyledUserModifyPopout cursorX={cursorX} cursorY={cursorY}>
      {!IS_THIS_USER && 
        <Button type="solid" width="100%" callback={() => handleMessage()}>
          <div className="buttonItem">
            <span>Message</span>
          </div>
        </Button>
      }
      
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
      

      {!IS_THIS_USER && 
        <>
          <Button type="solid" width="100%" callback={() => handleAddFriend()}>
            <div className="buttonItem">
              <span>Add Friend</span>
            </div>
          </Button>
          <Button type="solid" width="100%" callback={() => handleKick()}>
            <div className="buttonItem">
              <span>{`Kick ${clickedUsername}`}</span>
            </div>
          </Button>
          <Button type="solid" width="100%" callback={() => handleBan()}>
            <div className="buttonItem">
              <span>{`Ban ${clickedUsername}`}</span>
            </div>
          </Button>
        </> 
      }
     
      
    </StyledUserModifyPopout>
  )
}

export default UserModifyPopout
