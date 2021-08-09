import { FC, useEffect, useState } from 'react'
import { InviteViewStyled } from '.'
import splashImage from './splash.png'
import { useHistory, useParams } from 'react-router-dom'
import { fireDb, realDb } from '../../utils/firebase'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'
import { InviteInvalid } from './InviteInvalid'
import { ServerPreview } from './ServerPreview'

const InviteView: FC = () => {
  const history = useHistory()
  const user = useSelector(selectUser)
  const { inviteToken }: any = useParams()

  const [invitedServerId, setInvitedServerId] = useState("")
  const [invitedGeneralId, setInvitedGeneralId] = useState("")
  const [invalidView, setInvalidView] = useState(false)
  const [serverPreview, setServerPreview] = useState(false)

  const handleInvite = async () => {
    const inviteRef = await fireDb.collection('invites').doc(inviteToken).get()
    if (inviteRef.exists) {
      const serverId = inviteRef.data()!.serverId
      const generalId = inviteRef.data()!.generalId
      const query = await fireDb.collection('servers').doc(serverId).collection('members').doc(user.id).get()
      
      if (query.exists) {
        history.push(`/server/${serverId}/${generalId}`)
      }
      else {
        setInvitedServerId(serverId)
        setInvitedGeneralId(generalId)
        setServerPreview(true)
      }   
    }
    else {
      setInvalidView(true)
    }
  }

  useEffect(() => {
    if (user.id) {
      handleInvite()
    }
  }, [user.id])

  return (
    <InviteViewStyled >
      <img src={ splashImage } className="splashImage" alt="" />
      { invalidView && <InviteInvalid /> }
      { serverPreview && <ServerPreview serverId={invitedServerId} generalId={invitedGeneralId}/> }
    </InviteViewStyled>
  )
}

export default InviteView
