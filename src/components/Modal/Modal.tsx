import React, { FC, useState } from 'react'
import { ModalStyled } from '.'
import { ExitIcon } from '../Icon'
import { config, fireDb } from '../../utils/firebase'
import { useHistory } from 'react-router-dom'
import { selectUser } from '../../reducers/user'
import { useSelector } from 'react-redux'

type Props = {
  closeModal: () => void
  headerText: string
  subHeadText?: string
  labelText: string
  buttonText: string
  serverToken?: string
  modalFunction: string
  inviteLink?: string
}

const Modal: FC<Props> = ( {closeModal, headerText, subHeadText, labelText, buttonText, serverToken, modalFunction, inviteLink} ) => {
  const history = useHistory()
  const [inputField, setInputField] = useState("")
  const [isCopied, setIsCopied] = useState(false)
  const user = useSelector(selectUser)

  const createNew = () => {
    if (modalFunction === "textChannel") {
      createNewTextChannel()
    }
    else if (modalFunction === "server") {
      createNewSever()
    }
    else if (modalFunction === "invite") {
      copyInviteToClip()
    }
  }

  const createNewTextChannel = () => {
    const channelName = inputField.replaceAll(' ', '-').toLowerCase()
    fireDb.collection("channels").add({
      name: channelName,
      serverToken: serverToken
    })
    .then((channel) => {
      closeModal()
      //history.push(`/server/${serverToken}/${channel.id}`)
    })
    .catch((error) => {
      console.log("Error writing document:", error)
    }) 
  }

  const createNewSever = () => {
    fireDb.collection("servers").add({
      name: inputField,
      avatar: "",
      members: [user.id],
      owner: user.id
    })
    .then((server) => {
      addGeneralChannel(server)
    })
    .catch((error) => {
      console.log("Error writing document:", error)
    })
  }

  const addGeneralChannel = (server: any) => {
    fireDb.collection("channels").add({
      name: "general",
      serverToken: server.id
    })
    .then((channel) => {
      fireDb.collection('servers').doc(server.id).update({generalId: channel.id})
      closeModal()
      history.push(`/server/${server.id}/${channel.id}`)
      window.location.reload()
    })
    .catch((error) => {
      console.log("Error writing document:", error)
    })
  }

  const copyInviteToClip = () => {
    const el = document.createElement('textarea')
    inviteLink && (el.value = inviteLink)
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    setIsCopied(true)
  }

  return (
    <ModalStyled modalType={modalFunction}>
      <div className="layer-container">
        <div className="modal-container">
          <h2>{ headerText }</h2>
          <div className="modal-text">
            { subHeadText }
          </div>
          <button className="close-modal-btn" onClick={ closeModal }>
            <ExitIcon size={24}/>
          </button>

          <div className="modal-input-wrapper">
            <label>{ labelText }</label>
            {modalFunction === "invite" ?
            <div className="modal-input">{inviteLink}</div>
            :
            <input className="modal-input" type="text" onChange={(e) => setInputField(e.currentTarget.value)}/>
          }
          </div>

          <div className="modal-bottom-wrapper">
            <button onClick={ createNew }>{ isCopied ? "Copied" : buttonText }</button>
          </div>
        </div>
        <div className="backdrop" onClick={() => closeModal()} />
      </div>
    </ModalStyled>
  )
}

export default Modal
