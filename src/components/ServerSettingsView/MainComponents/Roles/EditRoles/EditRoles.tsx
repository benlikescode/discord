import { ArrowLeftIcon, PlusIcon } from '@heroicons/react/outline'
import { FC, useState, useEffect, ReactNode } from 'react'
import { StyledEditRoles } from '.'
import { Button, Icon } from '../../../../System'
import { useParams, useHistory } from 'react-router-dom'
import { RoleType } from '../../../../../types/'
import { fireDb } from '../../../../../utils/firebase'
import { RolePreview } from './RolePreview'
import { Input } from '../../../../System/Input'
import firebase from 'firebase'
import { Display } from './Display'
import { Permissions } from './Permissions'

const EditRoles: FC = () => {
  const { serverToken, channelToken }: any = useParams()
  const history = useHistory()
  const [roleIds, setRoleIds] = useState<string[]>([])
  const [permissions, setPermissions] = useState(['MX5XkG7GFuDU0EbiGx31', 'j6Yf5f33jU83MHd2KgGq'])
  const [activeRole, setActiveRole] = useState("")
  const [currTab, setCurrTab] = useState<ReactNode>()

  const loadRoles = async () => {
    const thisServer = await fireDb.collection('servers').doc(serverToken).get()
    const roleIds: string[] = thisServer.data()!.roles
    setRoleIds(roleIds)  
    setActiveRole(roleIds[0])            
  }

  useEffect(() => {
    loadRoles()
  }, [])

  const createRole = () => {
    fireDb.collection('roles').add({
      color: '#99aab5',
      name: 'new role',
      permissions: ['MX5XkG7GFuDU0EbiGx31', 'j6Yf5f33jU83MHd2KgGq'],
      rank: 100,
      memberCount: 0
    })
    .then((role) => {
      fireDb.collection('servers').doc(serverToken).update({
        roles: firebase.firestore.FieldValue.arrayUnion(role.id)
      })
    })
  }

  return (
    <StyledEditRoles>
      <div className="roleList">
        <div className="roleListHeader">
          <div className="roleListHeaderLeft">
            <Icon size={18}><ArrowLeftIcon /></Icon>
            <span className="backText">Back</span>
          </div>
          <div className="newRoleButton">
            <Button type="icon" callback={() => createRole()}>
              <Icon size={16} fill="#fff"><PlusIcon /></Icon>
            </Button>
          </div>
        </div>

        <div className="list">
          { 
          roleIds.map((roleId, idx) => (       
            <RolePreview key={idx} roleId={roleId} setActiveRole={setActiveRole} activeRole={activeRole}/>         
          ))
          }
          <RolePreview setActiveRole={setActiveRole} activeRole={activeRole}/>     
        </div>
       
      </div>

      <div className="editRoleSection">
        <div className="editRoleHeader">
          <div className="editRoleTitleContainer">
            <span>Edit Role - </span>
            <span>Top Frag</span>
          </div>
          <div className="tabBar">
            <div className="tabBarItem" onClick={() => setCurrTab(<Display />)}>Display</div>
            <div className="tabBarItem tabBarItemActive" onClick={() => setCurrTab(<Permissions />)}>Permissions</div>
            <div className="tabBarItem" onClick={() => setCurrTab(<Permissions />)}>Manage Members (0)</div>
          </div>
        </div>

        { currTab ? currTab : <Display /> }

      </div>
    </StyledEditRoles>
  )
}

export default EditRoles
