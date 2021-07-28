import styled from 'styled-components'

const StyledTextarea = styled.div`
  position: relative;

  label {
    font-weight: 600;
    margin-bottom: 8px;
    display: block;
    color: #8e9297;
    font-size: 12px;
    text-transform: uppercase;
  }

  textarea {
    height: 60px;
    width: 100%;
    background-color: #0000001A;    
    padding: 10px;
    padding-right: 30px;
    box-sizing: border-box;
    resize: none;
    color: #dcddde;
    border: 1px solid rgba(0,0,0,0.3);
    outline: none;
    border-radius: 3px;

    &:focus {
      border-color: #040405;
      box-shadow: #040405 0 0 0 1px;
    }
  }

  .charCounter {
    position: absolute;
    bottom: 12px;
    right: 12px;
    font-size: 12px;
    color: #72767d;
    pointer-events: none;
  }
  
`

export default StyledTextarea
