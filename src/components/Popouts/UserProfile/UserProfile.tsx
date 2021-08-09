import { FC, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledUserProfile } from '.'
import { selectServer } from '../../../reducers/server'
import { UserType } from '../../../types'
import { fireDb, realDb } from '../../../utils/firebase'
import { getAverageRgb } from '../../../utils/helperFunctions'
import { Avatar } from '../../System'
import { Popout } from '../Popout'
import { Roles } from '../Roles'

type Props = {
  userId: string
  closePopout: () => void
  cursorX: number
  cursorY: number
}

const UserProfile: FC<Props> = ({ userId, closePopout, cursorX, cursorY }) => {
  const [user, setUser] = useState({name: '', avatar: '', nickname: ''})
  const [userStatus, setUserStatus] = useState<'Online' | 'Offline' | 'Idle' | 'Busy'>("Offline")
  const [bannerColor, setBannerColor] = useState('gray')
  const [rolesPopoutOpen, setRolesPopoutOpen] = useState(false)
  const [xpos, setXpos] = useState(0)
  const [ypos, setYpos] = useState(0) 

  const server = useSelector(selectServer)

  const getUserDetails = async () => {
    const user = await fireDb.collection('users').doc(userId).get()
    const thisMember = await fireDb.collection('servers').doc(server.id).collection('members').doc(userId).get()
    setUser({name: user.data()!.username, avatar: user.data()!.avatarUrl, nickname: thisMember.data()!.nickname})
  }

  const closeRolesPopout = () => {
    setRolesPopoutOpen(false)
  }

  const handleAddRole = (e: any) => {
    setXpos(e.pageX - 125)
    setYpos(e.pageY + 20)
    setRolesPopoutOpen(true)
  }

  useEffect(() => {
    if (userId && server.id) {
      getUserDetails()
    }
    realDb.ref('status').child(userId).on('value', (snapshot) => {
      setUserStatus(snapshot.val().status)
    })
  }, [userId, server.id])

  return (
    <StyledUserProfile bannerColor={bannerColor} cursorX={cursorX} cursorY={cursorY}>
      <div className="banner"></div>
      <div className="avatarWrapper">
        <Avatar url={user.avatar || ''} size={80} status={userStatus}/>
      </div>
      <div className="headerTop">
        <span className="largeName">{user.nickname || user.name}</span>
        <span className="smallName">{user.nickname && user.name}</span>
      </div>
      <div className="body">
        <div className="divider"></div>
        <div className="bodyInnerWrapper">
          <h3 className="roleTitle">No Roles</h3>
          <div className="roleList">
            <button className="addRoleBtn" onClick={(e) => handleAddRole(e)}>
              <svg aria-hidden="true" width="14" height="14" viewBox="0 0 24 24"><path fill="currentColor" d="M20 11.1111H12.8889V4H11.1111V11.1111H4V12.8889H11.1111V20H12.8889V12.8889H20V11.1111Z"></path></svg>
            </button>
          </div>
        </div>
      </div>

      {
        rolesPopoutOpen &&
        <Popout closePopout={closeRolesPopout}>
          <Roles cursorX={xpos} cursorY={ypos}/>
        </Popout>
      }
    </StyledUserProfile>
  )
}

export default UserProfile
