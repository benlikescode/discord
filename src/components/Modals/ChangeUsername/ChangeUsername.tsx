import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledChangeUsername } from '.'
import { selectUser, updateUsername } from '../../../reducers/user'
import { auth, fireDb } from '../../../utils/firebase'
import { ExitIcon } from '../../Icon'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: () => void
}

const ChangeUsername: FC<Props> = ({ closeModal }) => {
  const user = useSelector(selectUser)
  const [usernameInput, setUsernameInput] = useState(user.name)
  const [passwordInput, setPasswordInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch()

  const changeUsername = async (currUser: any) => {
    await fireDb.collection('users').doc(user.id).update({
      username: usernameInput
    })
    await currUser.updateProfile({
      displayName: usernameInput,
    })
    dispatch(updateUsername({name: usernameInput}))
    closeModal()
  }

  const isPasswordCorrect = async () => {
    try {
      const currUser = await auth.signInWithEmailAndPassword(user.email, passwordInput)
      const nameTaken = await isUsernameTaken()
      if (!usernameInput) {
        setErrorMessage('Username can not be empty')
      }
      else {
        if (usernameInput === user.name) {
          closeModal()
        }
        else {
          if (!nameTaken) {
            await changeUsername(currUser.user)
          }
          else {
            setErrorMessage('Username taken')
          }
        }      
      }   
    }
    catch (error) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Password does not match')
      }
    }  
  }

  const isUsernameTaken = async () => {
    const query = await fireDb.collection('users').where('username', '==', usernameInput).get()
    return query.size > 0
  }

  return (
    <StyledChangeUsername>
      <div className="topSection">
        <h2 className="header">Change your username</h2>

        <button className="closeModalBtn" onClick={() => closeModal()}>
          <ExitIcon size={24}/>
        </button>

        <div className="subHeader">Enter a new username and your existing password</div>
      </div>
      
      <div className="inputsWrapper">
        <Input 
          label="Username" 
          type="text" 
          value={user.name || usernameInput} 
          callback={setUsernameInput}
        />
        <Input 
          label="Current Password" 
          type="password" 
          callback={setPasswordInput}
        />
        <span className="errorMessage">{errorMessage}</span>
      </div>

      <ModalFooter 
        closeModal={closeModal} 
        actionLabel="Done" 
        cancelLabel="Cancel" 
        actionCallback={isPasswordCorrect}
        actionPrimaryColor="#7289da"
      />
    </StyledChangeUsername>
  )
}

export default ChangeUsername
