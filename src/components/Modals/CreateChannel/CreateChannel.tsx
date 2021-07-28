import { FC, useState } from 'react'
import { useParams } from 'react-router-dom'
import { StyledCreateChannel } from '.'
import { fireDb } from '../../../utils/firebase'
import { ExitIcon } from '../../Icon'
import { Input } from '../../System'
import { ModalFooter } from '../Modal/ModalFooter'

type Props = {
  closeModal: any
}

interface ParamTypes {
  serverToken: string
}

const CreateChannel: FC<Props> = ({ closeModal }) => {
  const { serverToken } = useParams<ParamTypes>()
  const [inputVal, setInputVal] = useState("")

  const createChannel = () => {
    const channelName = inputVal.replaceAll(' ', '-').toLowerCase()
    fireDb.collection("channels").add({
      name: channelName,
      serverToken: serverToken,
      createdAt: Date.now()
    })
    .then(() => closeModal())
  }

  return (
    <StyledCreateChannel>
      <div className="header">
        <h2>Create Text Channel</h2>
      </div>

      <button className="close-modal-btn" onClick={() => closeModal()}>
        <ExitIcon size={24}/>
      </button>

      <div className="modal-input-wrapper">
       <Input placeholder="new-channel" value={inputVal} callback={setInputVal} type="text" label="Channel Name"/>
      </div>

      <ModalFooter 
        cancelLabel="Cancel" 
        actionLabel="Create Channel" 
        actionCallback={createChannel} 
        closeModal={closeModal}
        actionPrimaryColor="#7289da"
      />
    </StyledCreateChannel>
  )
}

export default CreateChannel
