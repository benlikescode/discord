import { FC, useEffect, useState } from 'react'
import { StyledServerDropdown } from '.'
import { Boost } from '../Icon'
import { Button } from '../System'
import { useHistory } from 'react-router-dom' 
import { selectServer } from '../../reducers/server'
import { useSelector } from 'react-redux'
import { fireDb } from '../../utils/firebase'
import { selectUser } from '../../reducers/user'
import firebase from 'firebase'

type Props = {
  setServerDropdownOpen: any
  setInviteOpen: any
  setCreateChannelOpen: any
  setChangeNicknameOpen: any
}

const ServerDropdown: FC<Props> = ({ setServerDropdownOpen, setInviteOpen, setCreateChannelOpen, setChangeNicknameOpen }) => {

  const [serverBoostOpen, setServerBoostOpen] = useState(false)
  const [serverSettingsOpen, setServerSettingsOpen] = useState(false)
  const [changeIdentityOpen, setChangeIdentityOpen] = useState(false)
  const [isServerOwner, setIsServerOwner] = useState(true)
  const history = useHistory()

  const server = useSelector(selectServer)
  const user = useSelector(selectUser)

  console.log(server)

  const closeModal = () => {
    setServerBoostOpen(false)
    setInviteOpen(false)
    setServerSettingsOpen(false)
    setCreateChannelOpen(false)
    setChangeIdentityOpen(false)
  }

  const handleServerBoost = () => {
    setServerDropdownOpen(false)
  }

  const handleInvite = () => {
    setServerDropdownOpen(false)
    setInviteOpen(true)
  }

  const hanldeSettings = () => {
    setServerDropdownOpen(false)
    history.push(`/server/${server.id}/settings`)
  }

  const handleCreateChannel = () => {
    setServerDropdownOpen(false)
    setCreateChannelOpen(true)
  }

  const handleChangeIdentity = () => {
    setServerDropdownOpen(false)
    setChangeNicknameOpen(true)
  }

  // can remove more things later such as roles and channels
  const handleLeaveServer = async () => {
    if (server.id && user.id) {
      await fireDb.collection('servers').doc(server.id).collection('members').doc(user.id).delete()
      await fireDb.collection('servers').doc(server.id).update({
        members: firebase.firestore.FieldValue.arrayRemove(user.id)
      })
    }
  }

  const getServerOwner = async () => {
    const thisServer = await fireDb.collection('servers').doc(server.id).get()
    setIsServerOwner(thisServer.data()!.owner === user.id)
  }

  useEffect(() => {
   if (server.id && user.id) {
     getServerOwner()
   }
  }, [server.id, user.id])

  return (
    <StyledServerDropdown>
      <Button type="solid" width="100%" callback={() => handleServerBoost()}>
        <div className="buttonItem">
          <span>Server Boost</span>
          <svg className="boostIcon" aria-hidden="false" width="18" height="18" viewBox="0 0 8 12"><path d="M4 0L0 4V8L4 12L8 8V4L4 0ZM7 7.59L4 10.59L1 7.59V4.41L4 1.41L7 4.41V7.59Z" fill="currentColor"></path><path d="M2 4.83V7.17L4 9.17L6 7.17V4.83L4 2.83L2 4.83Z" fill="currentColor"></path></svg>
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleInvite()}>
        <div className="buttonItem">
          <span>Invite People</span>
          <svg aria-hidden="false" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M21 3H24V5H21V8H19V5H16V3H19V0H21V3ZM10 12C12.205 12 14 10.205 14 8C14 5.795 12.205 4 10 4C7.795 4 6 5.795 6 8C6 10.205 7.795 12 10 12ZM10 13C5.289 13 2 15.467 2 19V20H18V19C18 15.467 14.711 13 10 13Z"></path></svg>   
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => hanldeSettings()}>     
        <div className="buttonItem">
          <span>Server Settings</span>
          <svg aria-hidden="false" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M19.738 10H22V14H19.739C19.498 14.931 19.1 15.798 18.565 16.564L20 18L18 20L16.565 18.564C15.797 19.099 14.932 19.498 14 19.738V22H10V19.738C9.069 19.498 8.203 19.099 7.436 18.564L6 20L4 18L5.436 16.564C4.901 15.799 4.502 14.932 4.262 14H2V10H4.262C4.502 9.068 4.9 8.202 5.436 7.436L4 6L6 4L7.436 5.436C8.202 4.9 9.068 4.502 10 4.262V2H14V4.261C14.932 4.502 15.797 4.9 16.565 5.435L18 3.999L20 5.999L18.564 7.436C19.099 8.202 19.498 9.069 19.738 10ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"></path></svg>    
        </div>        
      </Button>
      <Button type="solid" width="100%" callback={() => handleCreateChannel()}>
        <div className="buttonItem">
          <span>Create Channel</span>
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.00098C6.486 2.00098 2 6.48698 2 12.001C2 17.515 6.486 22.001 12 22.001C17.514 22.001 22 17.515 22 12.001C22 6.48698 17.514 2.00098 12 2.00098ZM17 13.001H13V17.001H11V13.001H7V11.001H11V7.00098H13V11.001H17V13.001Z"></path></svg>    
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleChangeIdentity()}>
        <div className="buttonItem">
          <span>Change Identity</span>
          <svg aria-hidden="false" width="18" height="18" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path></svg>   
        </div>
      </Button>
      {!isServerOwner &&
        <Button type="red" width="100%" callback={() => handleLeaveServer()}>
          <div className="buttonItem">
            <span>Leave Server</span>
            <svg aria-hidden="false" width="18" height="18" viewBox="0 0 24 24"><path fill="currentColor" d="M10.418 13L12.708 15.294L11.292 16.706L6.586 11.991L11.294 7.292L12.707 8.708L10.41 11H21.949C21.446 5.955 17.177 2 12 2C6.486 2 2 6.487 2 12C2 17.513 6.486 22 12 22C17.177 22 21.446 18.046 21.949 13H10.418Z"></path></svg>   
          </div>
        </Button>
      }
     
    </StyledServerDropdown>
  )
}

export default ServerDropdown
