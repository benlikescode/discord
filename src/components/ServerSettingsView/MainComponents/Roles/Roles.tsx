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
import { useParams } from 'react-router-dom'

type Props = {
  setCurrMainComponent: any
}

interface ParamTypes {
  serverToken: string
}

const Roles: FC<Props> = ({ setCurrMainComponent }) => {
  const server = useSelector(selectServer)
  const { serverToken } = useParams<ParamTypes>()
  const [roleIds, setRoleIds] = useState<string[]>([])


  // for whatever reason, when refereshing the edit roles page when using server from redux, we get an error as if we lost the server state on refresh?...

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
    goToEditRoles()
  }

  const goToEditRoles = () => {
    setCurrMainComponent(<EditRoles />)
  }

  const loadRoles = () => {
    fireDb.collection('servers').doc(serverToken).get()
    .then((server) => {
      const roleIds: string[] = server.data()!.roles
      setRoleIds(roleIds)  
    })
  }

  useEffect(() => {
    loadRoles()
  }, [])

 

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
            <span>@everyone • applies to all members</span>         
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
          <Button type="blue" callback={createRole}>Create Role</Button>
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
