import { FC } from 'react'
import { StyledPermissionItem } from '.'
import { ToggleSwitch } from '../../../../../../System'

type Props = {
  label: string
  note: string
}

const PermissionItem: FC<Props> = ({ label, note }) => {
  return (
    <StyledPermissionItem>
      <div className="labelRow">
        <span className="label">{label}</span>
        <ToggleSwitch />
      </div>
      <div className="note">
        <span>{note}</span>
      </div>
      <div className="divider"></div>
    </StyledPermissionItem>
  )
}

export default PermissionItem
