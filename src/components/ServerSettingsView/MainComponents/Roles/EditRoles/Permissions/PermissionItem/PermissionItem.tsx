import { FC } from 'react'
import { StyledPermissionItem } from '.'
import { ToggleSwitch } from '../../../../../../System'

type Props = {
  name: string
  description: string
}

const PermissionItem: FC<Props> = ({ name, description }) => {
  return (
    <StyledPermissionItem>
      <div className="labelRow">
        <span className="label">{name}</span>
        <ToggleSwitch />
      </div>
      <div className="note">
        <span>{description}</span>
      </div>
      <div className="divider"></div>
    </StyledPermissionItem>
  )
}

export default PermissionItem
