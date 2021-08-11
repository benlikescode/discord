import { FC, useState } from 'react'
import { StyledUserSettingsView } from '.'
import { Button } from '../System'
import { Avatar } from '../System/Avatar'
import { fireDb, storage, auth, realDb } from '../../utils/firebase'
import { logOutUser, selectUser, updateAvatar } from '../../reducers/user'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Modal } from '../Modals'
import { ChangeUsername } from '../Modals/ChangeUsername'
import { hideEmail } from '../../utils/helperFunctions'
import { Header } from '../ServerSettingsView/MainComponents/Header'
import { ChangeEmail } from '../Modals/ChangeEmail'
import { ChangePassword } from '../Modals/ChangePassword'
import { DeleteAccount } from '../Modals/DeleteAccount'

const UserSettingsView: FC = () => {
  const [image, setImage] = useState(null)
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const user = useSelector(selectUser)
  const history = useHistory()
  const dispatch = useDispatch()
  const usersDB = fireDb.collection('users')

  const [usernameModalOpen, setUsernameModalOpen] = useState(false)
  const [emailModalOpen, setEmailModalOpen] = useState(false)
  const [passwordModalOpen, setPasswordModalOpen] = useState(false)
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)

  const [emailHidden, setEmailHidden] = useState(true)

  const closeModal = () => {
    setUsernameModalOpen(false)
    setEmailModalOpen(false)
    setPasswordModalOpen(false)
    setDeleteAccountModalOpen(false)
  }

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
        <Header title="My Account"/>
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
              <button className="editButton" onClick={() => setUsernameModalOpen(true)}>Edit</button>
            </div>
          </div>

          <div className="editUsernameSection">
            <div className="editUsername">
              <div className="text">
                <div className="textTop">
                  <span>Email</span>
                </div>
                <div className="textBottom">
                  <span>{emailHidden ? (user.email ? hideEmail(user.email) : '') : user.email}</span>
                  <button className="revealEmail" onClick={() => setEmailHidden(prev => !prev)}>{emailHidden ? 'Reveal' : 'Hide'}</button>
                </div>
              </div>
              <button className="editButton" onClick={() => setEmailModalOpen(true)}>Edit</button>
            </div>
          </div>

        </div>

        <div className="divider"></div>

        <div className="passwordSection">
          <div>
            <h2 className="header">Password and Authentication</h2>
            <Button type="blue" callback={() => setPasswordModalOpen(true)}>Change Password</Button>
          </div>
          <div className="imageWrapper">
            <img src="https://discord.com/assets/cdea41ede63f61153e4a3c0531fa3873.svg" alt="" />
          </div>
         
        </div>

        <div className="divider"></div>

        <div className="accountRemovalSection">
          <h5 className="accountRemovalHeader">Account Removal</h5>
          <div className="accountRemovalLabel">Deleting your account is a permanent action that can not be undone.</div>

          <div className="accountRemovalBtns">
            <button className="deleteAccountBtn" onClick={() => setDeleteAccountModalOpen(true)}>Delete Account</button>
            <button className="logoutBtn" onClick={() => logOut()}>Logout</button>
          </div>

        </div>
        
      </div>

      {usernameModalOpen &&
        <Modal closeModal={closeModal}>
          <ChangeUsername closeModal={closeModal}/>
        </Modal>
      }

      {emailModalOpen &&
        <Modal closeModal={closeModal}>
          <ChangeEmail closeModal={closeModal}/>
        </Modal>
      }

      {passwordModalOpen && 
        <Modal closeModal={closeModal}>
          <ChangePassword closeModal={closeModal}/>
        </Modal>
      }

      {deleteAccountModalOpen &&
        <Modal closeModal={closeModal}>
          <DeleteAccount closeModal={closeModal}/>
        </Modal>
      }

    </StyledUserSettingsView>
  )
}

export default UserSettingsView
