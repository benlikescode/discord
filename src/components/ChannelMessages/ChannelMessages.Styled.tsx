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
  
  .message-list {
    height: calc(100vh - 48px - 69px);
    overflow-y: auto;
    display: grid;
    align-content: start;
    grid-gap: 1rem;
    padding: 1rem 0;
    box-sizing: border-box;
  }

  .message-list::-webkit-scrollbar {
    width: 7px;
    background: #2e3338;
    border-radius: 50rem;
  }

  .message-list::-webkit-scrollbar-thumb {
    background: #202225;
    border-radius: 50rem;
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

  .spacer {
    height: 1px;
  }
`

export default ChannelMessagesStyled