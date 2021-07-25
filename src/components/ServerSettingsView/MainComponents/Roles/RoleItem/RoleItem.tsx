import { DotsHorizontalIcon, LockClosedIcon, UserIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { StyledRoleItem } from '.'
import { DragIcon, Shield } from '../../../../Icon'
import { Icon } from '../../../../System'

type Props = {
  roleName: string
  roleColor: string
  isLocked: boolean
  memberCount: number
  roleId?: string
}

const RoleItem: FC<Props> = ({ roleName, roleColor, isLocked, memberCount, roleId }) => {
  return (
    <StyledRoleItem>
      <div className="dragIcon">
        <DragIcon size={16}/>
      </div>
      <div className="roleNameContainer">
        <Shield size={16}/>
        {isLocked && <Icon size={16} fill="#72767d"><LockClosedIcon /></Icon>}
        <span className="roleName">{roleName}</span>
      </div>
      <div className="memberCountContainer">
        <span>{memberCount}</span>
        <Icon size={16}><UserIcon /></Icon>
      </div>
      <div className="buttonsContainer">
        <button>
          <Icon size={16}><DotsHorizontalIcon /></Icon>
        </button>
      </div>
    </StyledRoleItem>
  )
}

export default RoleItem
