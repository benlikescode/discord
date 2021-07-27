import styled from 'styled-components'

const StyledEditRoles = styled.div`

  display: grid;
  grid-template-columns: 0.5fr 1fr;


  .roleList {
    border-right: 1px solid #ffffff0f;
    
  }

  .backText {
    margin-left: 8px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .list {
    flex-grow: 0;
    min-height: 0;
    padding: 0 16px 96px 40px;
  }

  .roleListHeader { 
    display: flex;
    justify-content: space-between;   
    align-items: center;
    padding: 60px 8px 16px;
    margin: 0 8px 8px 16px;
    z-index: 2;
    background-color: #36393f;
  }

  .roleListHeaderLeft {
    color: #b9bbbe;
    display: flex;
    align-items: center;
    cursor: pointer;

    :hover {
      color: #fff;
    }
  }

  .editRoleSection {
    padding-left: 24px;
  }

  .editRoleHeader {
    position: sticky;
    top: 0;
    margin-bottom: 16px;
    margin-left: -8px;
    padding: 60px 8px 16px;
    margin-right: -8px;
    position: relative;
    z-index: 2;
    background-color: #36393f;
    color: #fff;
  }

  .editRoleTitleContainer {
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    text-transform: uppercase;
  }

  .tabBar {
    margin-top: 16px;
    margin-bottom: -2px;
    border-bottom: 2px solid #ffffff0f;   
    display: flex;
    flex-direction: row;
  }

  .tabBarItem {
    margin-right: 32px;
    padding-bottom: 16px;
    margin-bottom: -2px;
  }

  .tabBarItemActive {
    border-bottom: 2px solid #5865f2;
  }

  .colorPicker {
    margin-top: 24px;

    h5 {
      color: #8e9297;
    }
  }

  .colorPickerText {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 18px;
    color: #dcddde;
  }

  .colorPickerContainer {
    
    display: flex;
    flex-wrap: wrap;
    margin-top: -10px;
    margin-right: -10px;
  }

  .defaultColorContainer {
    margin-top: 10px;
    margin-right: 10px;
    flex: 1;
    min-width: 60px;
    max-width: 70px;

    button {
      background-color: rgb(153, 170, 181);
      margin-right: 0;
      width: 100%;
      height: 50px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
    }
  }

  .colorSelectRow {
    display: flex;
    height: 20px;
    margin-top: 10px;
    flex-wrap: wrap;
    overflow: hidden;
  }
  
  .colorSelectItem {
    background-color: transparent;
    position: relative;
    box-sizing: border-box;
    width: 20px;
    border-radius: 3px;
    margin-right: 10px;   
    justify-content: center;
    align-items: center;
    border: 1px solid transparent;
    cursor: pointer;
    padding: 0;
    display: flex;
    height: 20px;
  }
  
`

export default StyledEditRoles
