import styled from 'styled-components'

const StyledRoles = styled.div`
  .description {
    display: block;
    margin-bottom: 32px;
    font-size: 14px;
    line-height: 18px;
    color: #b9bbbe;
  }

  .description2 {
    display: block;
    margin-top: 32px;
    font-size: 14px;
    line-height: 18px;
    color: #b9bbbe;
  }

  .defaultPermissions {
    display: flex;
    align-items: center;
    background-color: #2f3136;
    color: #b9bbbe;
    border-radius: 4px;
    padding: 16px 24px 16px 16px;
    cursor: pointer;

    :hover {
      background-color: #4f545c52;
    }
  }

  .usersIcon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: #36393f;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .defaultPermsContent {
    margin-left: 16px;
  }

  .defaultPermsHeader {
    font-weight: 700;
    margin-bottom: 4px;
  }

  .defaultPermsBody {
    font-size: 12px;
    line-height: 16px;
  }

  .leftArrow {
    margin-left: auto;
  }

  .searchContainer {
    margin-top: 32px;
    display: flex;
    align-items: center;
  }

  .createRoleButton {
    margin-left: 16px;
  }

  .searchBar {
    flex: 1 1 auto;
  }
  
`

export default StyledRoles
