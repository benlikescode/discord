import { FC, useEffect, useState } from 'react'
import { StyledInvite } from '.'
import { ExitIcon } from '../../Icon'
import { Button, Input, Searchbar } from '../../System'
import { UserInfo } from '../../UserInfo'
import { fireDb, realDb } from '../../../utils/firebase'
import { selectUser } from '../../../reducers/user'
import { useSelector } from 'react-redux'
import { OtherUserInfo } from '../../OtherUserInfo'
import { selectServer } from '../../../reducers/server'
import { useParams } from 'react-router-dom'
import { getHostname } from '../../../utils/helperFunctions'


type Props = {
  closeModal: any
}

const Invite: FC<Props> = ({ closeModal }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [inviteLink, setInviteLink] = useState("")
  const [friendsIds, setFriendIds] = useState<string[]>([])
  const user = useSelector(selectUser)
  const { serverToken, channelToken }: any = useParams()
  const server = useSelector(selectServer)

  const copyInviteToClip = () => {
    const el = document.createElement('textarea')
    inviteLink && (el.value = inviteLink)
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    setIsCopied(true)
  }

  const handleInviteButton = async (otherUserId: string) => {
    const thisUser = await fireDb.collection('users').doc(user.id).get()
    const thisUsersDms = thisUser.data()!.dmIds
    for (const dm of thisUsersDms) {
      const currDmRef = await fireDb.collection('directMessages').doc(dm).get()
      if (currDmRef.data()!.users.includes(otherUserId)) {
        sendDMWithInvite(dm)
      }
    }
  }

  const sendDMWithInvite = async (DMId: string) => {
    const newMessage = await realDb.ref(DMId).child('messages').push()
    newMessage.set({
      user: user.name,
      content: inviteLink,
      date: Date().toString(),
      avatar: user.avatar
    })
  }

  const getFriends = async () => {
    const thisUser = await fireDb.collection('users').doc(user.id).get()
    let friendIds: string[] = thisUser.data()!.friends
    // getting members of this server to filter out friends that are already in the server
    const thisServer = await fireDb.collection('servers').doc(server.id).get()
    const serverMemberIds: string[] = thisServer.data()!.members
    const filteredFriends: string[] = []
    for (const currId of friendIds) {
      if (!serverMemberIds.includes(currId)) {
        filteredFriends.push(currId)    
      }
    }
    setFriendIds(filteredFriends)   
  }

  const getServersInviteLink = async () => {
    fireDb.collection('invites').where('serverId', '==', serverToken).onSnapshot(({ docs }) => {
      if (docs.length > 0) {
        let inviteId = docs.map(doc => doc.id)[0]
        setInviteLink(getHostname() + "invite/" + inviteId)
      }
      else {
        createInviteLink(serverToken, channelToken)       
      }
    }) 
  }

  const createInviteLink = async (serverId: string, generalId: string) => {
    const newInvite = await fireDb.collection('invites').add({
      serverId: serverId,
      generalId: generalId,
      dateCreated: Date.now()
    })
    setInviteLink(getHostname() + "invite/" + newInvite.id)
  }

  useEffect(() => {
    getFriends()
    getServersInviteLink()
  }, [])

  return (
    <StyledInvite>
      <div className="header">
        <h2>{`Invite Friends To ${server.name}`}</h2>
        <Searchbar />
      </div>  

      <button className="close-modal-btn" onClick={() => closeModal()}>
        <ExitIcon size={24}/>
      </button>

      <div className="friendsScroller">
        <div className="content">
          {
            friendsIds.map((id, idx) => (
              <div className="contentItem" key={idx}>
                <OtherUserInfo userId={id}/>
                <button className="inviteButton" onClick={() => handleInviteButton(id)}>Invite</button>
              </div>
            ))
          }
          
        
        </div>
      </div>

      <div className="footer">
        <label className="inputLabel">Or, Send A Server Invite Link To A Friend</label>
        <div className="modal-input-wrapper">
          {inviteLink && <Input value={inviteLink} type="text" readOnly/>}
          <Button type="blue" callback={() => copyInviteToClip()}>{isCopied ? 'Copied' : 'Copy'}</Button>
        </div>
      </div>
     

     
    </StyledInvite>
  )
}

export default Invite
