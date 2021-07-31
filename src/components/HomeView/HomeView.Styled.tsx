import styled from 'styled-components'

const StyledHomeView = styled.div`
  display: grid;
  grid-template-columns: 240px auto;
  min-height: 100vh;

  .homeMainContainer {
    height: 100%;
    flex-direction: row;
    position: relative;
    overflow: hidden;
    transform: translateZ(0);
    display: flex;
  }

  .homeMainContainerWrapper {
    display: flex;
    width: 100%;
    overflow: hidden;
    flex-direction: column;
  }

  .homeMainContainerNavbar {
    background-color: #36393f;
    position: relative;
    display: flex;  
    align-items: center;
    min-width: 0;
    width: 100%;
    flex: 0 0 auto;
    height: 48px;
    padding: 0 8px;
    font-size: 16px;
    line-height: 20px;
    cursor: default;
    z-index: 2;
    color: #dcddde;
    box-shadow: 0 1px 0 rgb(4 4 5 / 20%), 0 1.5px 0 rgb(6 6 7 / 5%), 0 2px 0 rgb(4 4 5 / 5%);
  }

  .navbarContents {
    position: relative;
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
  }

  .friendIcon {
    position: relative;
    height: 24px;
    width: auto;
    flex: 0 0 auto;
    margin: 0 8px;
  }

  .friendsLabel {
    justify-content: flex-start;
    margin: 0 8px 0 0;
    flex: 0 0 auto;
    min-width: auto;
    overflow: hidden;
    white-space: nowrap;
  }

  .divider {
    width: 1px;
    height: 24px;
    margin: 0 8px;
    flex: 0 0 auto;
    background: rgba(79,84,92,0.56);
  }

  .tabBar {
    display: flex;
    gap: 16px;
  }

  .nowPlayingList {
    flex: 0 1 30%;
    min-width: 360px;
    max-width: 420px;
    background: #36393f;
    padding: 16px;
    height: 100%;
    border-left: 1px solid rgba(79,84,92,0.46);
    box-sizing: border-box;
  }

  .nowPlayingHeader {
    margin: 8px 0 16px;
    font-weight: 700;
    color: #fff;
    font-size: 20px;
    line-height: 24px;
  }

  .defaultPlayingItem {
    margin-top: 8px;
    border-radius: 8px;
    background-color: #2f3136;
    cursor: pointer;
    padding: 16px;
  }
`

export default StyledHomeView
