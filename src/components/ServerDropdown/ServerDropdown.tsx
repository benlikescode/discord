import { FC, useState } from 'react'
import { StyledServerDropdown } from '.'
import { Boost } from '../Icon'
import { Modal } from '../Modal'
import { Button, Icon } from '../System'
import { createInviteLink } from '../../utils/helperFunctions'
import { Link, useParams } from 'react-router-dom' 

type Props = {
  setServerDropdownOpen: any
  setInviteOpen?: any
}

interface ParamTypes {
  serverToken: string
}

const ServerDropdown: FC<Props> = ({ setServerDropdownOpen, setInviteOpen }) => {

  const [serverBoostOpen, setServerBoostOpen] = useState(false)
  const [serverSettingsOpen, setServerSettingsOpen] = useState(false)
  const [createChannelOpen, setCreateChannelOpen] = useState(false)
  const [changeIdentityOpen, setChangeIdentityOpen] = useState(false)
  const { serverToken } = useParams<ParamTypes>()

  const closeModal = () => {
    setServerBoostOpen(false)
    setInviteOpen(false)
    setServerSettingsOpen(false)
    setCreateChannelOpen(false)
    setChangeIdentityOpen(false)
  }

  const handleButtonClick = () => {
    setServerDropdownOpen(false)
  }

  return (
    <StyledServerDropdown>
      <Button type="solid" width="100%" callback={() => handleButtonClick()}>
        <div className="buttonItem">
          <span>Server Boost</span>
          <Boost size={16}/>    
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleButtonClick()}>
        <div className="buttonItem">
          <span>Invite People</span>
          <Boost size={16}/>    
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleButtonClick()}>
        <Link to={`/server/${serverToken}/settings`}>
          <div className="buttonItem">
            <span>Server Settings</span>
            <Boost size={16}/>    
          </div>
        </Link>  
      </Button>
      <Button type="solid" width="100%" callback={() => handleButtonClick()}>
        <div className="buttonItem">
          <span>Create Channel</span>
          <Boost size={16}/>    
        </div>
      </Button>
      <Button type="solid" width="100%" callback={() => handleButtonClick()}>
        <div className="buttonItem">
          <span>Change Identity</span>
          <Boost size={16}/>    
        </div>
      </Button>

      {/*
        inviteOpen && 
         <Modal 
          closeModal={ closeModal } 
          headerText={`Invite Friends To Server`}
          labelText={"SEND THIS INVITE LINK TO A FRIEND"}
          buttonText={"Copy"}
          modalFunction={"invite"}
          inviteLink={ createInviteLink() }
         />
         */
      }
    </StyledServerDropdown>
  )
}

export default ServerDropdown
