import { ChevronRightIcon, UsersIcon } from '@heroicons/react/outline'
import { FC, useEffect, useState } from 'react'
import { StyledRoles } from '.'
import { Button, Icon } from '../../../System'
import { Searchbar } from '../../../System/Searchbar'
import { Header } from '../Header'
import { RoleItem } from './RoleItem'
import { fireDb } from '../../../../utils/firebase'
import { EditRoles } from './EditRoles'
import { selectServer } from '../../../../reducers/server'
import { useSelector } from 'react-redux'
import firebase from 'firebase'

type Props = {
  setCurrMainComponent: any
}

const Roles: FC<Props> = ({ setCurrMainComponent }) => {
  const server = useSelector(selectServer)
  const [roleIds, setRoleIds] = useState<string[]>([])

  const createRole = async () => {
    const newRole = await fireDb.collection('roles').add({
      color: '#99aab5',
      name: 'new role',
      permissions: ['MX5XkG7GFuDU0EbiGx31', 'j6Yf5f33jU83MHd2KgGq'],
      rank: 100,
      memberCount: 0
    })
    await fireDb.collection('servers').doc(server.id).update({
      roles: firebase.firestore.FieldValue.arrayUnion(newRole.id)
    })
    goToEditRoles()
  }

  const goToEditRoles = () => {
    setCurrMainComponent(<EditRoles setCurrMainComponent={setCurrMainComponent}/>)
  }

  const loadRoles = async () => {
    const thisServer = await fireDb.collection('servers').doc(server.id).get()  
    setRoleIds(thisServer.data()!.roles)  
  }

  useEffect(() => {
    if (server.id) {
      loadRoles()
    }
  }, [server.id])

  return (
    <StyledRoles>
      <Header title="Roles"/>
      <span className="description">Use roles to organize your server members and customize their permissions.</span>

      <div className="defaultPermissions">
        <div className="usersIcon">
          <Icon size={18}><UsersIcon /></Icon>
        </div>
        <div className="defaultPermsContent">
          <div className="defaultPermsHeader">
            <span>Default Permissions</span>
          </div>
          <div className="defaultPermsBody">
            <span>@everyone ??? applies to all members</span>         
          </div>
        </div>
        <div className="leftArrow">
          <Icon size={18}><ChevronRightIcon /></Icon>
        </div>
      </div>

      <span className="description2">Members use the color of the highest role they have on this list. Drag roles to reorder them.</span>

      <div className="searchContainer">
        <div className="searchBar">
          <Searchbar />
        </div>
        <div className="createRoleButton">
          <Button type="blue" callback={() => createRole()}>Create Role</Button>
        </div>
      </div>

      <div className="roleList">
        <div className="roleListHeader">
          <div className="dragSpacing"></div>
          <div className="rolesCount">{`Roles - ${roleIds.length}`}</div>
          <div className="membersLabel">Members</div>
          <div className="buttonsSpacing"></div>
        </div>
        <div className="divider"></div>
        <div className="roleListItems">
          {
            roleIds.map((roleId, idx) => (
              <>
                <div key={idx} className="roleItem" onClick={() => goToEditRoles()}>
                  <RoleItem roleId={roleId}/>
                </div>
                <div className="divider"></div>
              </>
            ))
          }  
        </div>
      </div>
    </StyledRoles>
  )
}

export default Roles
