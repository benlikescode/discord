import { FC, useEffect, useState } from 'react'
import { StyledRolePreview } from '.'
import { fireDb } from '../../../../../../utils/firebase'
import { RoleType } from '../../../../../../types/'

type Props = {
  roleId?: string
  setActiveRole: any
  activeRole: string
}

const RolePreview: FC<Props> = ({ roleId, setActiveRole, activeRole }) => {
  const [roleData, setRoleData] = useState<RoleType>({name: '@everyone', color: '#99aab5'})

  const getRoleData = () => {
    if (roleId) {
      fireDb.collection('roles').doc(roleId).get()
      .then((role) => {
        const roleData = {
          name: role.data()!.name,
          color: role.data()!.color
        }
        setRoleData(roleData)
      })
    } 
  }

  useEffect(() => {
    getRoleData()
  }, [])

  return (
    <StyledRolePreview roleColor={roleData.color} isActive={activeRole === roleId}>
      <div className="rolePreview" onClick={() => setActiveRole(roleId)}>
        <div className="circle"></div>
        <div className="roleName">
          <span>{roleData.name}</span>
        </div>
      </div>
    
    </StyledRolePreview>
  )
}

export default RolePreview
