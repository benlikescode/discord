import { FC, useState } from 'react'
import { StyledUserSettingsView } from '.'
import { Button } from '../System'
import { Avatar } from '../System/Avatar'
import { fireDb, storage, auth, realDb } from '../../utils/firebase'
import { logOutUser, selectUser, updateAvatar } from '../../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const UserSettingsView: FC = () => {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const user = useSelector(selectUser)
  const history = useHistory()
  const dispatch = useDispatch()
  const usersDB = fireDb.collection('users')

  const handleImageUpload = async (e: any) => {
    if (e.target.files && e.target.files[0]) {
      const img = e.target.files[0]
      
      setImage(img)
      setImageUrl(URL.createObjectURL(img))
      
      const storageRef = storage.ref(user.name + '/profilePicture')
      
      const imageUpload = await storageRef.put(img)
      const imageUrl = await imageUpload.ref.getDownloadURL()

      await usersDB.doc(user.id).update({
        avatarUrl: imageUrl
      })

      const currUser = auth.currentUser
      currUser!.updateProfile({
        photoURL: imageUrl
      })

      dispatch(updateAvatar({avatar: imageUrl}))
    }
  }

  const logOut = async () => {
    await realDb.ref('status').child(user.id).update({
      status: 'Offline'
    })
    await auth.signOut() 
    history.push('/login')
  }

  return (
    <StyledUserSettingsView>
      <div className="settingsContainer">
        <div className="accountProfileCard">
          <div className="banner"></div>
          <div className="userInfo">
            <div className="avatar">
              <Avatar url={imageUrl ? imageUrl : user.avatar} size={80} alt="Your profile picture"/>
              <input type="file" className="avatarInput" onChange={(e) => handleImageUpload(e)}/>
              <div className="indicator"></div>
            </div>
            <div className="usernameLarge">
              <span>{user.name}</span>
            </div>          
          </div>
          <div className="editUsernameSection">
            <div className="editUsername">
              <div className="text">
                <div className="textTop">
                  <span>Username</span>
                </div>
                <div className="textBottom">
                  <span>{user.name}</span>
                </div>
              </div>
              <Button type="solid">Edit</Button>
            </div>
          </div>

        </div>
        <Button type="solid" callback={() => logOut()}>Logout</Button>
      </div>
    </StyledUserSettingsView>
  )
}

export default UserSettingsView
