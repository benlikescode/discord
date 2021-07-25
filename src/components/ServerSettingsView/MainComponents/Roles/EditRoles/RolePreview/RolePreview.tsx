import { FC } from 'react'
import { StyledRolePreview } from '.'

type Props = {
  roleColor: string
  roleName: string
}

const RolePreview: FC<Props> = ({ roleColor, roleName }) => {
  return (
    <StyledRolePreview roleColor={roleColor}>
      <div className="circle"></div>
      <div className="roleName">
        <span>{roleName}</span>
      </div>
    </StyledRolePreview>
  )
}

export default RolePreview
