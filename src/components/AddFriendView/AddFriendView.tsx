import { FC, useState } from 'react'
import { StyledAddFriendView } from '.'
import { Button } from '../System'
import { Input } from '../System/Input'
import { config, fireDb } from '../../utils/firebase'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'

const AddFriendView: FC = () => {
  const user = useSelector(selectUser)
  const [username, setUsername] = useState("")

  const sendFriendRequest = () => {
    // adds your id to the other users friends array
    if (user.id) {
      fireDb.collection('users')
      .where('username', '==', username)
      .limit(1)
      .get()
      .then((query) => {
        const thing = query.docs[0]
        const friends = thing.data().friends
        const newVal = friends.concat(user.id)
        thing.ref.update({friends: newVal})   
        addToOurFriends(thing.id, thing.data().avatarUrl)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })      
    }
  }

  const addToOurFriends = (friendsId: string, friendsAvatar: string) => {
    fireDb.collection('users').doc(user.id).get()
      .then((query) => {
        const friends = query.data()!.friends
        const newFriends = friends.concat(friendsId)
        query.ref.update({friends: newFriends})
        createDirectMessage(friendsId, friendsAvatar)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
  }

  const createDirectMessage = (friendsId: string, friendsAvatar: string) => {
    const user1 = {
      name: user.name,
      avatar: user.avatar
    }
    const user2 = {
      name: username,
      avatar: friendsAvatar
    }
    fireDb.collection('directMessages').add({
      users: [friendsId, user.id],
      user1: user1,
      user2: user2
    }) 
  }

  return (
    <StyledAddFriendView>
      <div className="addFriendWrapper">
        <h2 className="header">Add Friend</h2>
        <div className="description">You can add a friend with their Discord Tag. It's cAsE sEnSitIvE!</div>
        <div className="inputForm">
          <Input placeholder="Enter a Username" type="text" callback={setUsername} value={username}/>
          <Button type="blue" callback={() => sendFriendRequest()}>Send Friend Request</Button>
        </div>
      </div>
     
    </StyledAddFriendView>
  )
}

export default AddFriendView
