import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { StyledAuditLog } from '.'
import { selectServer } from '../../../../reducers/server'
import { AuditType } from '../../../../types'
import { fireDb } from '../../../../utils/firebase'
import { Header } from '../Header'
import { AuditItem } from './AuditItem'

const AuditLog: FC = () => {
  const [auditItems, setAuditItems] = useState<AuditType[]>([])
  const server = useSelector(selectServer)

  const getAuditItems = async () => {
    fireDb.collection('servers').doc(server.id).collection('auditLog').onSnapshot(({ docs }) => {
      setAuditItems(docs.map(doc => ({...doc.data()} as AuditType)))
    })
  }

  useEffect(() => {
    if (server.id) {
      getAuditItems()
    } 
  }, [server.id])

  return (
    <StyledAuditLog>
      <Header title="Audit Log"/>
      <div className="auditLog">
        {
          auditItems.map((auditItem, idx) => (
            <AuditItem key={idx} audit={auditItem}/>
          ))
        }
      </div>
    </StyledAuditLog>
  )
}

export default AuditLog
