import styled from 'styled-components'

const StyledNewMessageTest = styled.div`



  .userMention {
    color: #DEE0FC;
    background: #5865F24D;
    padding: 0 2px;
    cursor: pointer;
    border-radius: 3px;
    font-weight: 500;
  }

  .editorContainer {
    height: auto;
    max-height: 50vh;
    overflow: auto;
    display: flex;
  }

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
    border-radius: 8px;
    padding: 13px;
    font-size: 1rem;
    box-sizing: border-box;
  }

  [contenteditable=true]:empty:before {
    content: attr(placeholder);
    color: #dcddde;
    pointer-events: none;
    display: block;
  }

.isTyping {
  color: #dcddde;
  font-size: 14px;
  font-weight: 500;
  line-height: 24px;
}

.typingAnimation {
  margin: 0 5px;
  height: 7px;
}
  
`

export default StyledNewMessageTest
