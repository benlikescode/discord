import styled from 'styled-components'

const StyledAddFriendView = styled.div`
  background-color: #36393f;
  display: flex;
  flex: 1;
  flex-shrink: 0;
  flex-direction: column;

  .addFriendWrapper {
    padding: 8px 30px;   
    border-bottom: 1px solid rgba(0,0,0,0.2);
  }
  
  .inputForm {
    margin: 13px 0;
    position: relative;
    border-radius: 8px;
    border: 1px solid rgba(0,0,0,0.3);
    background-color: rgba(0,0,0,0.1);
    padding: 0 16px; 
    flex-direction: row;
    display: flex;   
    align-items: center;
    height: 52px;
  }

  .header {
    font-weight: 700;
    font-size: 16px;
    text-transform: uppercase;
    margin: 9px 0;
    color: #fff;
  }

  .description {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    margin: 5px 0;
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    color: #dcddde;
  }
  
`

export default StyledAddFriendView
