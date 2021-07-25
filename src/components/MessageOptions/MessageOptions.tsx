import { FC } from 'react'
import { StyledMessageOptions } from '.'
import { Button, Icon } from '../System'
import { EmojiHappyIcon, TrashIcon, PencilIcon } from '@heroicons/react/outline'

type Props = {
  messageId: String | null
  deleteCallback: any
  editCallback: any
}

const MessageOptions: FC<Props> = ({ messageId, deleteCallback, editCallback }) => {

  const iconSize = 18
  const iconFill = "var(--bencordLightGray)"

  return (
    <StyledMessageOptions>
      <div className="optionItem">
        <Button type="icon">
          <Icon size={iconSize} fill={iconFill}><EmojiHappyIcon /></Icon>
        </Button>
      </div>
  
      <div className="optionItem">
        <Button type="icon" callback={() => deleteCallback(messageId)}>
          <Icon size={iconSize} fill={iconFill}><TrashIcon /></Icon>
        </Button>
      </div>
    
      <div className="optionItem">
        <Button type="icon" callback={() => editCallback(messageId)}>
          <Icon size={iconSize} fill={iconFill}><PencilIcon /></Icon>
        </Button>
      </div>
    </StyledMessageOptions>
  )
}

export default MessageOptions
