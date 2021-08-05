import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/outline'
import { FC, useState } from 'react'
import { StyledAuditItem } from '.'
import { AuditType } from '../../../../../types'
import { formatDate, getAuditAction, getAuditIcon } from '../../../../../utils/helperFunctions'
import { Avatar, Icon } from '../../../../System'

// bans => optional dropdown with reason
// kick => no dropdown
// invite => code, unlimited uses
// removed ban => no dropdown
// created text channel => name, type
// created voice channel => name, type
// deleted role => no dropdown
// created role => name, granted permissions..., color
// changed server => whatever changes (Ex. name, avatar)

type Props = {
  audit: AuditType
}

const AuditItem: FC<Props> = ({ audit }) => {

  const [bottomOpen, setBottomOpen] = useState(false)

  const toggleBottom = () => {
    if (audit.hasDropdown) {
      setBottomOpen(prev => !prev) 
    } 
  }

  return (
    <StyledAuditItem hasDropdown={audit.hasDropdown} bottomOpen={bottomOpen} iconType={audit.iconType}>
      <div className="auditItem" onClick={() => toggleBottom()}>
        <div className="auditIcon">
          {getAuditIcon(audit.action)}
        </div>

        <div className="avatar">
          <Avatar url={audit.avatar} size={40} alt="profile pic"/>
        </div>

        <div className="content">
          <div className="top">
            <span className="label1">{audit.label1}</span>
            <span className="action">{` ${getAuditAction(audit.action)} `}</span>
            <span className="label2">
              <strong>{audit.label2}</strong>
            </span>
          </div>
          <div className="timestamp">
            <span>{formatDate(audit.timestamp)}</span>
          </div>
        </div>
        
        {audit.hasDropdown && 
          <div className="arrowIcon">
            <Icon size={18}>
              {!bottomOpen ? <ChevronRightIcon /> : <ChevronDownIcon />}
            </Icon>
          </div>
        }
      </div>

      {bottomOpen && 
        <>
          <div className="divider"></div>
          <div className="bottomSection">
            <div className="bottomItem">
              <span>{`With reason ${audit.banReason}`}</span>
            </div>
          </div>
        </>
      }
      
     
    </StyledAuditItem>
  )
}

export default AuditItem
