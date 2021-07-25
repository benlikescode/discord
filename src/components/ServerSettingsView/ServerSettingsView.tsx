import { FC } from 'react'
import { StyledServerSettingsView } from '.'
import { Roles, Overview } from './MainComponents'
import { EditRoles } from './MainComponents/Roles/EditRoles'
import { Sidebar } from './Sidebar'

const ServerSettingsView: FC = () => {

  const deleteServer = () => {
    alert("SERVER DELETED")
  }

  return (
    <StyledServerSettingsView>
      <div className="sidebar">
        <Sidebar serverName="Test Server" deleteServer={deleteServer}/>
      </div>
      <div className="main">
        <div className="mainContent">
          <EditRoles />
        </div>
      </div>
    </StyledServerSettingsView>
  )
}

export default ServerSettingsView
