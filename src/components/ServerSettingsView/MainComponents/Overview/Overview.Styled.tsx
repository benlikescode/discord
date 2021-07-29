import styled from 'styled-components'

const StyledOverview = styled.div`
  .serverAcronym {
    color: #fff;
    font-weight: 500;
    font-size: 40px;
    overflow: hidden;
    white-space: nowrap;
  }

  .avatar {
    background-color: #5865f2;
    box-sizing: content-box;
    border-radius: 50%;
    height: 100px;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px 0 rgb(0 0 0 / 20%);
    position: relative;
    margin-right: 50px;
    flex-shrink: 0;
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

  .overviewWrapper {
    display: flex;
  }

  
`

export default StyledOverview
