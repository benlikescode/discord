import React, { FC } from 'react'
import { HelpModalStyled } from '.'
import { ExitIcon } from '../Icon'

type Props = {
  closeModal: () => void
}

const HelpModal: FC<Props> = ({ closeModal }) => {
  return (
    <HelpModalStyled>
       <div className="layer-container">
        <div className="modal-container">
          <h2>Built By Ben Hoeg</h2>
          <button className="close-modal-btn" onClick={ closeModal }>
            <ExitIcon size={24}/>
          </button>
          <div className="modal-text">
            Check out my Github for source code and other cool projects! Or send me an email, I would love to hear from you.
          </div>
          <div className="social-links-wrapper">
            <a className="github-link" href="https://github.com/benlikescode/bencord" rel="noreferrer" target="_blank">See Code</a>
            <a className="email-link" href="mailto:benhoeg@outlook.com" rel="noreferrer" target="_blank">Get In Touch</a>
          </div>
        </div>
        <div className="backdrop" onClick={() => closeModal()} />
      </div>
    </HelpModalStyled>
  )
}

export default HelpModal
