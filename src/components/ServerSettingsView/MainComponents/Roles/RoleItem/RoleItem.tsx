import { DotsHorizontalIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { StyledRoleItem } from '.'
import { RoleType } from '../../../../../types'
import { fireDb } from '../../../../../utils/firebase'
import { DragIcon, Shield } from '../../../../Icon'
import { Button, Icon } from '../../../../System'
import firebase from 'firebase'
import { selectServer } from '../../../../../reducers/server'
import { useSelector } from 'react-redux'

type Props = {
  roleId: string
}

const RoleItem: FC<Props> = ({ roleId }) => {
  const [roleData, setRoleData] = useState<RoleType>({name: '', color: ''})
  const server = useSelector(selectServer)

  const getRoleData = async () => {
    const role = await fireDb.collection('roles').doc(roleId).get()
    setRoleData({
      name: role.data()!.name,
      color: role.data()!.color,
      memberCount: role.data()!.memberCount
    })  
  }

  const deleteRole = async () => {
    await fireDb.collection('roles').doc(roleId).delete()
    await fireDb.collection('servers').doc(server.id).update({
      roles: firebase.firestore.FieldValue.arrayRemove(roleId)
    }) 
  }

  // will have to check each role for this if the user does not contain this role
  const IS_LOCKED = false

  useEffect(() => {
    if (roleId) {
      getRoleData()
    }
  }, [roleId])

  return (
    <StyledRoleItem>
      <div className="dragIcon">
        <DragIcon size={16}/>
      </div>
      <div className="roleNameContainer">
        <div className="shieldIcon">
          <Shield size={22} fill={roleData!.color}/>
        </div>
        {IS_LOCKED && <Icon size={16} fill="#72767d"><LockClosedIcon /></Icon>}
        <span className="roleName">{roleData!.name}</span>
      </div>
      <div className="memberCountContainer">
        <span className="memberCount">{roleData!.memberCount}</span>
        <Icon size={16}><UserIcon /></Icon>
      </div>
      <div className="buttonsContainer">
        <Button type="icon2" callback={() => deleteRole()}>
          <Icon size={16}><DotsHorizontalIcon /></Icon>
        </Button>
      </div>
    </StyledRoleItem>
  )
}

export default RoleItem
