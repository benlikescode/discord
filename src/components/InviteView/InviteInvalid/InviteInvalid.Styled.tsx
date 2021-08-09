import styled from 'styled-components'

const StyledInviteInvalid = styled.div`
  padding: 32px;
  text-align: center;
  z-index: 1;
  background-color: #36393F;
  box-shadow: 0 0 0 1px rgb(32 34 37 / 60%), 0 2px 10px 0 rgb(0 0 0 / 20%);
  width: 440px;
  max-height: 660px;
  min-height: 200px;
  overflow: hidden;
  border-radius: 5px;
  
  .title {
    font-weight: 600;
    margin: 8px 0;
    color: #fff;
    font-size: 24px;
    line-height: 30px;
  }

  .label {
    color: #b9bbbe;
    line-height: 20px;
  }

  .continueButton {
    color: #fff;
    background-color: #5865f2;
    border-radius: 3px;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    padding: 2px 16px;
    user-select: none;
    transition: background-color .17s ease,color .17s ease;
    width: 130px;
    height: 44px;
    min-width: 130px;
    min-height: 44px;
    margin-top: 40px;
    width: 100%;
  }
  
`

export default StyledInviteInvalid
