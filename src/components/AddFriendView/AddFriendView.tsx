import { FC, useState } from 'react'
import { StyledAddFriendView } from '.'
import { Button } from '../System'
import { Input } from '../System/Input'
import { fireDb } from '../../utils/firebase'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'
import firebase from 'firebase'
import { useHistory } from 'react-router-dom'

const AddFriendView: FC = () => {
  const user = useSelector(selectUser)
  const [username, setUsername] = useState("")
  const history = useHistory()
  const [message, setMessage] = useState("")

  // adds your id to the other users friends array
  const sendFriendRequest = async () => {
    if (user.id) {
      const query = await fireDb.collection('users').where('username', '==', username).limit(1).get() 
      if (query.size !== 0) {
        const otherUser = query.docs[0]
        const areAlreadyFriends = await alreadyFriends(otherUser.id)
        const isThisUser = (otherUser.id === user.id)
      
        if (!areAlreadyFriends) {

          if (!isThisUser) {
            otherUser.ref.update({
              friends: firebase.firestore.FieldValue.arrayUnion(user.id),
              directMessages: firebase.firestore.FieldValue.arrayUnion(user.id)
            })
            addToOurFriends(otherUser.id, otherUser.data().avatarUrl)
          }
          else {
            setMessage("You can't add yourself silly!")
          }  

        }  
        else {
          setMessage("You're already friends with that user!")
        } 
      }
      else {
        setMessage("Hm, didn't work. Double check that the capitalization, spelling, any spaces, and numbers are correct.")
      }                 
    }
  }

  const addToOurFriends = async (friendsId: string, friendsAvatar: string) => {
    const alreadyHasDM = await alreadyHasDirectMessage(friendsId)
    await fireDb.collection('users').doc(user.id).update({
      friends: firebase.firestore.FieldValue.arrayUnion(friendsId),
      directMessages: firebase.firestore.FieldValue.arrayUnion(friendsId)
    })
    setMessage(`Success! Your friend request to ${username} was sent.`)
    createDirectMessage(friendsId, friendsAvatar, alreadyHasDM)
  }

  const createDirectMessage = async (friendsId: string, friendsAvatar: string, alreadyHasDM: boolean) => {
    if (!alreadyHasDM) {
      const user1 = {
        name: user.name,
        avatar: user.avatar
      }
      const user2 = {
        name: username,
        avatar: friendsAvatar
      }
      const dmRef = await fireDb.collection('directMessages').add({
        users: [friendsId, user.id],
        user1: user1,
        user2: user2
      })
      await fireDb.collection('users').doc(user.id).update({
        dmIds: firebase.firestore.FieldValue.arrayUnion(dmRef.id)
      })
      await fireDb.collection('users').doc(friendsId).update({
        dmIds: firebase.firestore.FieldValue.arrayUnion(dmRef.id)
      })
    }
  }

  const alreadyFriends = async (otherUserId: string) => {
    const thisUser = await fireDb.collection('users').doc(user.id).get()
    return thisUser.data()!.friends.includes(otherUserId)
  }

  const alreadyHasDirectMessage = async (otherUserId: string) => {
    const thisUser = await fireDb.collection('users').doc(user.id).get()
    return thisUser.data()!.directMessages.includes(otherUserId)
  }

  return (
    <StyledAddFriendView messageColor={message ? ((message[0] === 'Y' || message[0] === 'H') ? '#ED4245' : '#4FDC7C') : '#DCDDDE'}>
      <div className="addFriendWrapper">
        <h2 className="header">Add Friend</h2>
        <div className="description">{message ? message : "You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!"}</div>
        <div className="inputForm">
          <Input placeholder="Enter a Username" type="text" callback={setUsername} value={username}/>
          <Button type="blue" callback={() => sendFriendRequest()}>Send Friend Request</Button>
        </div>
      </div>
     
    </StyledAddFriendView>
  )
}

export default AddFriendView
