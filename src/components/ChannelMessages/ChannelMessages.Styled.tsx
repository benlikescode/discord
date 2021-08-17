import styled from 'styled-components'

type StyledProps = {
  memberListOpen: boolean
}

const ChannelMessagesStyled = styled.div<StyledProps>`
  
  .messaging-container {
    width: 100%;
    background-color: #36393f;
    position: relative;
    box-sizing: border-box;
  }

  .channel-messages-navbar {
    height: 48px;
    background-color: #36393f;
    box-shadow: 0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);
    display: flex;
    justify-content: space-between;
    padding: 0 18px;
    color: #72767d;
    position: relative;
    z-index: 2;
  }
  
  .navbar-channel-name {
    color: #fff;
    font-weight: 600;
    padding-left: 8px;
    display: flex;
    align-items: center;
  }
  
  

  .light-gray-btns {
    outline: none;
    background: none;
    border: none;
    color: #b9bbbe;
  }

  .channel-messages-body {
    display: grid;
    grid-template-columns: ${({ memberListOpen }) => memberListOpen ? 'auto 240px;' : '1fr;'}
    height: calc(100vh - 48px);
  }

  .welcomeMessageWrapper {
    margin: 16px 16px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
    border-bottom: var(--border);
    padding-bottom: 10px;
  }

  .welcomeMessageInner {
    display: flex;
    align-items: center;
    flex-direction: column;
    max-width: 400px;
  }

  .welcomeMessage {
    text-align: center;
    font-weight: 700;
    font-size: 32px;
    line-height: 40px;
    font-weight: 600;
    color: #fff;
  }

  .welcomeLabel {
    margin-top: 8px;
    margin-bottom: 12px;
    text-align: center;
    font-size: 14px;
    line-height: 18px;
    color: #b9bbbe;
  }

  .messagesScroll {
    height: auto;
    top: -8px;
    bottom: 0;
    padding-left: 0;
  }

  .messagesInner2 {
    overflow-y: scroll;
    overflow-x: hidden;
    outline: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 100%;
    display: grid;
    align-content: start;
    grid-gap: 1rem;
    padding: 1rem 0;
    box-sizing: border-box;
  }

  .messageViewMain {   
    display: flex;  
    flex-direction: column;
    flex: 1;
    position: relative;
    width: 100%;
    height: 100%;
    position: absolute;
    padding-left: 1px;
    overflow: hidden;
  }
  
  .messages {
    flex: 1;
    min-height: 0;
    position: relative;
    
  }

  .messageInput {  
    min-height: 60px;
    padding: 16px;
  }
`

export default ChannelMessagesStyled