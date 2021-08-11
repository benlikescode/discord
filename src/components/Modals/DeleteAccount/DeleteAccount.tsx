import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledDeleteAccount } from '.'
import { selectUser } from '../../../reducers/user'
import { auth, fireDb } from '../../../utils/firebase'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: () => void
}

const DeleteAccount: FC<Props> = ({ closeModal }) => {
  const [inputVal, setInputVal] = useState("")
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const user = useSelector(selectUser)
  const history = useHistory()

  const deleteAccount = async () => {
    await fireDb.collection('users').doc(user.id).delete()
    await auth.currentUser!.delete()
    history.push('/')
  }

  const isPasswordCorrect = async () => {
    try {
      const currUser = await auth.signInWithEmailAndPassword(user.email, inputVal)
      await deleteAccount()
    }
    catch (error) {
      if (error.code === 'auth/wrong-password') {
        setShowErrorMessage(true)
      }
    }  
  }

  return (
    <StyledDeleteAccount>
      <h2 className="header">Delete Account</h2>
      <div className="content">
        <div className="warningLabel">
          <span>Are you sure that you want to delete your account? This will immediately log you out of your account and you will not be able to login again.</span>
        </div>
        <Input 
          placeholder="" 
          type="password" 
          value={inputVal} 
          callback={setInputVal} 
          errorMessage={showErrorMessage ? 'Password does not match' : ''}
          label="Password"
        />
      </div>
      
      <ModalFooter 
        cancelLabel="Cancel" 
        actionLabel="Delete Account" 
        actionCallback={isPasswordCorrect} 
        closeModal={closeModal}
        actionPrimaryColor="#7289da"
      />
    </StyledDeleteAccount>
  )
}

export default DeleteAccount
