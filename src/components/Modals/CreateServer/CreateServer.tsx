import { FC, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { StyledCreateServer } from '.'
import { selectUser } from '../../../reducers/user'
import { fireDb } from '../../../utils/firebase'
import { ExitIcon } from '../../Icon'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: any
}

const CreateServer: FC<Props> = ({ closeModal }) => {
  const [inputVal, setInputVal] = useState("")
  const user = useSelector(selectUser)
  const history = useHistory()

  const createServer = () => {
    fireDb.collection('servers').add({
      name: inputVal,
      avatar: "",
      members: [user.id],
      owner: user.id,
      roles: [],
      banList: []
    })
    .then((server) => addGeneralChannel(server)) 
  }

  const addGeneralChannel = (server: any) => {
    fireDb.collection("channels").add({
      name: "general",
      serverToken: server.id,
      createdAt: Date.now()
    })
    .then((channel) => {
      fireDb.collection('servers').doc(server.id).update({generalId: channel.id})
      closeModal()
      history.push(`/server/${server.id}/${channel.id}`)
      window.location.reload()
    })
  }

  return (
    <StyledCreateServer>
      <div className="header">
        <h2>Create New Server</h2>
      </div>
      
      <button className="close-modal-btn" onClick={() => closeModal()}>
        <ExitIcon size={24}/>
      </button>

      <div className="modal-input-wrapper">
       <Input placeholder="new-server" value={inputVal} callback={setInputVal} type="text" label="Server Name"/>
      </div>

      <ModalFooter 
        cancelLabel="Cancel" 
        actionLabel="Create Server" 
        actionCallback={createServer} 
        closeModal={closeModal}
        actionPrimaryColor="#7289da"
      />
    </StyledCreateServer>
  )
}

export default CreateServer
