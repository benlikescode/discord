import { FC, useState } from 'react'
import { StyledServerDropdown } from '.'
import { Boost } from '../Icon'
import { Button, Icon } from '../System'
import { createInviteLink } from '../../utils/helperFunctions'
import { Link, useHistory, useParams } from 'react-router-dom' 

type Props = {
  setServerDropdownOpen: any
  setInviteOpen: any
  setCreateChannelOpen: any
}

interface ParamTypes {
  serverToken: string
}

const ServerDropdown: FC<Props> = ({ setServerDropdownOpen, setInviteOpen, setCreateChannelOpen }) => {

  const [serverBoostOpen, setServerBoostOpen] = useState(false)
  const [serverSettingsOpen, setServerSettingsOpen] = useState(false)
  const [changeIdentityOpen, setChangeIdentityOpen] = useState(false)
  const { serverToken } = useParams<ParamTypes>()
  const history = useHistory()

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
    history.push(`/server/${serverToken}/settings`)
  }

  const handleCreateChannel = () => {
    setServerDropdownOpen(false)
    setCreateChannelOpen(true)
  }

  const handleChangeIdentity = () => {
    setServerDropdownOpen(false)
  }

  return (
    <StyledServerDropdown>
      <Button type="solid" width="100%" callback={() => handleServerBoost()}>
        <div className="buttonItem">
          <span>Server Boost</span>
          <Boost size={16}/>    
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleInvite()}>
        <div className="buttonItem">
          <span>Invite People</span>
          <Boost size={16}/>    
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => hanldeSettings()}>     
        <div className="buttonItem">
          <span>Server Settings</span>
          <Boost size={16}/>    
        </div>        
      </Button>
      <Button type="solid" width="100%" callback={() => handleCreateChannel()}>
        <div className="buttonItem">
          <span>Create Channel</span>
          <Boost size={16}/>    
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleChangeIdentity()}>
        <div className="buttonItem">
          <span>Change Identity</span>
          <Boost size={16}/>    
        </div>
      </Button>
    </StyledServerDropdown>
  )
}

export default ServerDropdown
