import styled from 'styled-components'

const StyledPeopleListItem = styled.div`
  height: 62px;
  opacity: 1;
  display: flex;
  flex-direction: row;
  margin-left: 30px;
  margin-right: 20px;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  border-top: 1px solid rgba(79,84,92,0.16);

  .peopleListItem {
    display: flex;  
    flex-grow: 1;  
    align-items: center;
    justify-content: space-between;
    max-width: 100%;
  }

  .userInfo {
    display: flex;
    overflow: hidden;
  }

  .avatar {
    margin: 0 12px 0 0;
  }

  .actions {
    margin-left: 8px;
    display: flex;
  }

  .text {
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  .name {
    overflow: hidden; 
    flex-grow: 1;
    display: flex;
    align-items: flex-end;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    line-height: 1.1;
    color: #fff;
  }

  .status {
    color: #b9bbbe;
    font-size: 12px;
  }
  
`

export default StyledPeopleListItem
