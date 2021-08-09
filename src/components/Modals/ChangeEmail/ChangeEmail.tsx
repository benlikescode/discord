import { FC, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { StyledChangeEmail } from '.'
import { selectUser, updateEmail } from '../../../reducers/user'
import { auth } from '../../../utils/firebase'
import { ExitIcon } from '../../Icon'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: () => void
}

const ChangeEmail: FC<Props> = ({ closeModal }) => {
  const user = useSelector(selectUser)
  const [emailInput, setEmailInput] = useState("")
  const [passwordInput, setPasswordInput] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch()

  const changeEmail = async (currUser: any) => {
    await currUser.updateProfile({
      email: emailInput
    })
    auth.currentUser?.updateEmail(emailInput)
    dispatch(updateEmail({email: emailInput}))
    closeModal()
  }

  const isPasswordCorrect = async () => {
    try {
      const currUser = await auth.signInWithEmailAndPassword(user.email, passwordInput)
      if (!emailInput) {
        setErrorMessage('Email can not be empty')
      }
      else {
        if (emailInput === user.name) {
          closeModal()
        }
        else {         
          await changeEmail(currUser.user)        
        }      
      }   
    }
    catch (error) {
      if (error.code === 'auth/wrong-password') {
        setErrorMessage('Password does not match')
      }
    }  
  }

  return (
    <StyledChangeEmail>
       <div className="topSection">
        <h2 className="header">Enter an email address</h2>

        <button className="closeModalBtn" onClick={() => closeModal()}>
          <ExitIcon size={24}/>
        </button>

        <div className="subHeader">Enter a new email address and your existing password.</div>
      </div>
      
      <div className="inputsWrapper">
        <Input 
          label="Email" 
          type="text" 
          value={emailInput} 
          callback={setEmailInput}
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
    </StyledChangeEmail>
  )
}

export default ChangeEmail
