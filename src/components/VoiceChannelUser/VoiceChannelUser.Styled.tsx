import styled from 'styled-components'

const StyledVoiceChannelUser = styled.div`
  display: flex;
  align-items: center;
  border-radius: 4px;
  justify-content: flex-start;
  padding: 4px 8px;
  cursor: pointer;

  :hover {
    background-color: rgba(79, 84, 92, 0.16);
  }


  .user-name-wrapper {
    color: #fff;
    font-size: 14px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 8px;
    flex: 1 1 auto;
  }

  .icons {    
    display: flex;    
    align-items: center;   
    flex: 0 0 auto;
    margin-right: 8px;
  }

  .icon {
    display: flex;   
    align-items: center;   
    justify-content: center;
    flex: 0 0 auto;
    margin-left: 4px;
  }
  
`

export default StyledVoiceChannelUser
