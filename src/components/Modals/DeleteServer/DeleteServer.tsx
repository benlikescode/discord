import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledDeleteServer } from '.'
import { selectServer } from '../../../reducers/server'
import { fireDb } from '../../../utils/firebase'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: any
}

const DeleteServer: FC<Props> = ({ closeModal }) => {
  const [inputVal, setInputVal] = useState("")
  const [showErrorMessage, setShowErrorMessage] = useState(false)
  const server = useSelector(selectServer)
  const history = useHistory()

  const deleteServer = () => {
    if (inputVal === server.name) {
      // can do more later to remove irrelevant details from db like this servers channels, roles etc.
      fireDb.collection('servers').doc(server.id).delete().then(() => {
        history.push('/home')
      })
    }
    else {
      setShowErrorMessage(true)
    }
  }

  return (
    <StyledDeleteServer>
      <h2 className="header">{`Delete '${server.name}'`}</h2>
      <div className="content">
        <div className="warningLabel">
          <span>Are you sure you want to delete </span>
          <strong>{server.name}</strong>
          <span>? This action cannot be undone.</span>
        </div>
        <Input 
          placeholder="" 
          type="text" 
          value={inputVal} 
          callback={setInputVal} 
          errorMessage={showErrorMessage ? "You didn't enter the server name correctly" : ""}
          label="Enter Server Name"
        />
      </div>
      
      <ModalFooter cancelLabel="Cancel" actionLabel="Delete Server" actionCallback={deleteServer} closeModal={closeModal}/>
    </StyledDeleteServer>
  )
}

export default DeleteServer
