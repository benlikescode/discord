import styled from 'styled-components'

const StyledInvite = styled.div`
  .header {
    padding: 16px;
    box-shadow: 0 1px 0 0 rgb(24 25 28 / 30%), 0 1px 2px 0 rgb(24 25 28 / 30%);
    display: flex;
    flex-direction: column;

    h2 {
      color: #fff;
      font-size: 16px;
      text-transform: uppercase;
      margin-bottom: 16px;
    }
  }

  .close-modal-btn {
    position: absolute;
    top: 12px;
    right: 12px;
    border: none;
    background: none;
    color: #b9bbbe;
    opacity: 0.5;

    :hover {
      opacity: 1;
      color: #dcddde;
    }
  }

  .modal-input-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
  } 

  .inputLabel {
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
    color: #8e9297;
    font-size: 12px;
    text-transform: uppercase;
  }

  .friendsScroller {
    overflow: hidden scroll;
    max-height: 200px;
    padding-top: 8px;
    padding-left: 12px;
    padding-right: 8px;
  }

  .contentItem {
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 3px;
    margin-right: -10px;
    padding: 7px 10px 7px 8px;
    height: 44px;
  }

  .inviteButton {
    color: #3ba55d;
    padding: 2px 16px;
    font-size: 14px;
    height: 32px;
    width: 72px;
    box-sizing: border-box;
    border-radius: 3px;
    font-weight: 500;
    line-height: 16px;
    background: transparent;
    border: 1px solid #3ba55d;

    :hover {
      background-color: #3ba55d;
      color: #fff;
    }
  }

  .footer {
    padding: 16px;
    box-shadow: 0 1px 0 0 rgb(24 25 28 / 30%), 0 1px 2px 0 rgb(24 25 28 / 30%);
    display: flex;
    flex-direction: column;
  }
  
`

export default StyledInvite
