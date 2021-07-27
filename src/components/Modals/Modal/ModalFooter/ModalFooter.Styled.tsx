import styled from 'styled-components'

const StyledModalFooter = styled.div`
  flex: 0 0 auto;
  background-color: #2f3136;
  box-shadow: inset 0 1px 0 rgb(47 49 54 / 60%);
  padding: 16px;
  display: flex;
  align-items: stretch;
  justify-content: flex-start;
  flex-direction: row-reverse;

  .cancelButton {
    background: transparent;
    color: #fff;
    padding: 2px 20px;
    font-size: 14px;

    :hover {
      text-decoration: underline;
    }
  }
  
`

export default StyledModalFooter
