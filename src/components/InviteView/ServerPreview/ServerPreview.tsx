import { FC, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledServerPreview } from '.'
import { selectUser } from '../../../reducers/user'
import { ServerType } from '../../../types'
import { fireDb, realDb } from '../../../utils/firebase'
import { Avatar } from '../../System'
import firebase from 'firebase'
import { getRandomGreeting } from '../../../utils/helperFunctions'

type Props = {
  serverId: string
  generalId: string
}

const ServerPreview: FC<Props> = ({ serverId, generalId }) => {
  const [serverDetails, setServerDetails] = useState<ServerType>()
  const [isBanned, setIsBanned] = useState(false)
  const [loading, setLoading] = useState(true)

  const user = useSelector(selectUser)
  const history = useHistory()

  const getServerDetails = async () => {
    const server = await fireDb.collection('servers').doc(serverId).get()
    setServerDetails({
      id: server.id, 
      name: server.data()!.name, 
      avatar: server.data()!.avatar,
      members: server.data()!.members,
      banList: server.data()!.banList
    })
    setLoading(false)
  }

  const handleAcceptInvite = async () => {
    if (serverDetails!.banList?.some(ban => ban.id === user.id)) {
      setIsBanned(true)
    }
    else {
      await addUserToServer()
    }
  }

  const addUserToServer = async () => {
    await fireDb.collection('servers').doc(serverId).collection('members').doc(user.id).set({
      username: user.name,
      nickname: '',
      roles: []
    })   
    await sendGreetingMessage(generalId)
    await fireDb.collection('servers').doc(serverId).update({
      members: firebase.firestore.FieldValue.arrayUnion(user.id)
    })
    history.push(`/server/${serverId}/${generalId}`)
  }

  const sendGreetingMessage = async (generalId: string) => {
    const greetingMsg = realDb.ref(generalId).push()
    greetingMsg.set({
      user: user.name,
      content: getRandomGreeting(),
      date: Date().toString(),
      systemMessage: true
    })
  }

  const handleGoHome = () => {
    history.push('/home')
  }

  useEffect(() => {
    if (serverId) {
      getServerDetails()
    }
  }, [serverId])

  return (
    <StyledServerPreview>
      {!loading &&
      <>
      <div className="avatarWrapper">
        <Avatar url={serverDetails!.avatar || ''} size={80}/>
      </div>
      <div className="label">{isBanned ? 'Uh oh...' : 'You have been invited to join'}</div>
       <h3 className="serverName">{isBanned ? 'You are banned' : serverDetails!.name}</h3>
       <div className="memberCount">{`${serverDetails!.members!.length} ${serverDetails!.members!.length === 1 ? 'Member' : 'Members'}`}</div>
       <button 
       className="acceptButton" 
       onClick={() => isBanned ? handleGoHome() : handleAcceptInvite()}
       >{isBanned ? 'Return Home' : 'Accept Invite'}</button> 
      </>
    }
     
    </StyledServerPreview>
  )
}

export default ServerPreview
