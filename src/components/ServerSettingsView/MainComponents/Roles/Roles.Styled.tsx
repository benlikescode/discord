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

  .roleList {
    margin-top: 32px;
  }

  .roleListHeader {
    margin-left: -32px;
    margin-right: -8px;
    padding-right: 8px;
    display: flex;
    margin-bottom: 8px;
  }

  .dragSpacing {
    flex: 0 0 32px;
  }

  .rolesCount {
    flex: 0 1 273px;
    font-size: 12px;
    color: #b9bbbe;
    text-transform: uppercase;
    font-weight: 700;
  }

  .membersLabel {
    font-size: 12px;
    color: #b9bbbe;
    text-transform: uppercase;
    font-weight: 700;
    flex: 0 0 112px;
    margin-left: 16px;
    text-align: right;
  }

  .buttonsSpacing {
    flex: 1 0 88px;
    margin-left: 16px;
  }

  .divider {
    height: 1px;
    background: #ffffff0f;
  }
  
`

export default StyledRoles
