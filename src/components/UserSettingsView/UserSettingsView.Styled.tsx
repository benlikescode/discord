import styled from 'styled-components'

const StyledUserSettingsView = styled.div`
  background-color: #36393f;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .settingsContainer {
    max-width: 650px;
    width: 100%;
  }

  .accountProfileCard {
    background-color: #202225;
    border-radius: 8px;
    position: relative;
    overflow: hidden;
  }

  .banner {
    background-color: rgb(4, 10, 20);
    position: relative;
    transition: background-color .1s;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: cover;
    width: 100%;
    height: 100px;
  }

  .userInfo {
    height: 72px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 16px 16px 0 120px;
  }

  .editUsernameSection {
    border-radius: 8px;
    background-color: #2f3136;
    padding: 16px;
    margin: 8px 16px 16px;
  }

  .editUsername {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .textTop {
    margin-bottom: 4px;
    color: #8e9297;
    font-size: 12px;
    line-height: 16px;
    font-weight: 600;
    text-transform: uppercase; 
  }

  .textBottom {
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }

  .editButton {
    color: #fff;
    background-color: #4f545c;
    width: 60px;
    height: 32px;
    min-width: 60px;
    min-height: 32px;
    transition: background-color .17s ease,color .17s ease; 
    display: flex;
    align-items: center;   
    justify-content: center; 
    box-sizing: border-box;   
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
  }

  .avatar {
    border: 7px solid #202225;
    background-color: #202225;
    position: absolute;
    top: 76px;
    left: 16px;
    box-sizing: content-box;
    border-radius: 50%;
  }

  .usernameLarge {
    color: #fff;
    font-size: 20px;
    font-weight: 600;
  }

  .avatarInput {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  .indicator {
    background-color: #dcddde;
    background-image: url('https://discord.com/assets/d5c25e76af04cea8997e4a060572feae.svg');
    position: absolute;
    top: 0;
    right: 0;
    left: auto;
    width: 28px;
    height: 28px;
    background-repeat: no-repeat;
    background-position: 50%;
    border-radius: 50%;
    box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);   
    display: flex;  
    justify-content: center; 
    align-items: center;
  }

  .revealEmail {
    color: #00AFF4;
    font-size: 14px;
    padding: 2px 4px;
    background: transparent;
  }

  .divider {
    width: 100%;
    height: 1px;
    border-top: var(--border);
    margin: 40px 0;
  }

  .header {
    color: #fff;
    margin-bottom: 20px;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }

  .passwordSection {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .imageWrapper {
    max-width: 150px;

    img {
      width: 100%;
    }
  }

  .accountRemovalHeader {
    color: #8e9297;
    font-size: 12px;
    text-transform: uppercase;
  }

  .accountRemovalLabel {
    color: #b9bbbe;
    font-size: 14px;
    line-height: 20px;
    font-weight: 400;
    margin: 8px 0;
  }

  .deleteAccountBtn {
    background-color: #ED4245;
    color: #fff;
    font-weight: 400;
    font-size: 14px;
    padding: 0 16px;
    border-radius: 3px;
    height: 32px;
  }

  .logoutBtn {
    background-color: transparent;
    color: #ED4245;
    font-weight: 400;
    font-size: 14px;
    padding: 0 16px;
    border-radius: 3px;
    height: 32px;
    border: 1px solid #ED4245;
  }

  .accountRemovalBtns {
    display: flex;
    align-items: center;
    gap: 15px;
    margin-top: 15px;
  }

  
`

export default StyledUserSettingsView
