import { FC, useEffect, useState } from 'react'
import { StyledRolePreview } from '.'
import { fireDb } from '../../../../../../utils/firebase'
import { RoleType } from '../../../../../../types/'
import { useDispatch } from 'react-redux'
import { updateRole } from '../../../../../../reducers/role'

type Props = {
  roleId?: string
  setActiveRole: any
  activeRole: string
}

const RolePreview: FC<Props> = ({ roleId, setActiveRole, activeRole }) => {
  const [roleData, setRoleData] = useState<RoleType>({id: '', name: '@everyone', color: '#99aab5'})
  const dispatch = useDispatch()
  
  const getRoleData = async () => {
    const role = await fireDb.collection('roles').doc(roleId).get()
    setRoleData({
      id: role.id,
      name: role.data()!.name,
      color: role.data()!.color
    })   
  }

  const handleRoleClick = () => {
    setActiveRole(roleId)
    dispatch(updateRole({
      id: roleData.id,
      name: roleData.name,
      color: roleData.color
    }))
  }

  useEffect(() => {
    if (roleId) {
      getRoleData()
    }
  }, [roleId])

  return (
    <StyledRolePreview roleColor={roleData!.color} isActive={activeRole === roleId}>
      <div className="rolePreview" onClick={() => handleRoleClick()}>
        <div className="circle"></div>
        <div className="roleName">
          <span>{roleData!.name}</span>
        </div>
      </div>
    
    </StyledRolePreview>
  )
}

export default RolePreview
