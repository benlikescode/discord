import { FC, useState } from 'react'
import { StyledInvite } from '.'
import { ExitIcon } from '../../Icon'
import { createInviteLink } from '../../../utils/helperFunctions'
import { Button, Input, Searchbar } from '../../System'
import { UserInfo } from '../../UserInfo'


type Props = {
  closeModal: any
}

const Invite: FC<Props> = ({ closeModal }) => {
  const [isCopied, setIsCopied] = useState(false)
  const [inviteLink, setInviteLink] = useState(createInviteLink())


  const copyInviteToClip = () => {
    const el = document.createElement('textarea')
    inviteLink && (el.value = inviteLink)
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    setIsCopied(true)
  }

  const CURRSERVER = "Test Server"

  return (
    <StyledInvite>
      <div className="header">
        <h2>{`Invite Friends To ${CURRSERVER}`}</h2>
        <Searchbar />
      </div>  

      <button className="close-modal-btn" onClick={() => closeModal()}>
        <ExitIcon size={24}/>
      </button>

      <div className="friendsScroller">
        <div className="content">
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
          <div className="contentItem">
            <UserInfo userName="ben16" avatar="/images/defaultAvatarRed.png"/>
            <button className="inviteButton">Invite</button>
          </div>
        </div>
      </div>

      <div className="footer">
        <label className="inputLabel">Or, Send A Server Invite Link To A Friend</label>
        <div className="modal-input-wrapper">
          <Input placeholder="new-server" value={inviteLink} type="text"/>
          <Button type="blue" callback={() => copyInviteToClip()}>{isCopied ? 'Copied' : 'Copy'}</Button>
        </div>
      </div>
     

     
    </StyledInvite>
  )
}

export default Invite
