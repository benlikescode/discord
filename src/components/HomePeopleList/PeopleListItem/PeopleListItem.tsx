import { FC, useEffect, useState } from 'react'
import { StyledPeopleListItem } from '.'
import { fireDb } from '../../../utils/firebase'
import { FriendActions } from '../../Popouts/FriendActions'
import { Popout } from '../../Popouts/Popout'
import { Button } from '../../System'
import { Avatar } from '../../System/Avatar'

type Props = {
  userId: string
}

const PeopleListItem: FC<Props> = ({ userId }) => {
  const [popoutOpen, setPopoutOpen] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0)
  const [otherUser, setOtherUser] = useState<any>({name: '', avatar: '', status: ''})


  const closePopout = () => {
    setPopoutOpen(false)
  }

  const handleFriendsActionClick = (e: any) => {
    e.preventDefault()
    setXpos(e.pageX)
    setYpos(e.pageY)
    setPopoutOpen(true)
  }


  const getUserDetails = async () => {
    const otherUser = await fireDb.collection('users').doc(userId).get()
    const otherUserDetails = {
      name: otherUser.data()!.username,
      avatar: otherUser.data()!.avatarUrl,
      status: otherUser.data()!.status
    }
    setOtherUser(otherUserDetails)
  }

  useEffect(() => {
    getUserDetails()
  }, [userId])

  return (
    <StyledPeopleListItem>
      <div className="peopleListItem">
        <div className="userInfo">
          <div className="avatar">
            <Avatar url={otherUser.avatar} status={otherUser.status} alt={`${otherUser.name}'s profile pic`} size={32}/>
          </div>
          <div className="text">
            <span className="name">{otherUser.name}</span>
            <span className="status">{otherUser.status}</span>
          </div>
        </div>
        <div className="actions">
          <Button type="icon2">
            <svg  aria-hidden="false" width="24" height="24" viewBox="0 0 24 24" fill="none"><path fill="currentColor" d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"></path></svg>
          </Button>
          <Button type="icon2" callback={(e: any) => handleFriendsActionClick(e)}>
            <svg aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path d="M24 0v24H0V0z"></path><path fill="currentColor" d="M12 16c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2zm0-6c1.1045695 0 2 .8954305 2 2s-.8954305 2-2 2-2-.8954305-2-2 .8954305-2 2-2z"></path></g></svg>
          </Button>
        </div>
      </div>
      {
        popoutOpen &&
          <Popout closePopout={closePopout}>
            <FriendActions cursorX={xpos} cursorY={ypos} userId="jDjhrc7QEXMX7gZXAND1CXmKX3w2"/>
          </Popout>
      }
    </StyledPeopleListItem>
  )
}

export default PeopleListItem
