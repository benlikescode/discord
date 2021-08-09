import { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { StyledInviteInvalid } from '.'

const InviteInvalid: FC = () => {

  const history = useHistory()

  const handleButtonClick = () => {
    history.push('/home')
  }

  return (
    <StyledInviteInvalid>
      <img src="https://discord.com/assets/e0c782560fd96acd7f01fda1f8c6ff24.svg" alt="" />
      <h3 className="title">Invite Invalid</h3>
      <div className="label">This invite may be expired, or you might not have permission to join.</div>
      <button className="continueButton" onClick={() => handleButtonClick()}>Continue to Discord</button>
    </StyledInviteInvalid>
  )
}

export default InviteInvalid
