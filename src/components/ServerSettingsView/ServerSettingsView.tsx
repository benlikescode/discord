import { FC, useState } from 'react'
import { StyledServerSettingsView } from '.'
import { Roles, Overview } from './MainComponents'
import { EditRoles } from './MainComponents/Roles/EditRoles'
import { Sidebar } from './Sidebar'

const ServerSettingsView: FC = () => {

  const [currMainComponent, setCurrMainComponent] = useState(<Overview />)

  const deleteServer = () => {
    alert("SERVER DELETED")
  }

  return (
    <StyledServerSettingsView>
      <div className="sidebar">
        <Sidebar serverName="Test Server" deleteServer={deleteServer} setCurrMainComponent={setCurrMainComponent}/>
      </div>
      <div className="main">
        <div className="mainContent">
          { currMainComponent }
        </div>
      </div>
    </StyledServerSettingsView>
  )
}

export default ServerSettingsView
