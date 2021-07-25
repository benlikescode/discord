import { ChevronRightIcon, UsersIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { StyledRoles } from '.'
import { Button, Icon } from '../../../System'
import { Searchbar } from '../../../System/Searchbar'
import { Header } from '../Header'
import { RoleItem } from './RoleItem'

const Roles: FC = () => {

  const createRole = () => {

  }

  return (
    <StyledRoles>
      <Header />
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
          <RoleItem roleName="Goat" roleColor="red" isLocked={true} memberCount={3}/>
          <RoleItem roleName="Drug Lord" roleColor="blue" isLocked={false} memberCount={2}/>
          <RoleItem roleName="Top Frag" roleColor="green" isLocked={false} memberCount={5}/>

        </div>
      </div>
    </StyledRoles>
  )
}

export default Roles
