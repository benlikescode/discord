import styled from 'styled-components'

const ChannelStyled = styled.div`
  color: #8e9297;
  background-color: #2f3136;
  position: relative;

  .channel-list-navbar {
    height: 48px;
    background-color: #2f3136;
    box-shadow: 0 1px 0 rgba(4,4,5,0.2),0 1.5px 0 rgba(6,6,7,0.05),0 2px 0 rgba(4,4,5,0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
  }

  .channel-list .voice {
    margin-top: 20px;
  }

  .server-name {
    color: #fff;
    font-weight: 600;
    width: 208px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .announcements-channel {
    width: calc(100vw - 16px);
    margin: 8px;
    padding: 10px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }

  .announcements-channel span {
    padding-left: 5px;
  }

  .channel-header {
    height: 24px;
    width: 232px;
    padding-left: 10px;
    padding-right: 2px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
  }

  .channel-header-left {
    display: flex;
    align-items: center;
    font-size: 12px;
    font-weight: 600;
  }

  .text-channel-item-left {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .add-channel-btn {
    background: none;
    outline: none;
    border: none;
    color: #8e9297;
  }

  .add-channel-btn:hover {
    color: #dcddde;
  }

  .text-channel-wrapper:hover {
    background-color: rgba(79,84,92,0.32);
    border-radius: 3px;

    .text-channel-name {
      color: #fff;
    }
    .delete-channel-btn {
      display: block;
    }
  }

  .server-invite-wrapper {
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 15px 0;
    padding: 0 1rem;
    box-sizing: border-box;
  }

  .server-invite-btn {
    color: #fff;
    background-color: #7289da;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    padding: 2px 16px;
    height: 38px;
    width: 100%;

    :hover {
      background-color: #677bc4;
    }
  }

  .delete-channel-btn {
    background: none;
    outline: none;
    border: none;
    color: inherit;
    padding: 0;
    display: none;
  }

  .user-info-footer-top {
    height: 73px;
    border-bottom: 1px solid #36393f;
    box-sizing: border-box;
  }

  .user-info-footer-top1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 8px 0;

    button {
      border: none;
      outline: none;
      background: none;
      color: inherit;
    }
  }

  .user-info-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 8px;
    box-sizing: border-box;
    background-color: #292b2f;
    z-index: 999;
  }

  .ping-wrapper {
    display: flex;
    color: #4fdc7b;

    span {
      font-size: 14px;
      font-weight: 600;
      margin-left: 5px;
    }
  }

  .user-info-footer-top2 {
    display: flex;
    gap: 10px;

    button {
      border: none;
      outline: none;
      background: #36393f;
      color: #fff;
      height: 32px;
      width: 105px;
      border-radius: 3px;
      display: flex;
      align-items: center;
      justify-content: center;

      div {
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }   
  }
`

export default ChannelStyled