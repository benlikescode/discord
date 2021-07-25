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

  
`

export default StyledUserSettingsView
