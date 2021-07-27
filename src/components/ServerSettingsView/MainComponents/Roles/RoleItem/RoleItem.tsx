import { DotsHorizontalIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledRoleItem } from '.'
import { RoleType } from '../../../../../types'
import { fireDb } from '../../../../../utils/firebase'
import { DragIcon, Shield } from '../../../../Icon'
import { Button, Icon } from '../../../../System'
import firebase from 'firebase'

type Props = {
  roleId: string
}

interface ParamTypes {
  serverToken: string
}

const RoleItem: FC<Props> = ({ roleId }) => {
  const { serverToken } = useParams<ParamTypes>()
  const [roleData, setRoleData] = useState<RoleType>({name: '', color: ''})

  const getRoleData = () => {
    if (roleId) {
      fireDb.collection('roles').doc(roleId).get()
      .then((role) => {
        const roleData = {
          name: role.data()!.name,
          color: role.data()!.color,
          memberCount: role.data()!.memberCount
        }
        setRoleData(roleData)
      })
    } 
  }

  const deleteRole = () => {
    fireDb.collection('roles').doc(roleId).delete().then(() => {
      fireDb.collection('servers').doc(serverToken).update({
        roles: firebase.firestore.FieldValue.arrayRemove(roleId)
      })
    })
  }

  // will have to check each role for this if the user does not contain this role
  const IS_LOCKED = false

  useEffect(() => {
    getRoleData()
  }, [])

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
