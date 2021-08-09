import styled from 'styled-components'

type StyledProps = {
  fullView?: boolean
}

const MessageStyled = styled.div<StyledProps>`
  padding: 4px 1rem;
  font-size: 16px;
  ${({ fullView }) => !fullView && 'margin-top: -16px;'}
  user-select: text;
  
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
    display: block;
    word-wrap: break-word;
  }

  .message-username {
    color: #FFF;
  }

  .message-username:hover {
    text-decoration: underline;
    cursor: pointer;
  }

  .messageUrl {
    color: #00AFF4;

    :hover {
      text-decoration: underline;
    }
  }

  .systemMessage {
    display: flex;
    align-items: center;
    padding-left: 12px;
  }

  .systemMessageIcon {
    padding-right: 25px;
  }

  .systemMessageContent {
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.375rem;
    display: flex; 
    align-items: center; 
    gap: 5px;
    color: #8e9297;
  }

  .systemUsername {
    cursor: pointer;
    color: #fff;
    font-weight: 500;
  }

  .systemTimestamp {
    font-size: 0.75rem;
    line-height: 1.375rem;
    color: #72767d;
    vertical-align: baseline;
    display: inline-block;
    height: 1.25rem;
    cursor: default;
    font-weight: 500;
    margin-left: .25rem;
  }
`

export default MessageStyled