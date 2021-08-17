import { FC, ReactNode } from 'react'
import { StyledEditor } from '.'

type Props = {
  children: ReactNode
  channelName?: string
  handleChange: any
  isEnterClick: any
}

const Editor: FC<Props> = ({ children, channelName, handleChange, isEnterClick }) => {
  return (
    <StyledEditor>
      <div 
        className="editor" 
        contentEditable={true} 
        role="textbox" 
        spellCheck={true} 
        autoCorrect="off"
        aria-label="Send a message" 
        placeholder={`Message #${channelName}`} 
        onInput={(e) => handleChange(e)}
        onKeyDown={(e) => isEnterClick(e)}
      >
      { children }
      </div>
      
    </StyledEditor>
  )
}

export default Editor
