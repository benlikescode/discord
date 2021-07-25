import styled from 'styled-components'

const StyledHomePeopleList = styled.div`
  background-color: #36393f;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  overflow: hidden;

  .title {
    margin: 16px 20px 8px 30px;
    color: #b9bbbe;
    box-sizing: border-box;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: .25px;
    font-weight: 600;
    flex: 1 1 auto;
  }
  
`

export default StyledHomePeopleList
