import { FC, useState } from 'react'
import { StyledUserSettingsView } from '.'
import { Button } from '../System'
import { Avatar } from '../System/Avatar'
import { config, fireDb, storage } from '../../utils/firebase'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'

const UserSettingsView: FC = () => {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const user = useSelector(selectUser)

  const handleImageUpload = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      let img = e.target.files[0]
      setImage(img)
      setImageUrl(URL.createObjectURL(img))
      const storageRef = storage.ref(user.name + '/profilePicture')
      const task = storageRef.put(img)
      task.snapshot.ref.getDownloadURL().then((url) => {
        if (user) {
          fireDb.collection('users').doc(user.uid).get()
          .then((query) => {
            query.ref.update({avatarUrl: url})
          })
          .catch((error) => {
            console.log("Error getting documents: ", error);
          })
        }
      })
    }
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
      </div>
    </StyledUserSettingsView>
  )
}

export default UserSettingsView
