import styled from 'styled-components'

const StyledEditor = styled.div`
  height: auto;
  max-height: 50vh;
  overflow: auto;
  display: flex;
  position: relative;

  .editor {
    cursor: text;
    outline: none;
    overflow-y: auto;
    white-space: pre-wrap;
    white-space: break-spaces;
    word-break: break-all;
    width: 100%;
    -webkit-user-modify: read-write-plaintext-only;
    user-select: text;
    -webkit-line-break: after-white-space;
    background-color: #40444b;
    color: #dcddde;
    padding: 11px;
    border-radius: 8px;
    font-size: 1rem;
    box-sizing: border-box;
    height: 45px;
  }

  [contenteditable=true]:empty:before {
    content: attr(placeholder);
    color: #dcddde;
    pointer-events: none;
    display: block;
  }
  
`

export default StyledEditor
