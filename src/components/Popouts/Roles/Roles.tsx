import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledRoles } from '.'
import { fireDb } from '../../../utils/firebase'
import { RolePreview } from '../../ServerSettingsView/MainComponents/Roles/EditRoles/RolePreview'
import { Searchbar } from '../../System'

type Props = {
  cursorX: number
  cursorY: number
}

const Roles: FC<Props> = ({ cursorX, cursorY }) => {
  const [roleIds, setRoleIds] = useState<string[]>([])
  const [activeRole, setActiveRole] = useState("")

  const { serverToken }: any = useParams()

  const loadRoles = async () => {
    const thisServer = await fireDb.collection('servers').doc(serverToken).get()
    setRoleIds(thisServer.data()!.roles)  
  }

  useEffect(() => {
    loadRoles()
  }, [])

  return (
    <StyledRoles cursorX={cursorX} cursorY={cursorY}>
      <div className="rolesWrapper">
        <Searchbar />
        <div className="roleList">
        { 
          roleIds.map((roleId, idx) => (       
            <RolePreview 
              key={idx} 
              roleId={roleId} 
              setActiveRole={setActiveRole} 
              activeRole={activeRole}
            />         
          ))
        }
        </div>
      </div>
    </StyledRoles>
  )
}

export default Roles
