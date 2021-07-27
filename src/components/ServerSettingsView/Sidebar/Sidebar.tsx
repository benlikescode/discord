import { FC, useState } from 'react'
import { Link } from 'react-router-dom'
import { StyledSidebar } from '.'
import { DeleteServer } from '../../Modals'
import { Button } from '../../System'
import { Overview, Roles } from '../MainComponents'
import { Modal } from '../../Modals'

type Props = {
  serverName: string
  deleteServer: any
  setCurrMainComponent: any
}

const Sidebar: FC<Props> = ({ serverName, deleteServer, setCurrMainComponent }) => {

  const [modalOpen, setModalOpen] = useState(false)

  const closeModal = () => {
    setModalOpen(false)
  }

  const handleButtonItemClick = (buttonItem: string) => {
    switch(buttonItem) {
      case "Overview":
        setCurrMainComponent(<Overview />)
        break;
      case "Roles":
        setCurrMainComponent(<Roles setCurrMainComponent={setCurrMainComponent}/>)
        break;
      default:
        setCurrMainComponent(<Overview />)
    }
  }

  const handleDeleteServer = () => {
    setModalOpen(true)
  }

  return (
    <StyledSidebar>
      <div className="section">
        <div className="header">
          <span>{serverName}</span>
        </div>
        <div className="buttonItem" onClick={() => handleButtonItemClick("Overview")}>Overview</div>
        <div className="buttonItem" onClick={() => handleButtonItemClick("Roles")}>Roles</div>
        <div className="buttonItem" onClick={() => handleButtonItemClick("Audit Log")}>Audit Log</div>
      </div>
      <div className="divider"></div>
      <div className="section">
        <div className="header">
          <span>User Management</span>
        </div>
        <div className="buttonItem" onClick={() => handleButtonItemClick("Members")}>Members</div>
        <div className="buttonItem" onClick={() => handleButtonItemClick("Invites")}>Invites</div>
        <div className="buttonItem" onClick={() => handleButtonItemClick("Bans")}>Bans</div>
      </div> 
      <div className="divider"></div>  
      <div className="deleteServerButton" onClick={() => handleDeleteServer()}>Delete Server</div>
      {modalOpen && 
        <Modal closeModal={closeModal}>
          <DeleteServer closeModal={closeModal}/>
        </Modal>
      }
    </StyledSidebar>
  )
}

export default Sidebar
