import styled from 'styled-components'

const StyledBannedMember = styled.div`
  color: #DCDDDE;

  .username {
    font-size: 24px;
    line-height: 20px;
    font-weight: 500;
    padding-top: 30px;
    padding-bottom: 40px;
    text-align: center;
  }

  .content {
    font-size: 14px;
    padding-left: 16px;
    padding-bottom: 20px;
    user-select: text;
  }

  .label {
    text-transform: uppercase;
    font-size: 12px;
    margin-bottom: 5px;
  }

  .footer {
    background-color: #2f3136;
    box-shadow: inset 0 1px 0 rgb(47 49 54 / 60%);
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .cancelButton {
    background: transparent;
    color: #ED4245;
    padding: 2px 20px;
    padding-left: 0;
    font-size: 14px;

    :hover {
      text-decoration: underline;
    }
  }
  
`

export default StyledBannedMember
