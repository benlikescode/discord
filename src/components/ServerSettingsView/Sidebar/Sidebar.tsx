import { FC } from 'react'
import { Link } from 'react-router-dom'
import { StyledSidebar } from '.'
import { Button } from '../../System'

type Props = {
  serverName: string
  deleteServer: any
}

const Sidebar: FC<Props> = ({ serverName, deleteServer }) => {
  return (
    <StyledSidebar>
      <div className="section">
        <div className="header">
          <span>{serverName}</span>
        </div>
        <div className="buttonItem">Overview</div>
        <div className="buttonItem">Roles</div>
        <div className="buttonItem">Audit Log</div>
      </div>
      <div className="divider"></div>
      <div className="section">
        <div className="header">
          <span>User Management</span>
        </div>
        <div className="buttonItem">Members</div>
        <div className="buttonItem">Invites</div>
        <div className="buttonItem">Bans</div>
      </div> 
      <div className="divider"></div>  
      <div className="deleteServerButton">Delete Server</div>
    </StyledSidebar>
  )
}

export default Sidebar
