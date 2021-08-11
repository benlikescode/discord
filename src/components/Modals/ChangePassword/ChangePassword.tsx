import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { StyledChangePassword } from '.'
import { selectUser } from '../../../reducers/user'
import { auth } from '../../../utils/firebase'
import { ExitIcon } from '../../Icon'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: () => void
}

const ChangePassword: FC<Props> = ({ closeModal }) => {
  const user = useSelector(selectUser)
  const [newPasswordInput, setNewPasswordInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const changePassword = async () => {
    try {
      await auth.currentUser!.updatePassword(newPasswordInput)
      closeModal()
    }
    catch (error) {
      setErrorMessage(error.message)
    }
  }

  const isPasswordCorrect = async () => {
    try {
      const currUser = await auth.signInWithEmailAndPassword(user.email, passwordInput)
      if (!newPasswordInput) {
        setErrorMessage('New Password can not be empty')
      }
      else {             
        await changePassword()                  
      }   
    }
    catch (error) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Your current password is incorrect')
      }
    }  
  }
  
  return (
    <StyledChangePassword>
      <div className="topSection">
        <h2 className="header">Change your password</h2>

        <button className="closeModalBtn" onClick={() => closeModal()}>
          <ExitIcon size={24}/>
        </button>

        <div className="subHeader">Enter your current password and a new password</div>
      </div>
      
      <div className="inputsWrapper">
        <Input 
          label="Current Password" 
          type="password" 
          value={passwordInput} 
          callback={setPasswordInput}
        />
        <Input 
          label="New Password" 
          type="password" 
          value={newPasswordInput} 
          callback={setNewPasswordInput}
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
    </StyledChangePassword>
  )
}

export default ChangePassword
