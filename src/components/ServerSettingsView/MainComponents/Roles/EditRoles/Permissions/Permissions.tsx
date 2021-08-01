import { FC } from 'react'
import { StyledPermissions } from '.'
import { Searchbar, ToggleSwitch } from '../../../../../System'
import { PermissionItem } from './PermissionItem'

const Permissions: FC = () => {
  return (
    <StyledPermissions>
      <Searchbar />
      <div className="header">
        <span>General Server Permissions</span>
        <span className="clearPermissions">Clear permissions</span>
      </div>

      <PermissionItem 
        label="View Channels" 
        note="Allows members to view channels by default (excluding private channels)."
      />

      <PermissionItem 
        label="View Channels" 
        note="Allows members to view channels by default (excluding private channels)."
      />

      <PermissionItem 
        label="View Channels" 
        note="Allows members to view channels by default (excluding private channels)."
      />

      <PermissionItem 
        label="View Channels" 
        note="Allows members to view channels by default (excluding private channels)."
      />

      <PermissionItem 
        label="View Channels" 
        note="Allows members to view channels by default (excluding private channels)."
      />

      <PermissionItem 
        label="View Channels" 
        note="Allows members to view channels by default (excluding private channels)."
      />

      <PermissionItem 
        label="View Channels" 
        note="Allows members to view channels by default (excluding private channels)."
      />

      
      
    </StyledPermissions>
  )
}

export default Permissions
