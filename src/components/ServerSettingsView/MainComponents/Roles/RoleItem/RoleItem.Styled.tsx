import styled from 'styled-components'

const StyledRoleItem = styled.div`
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: 61px;
  cursor: pointer;
  margin-left: -32px;
  padding-right: 8px;

  :hover {
    background-color: #4f545c52;
  }

  .dragIcon {
    cursor: grab;
    color: #b9bbbe;
    visibility: hidden;
    flex: 0 0 32px;
  }

  .roleNameContainer {
    display: flex;
    align-items: center;
    overflow: hidden;
    flex: 0 1 273px;
  }

  .memberCountContainer {
    display: flex;  
    align-items: center;
    justify-content: flex-end;
    height: 100%;
    color: #b9bbbe;
    flex: 0 0 112px;
    margin-left: 16px;
    text-align: right;
  }

  .buttonsContainer {  
    display: flex;   
    align-items: center;    
    justify-content: flex-end;
    flex: 1 0 88px;
    margin-left: 16px;
  }

  .roleName {
    color: #fff;
    font-weight: 500;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-left: 4px;
  }

  .shieldIcon {
    margin-right: 10px;
  }

  .memberCount {
    margin-right: 4px;
  }
`

export default StyledRoleItem
