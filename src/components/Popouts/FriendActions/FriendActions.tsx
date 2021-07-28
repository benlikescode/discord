import { FC } from 'react'
import { useSelector } from 'react-redux'
import { StyledFriendActions } from '.'
import { selectUser } from '../../../reducers/user'
import { fireDb } from '../../../utils/firebase'
import { Button } from '../../System'
import firebase from 'firebase'

type Props = {
  cursorX: number
  cursorY: number
  userId: string
}

const FriendActions: FC<Props> = ({ cursorX, cursorY, userId }) => {
  const user = useSelector(selectUser)

  const handleRemoveFriend = () => {
    if (user.id) {
      fireDb.collection('users').doc(user.id).update({
        friends: firebase.firestore.FieldValue.arrayRemove(userId)
      })
    }
  }

  const handleStartCall = () => {
    
  }

  return (
    <StyledFriendActions cursorX={cursorX} cursorY={cursorY}>
       <Button type="solid" width="100%" callback={() => handleStartCall()}>
        <div className="buttonItem">
          <span>Start Call</span>
        </div>
      </Button>
      <Button type="red" width="100%" callback={() => handleRemoveFriend()}>
        <div className="buttonItem">
          <span>Remove Friend</span>
        </div>
      </Button>
    </StyledFriendActions>
  )
}

export default FriendActions
