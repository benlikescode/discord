import styled from 'styled-components'

type StyledProps = {
  fullView?: boolean
}

const MessageStyled = styled.div<StyledProps>`
  padding: 4px 1rem;
  font-size: 16px;
  ${({ fullView }) => !fullView && 'margin-top: -16px;'}
  
  :hover {
    background-color: rgba(4,4,5,0.07);
  }

  .message {
    display: flex;
    align-items: center;
    position: relative;
  }
  
  .user-profile-spacer {
    width: 40px;
  }

  .user-profile-image {
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: #2f3136;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    font-weight: 600;
    color: #8e9297;
  }

  .user-profile-image img {
    height: 100%;
    width: 100%;
    border-radius: 50%;
    cursor: pointer;
  }

  .message-info {
    padding-left: 15px;
  }

  .message-info-header span:not(:last-child) {
    padding-right: 10px;
  }

  .message-info-header {
    margin-bottom: 3px;
  }

  .message-date {
    font-size: 0.75rem;
    color: #72767d;
  }

  .message-content {
    color: #DCDDDE;
  }

  .message-username {
    color: #FFF;
  }

  .message-username:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

export default MessageStyled