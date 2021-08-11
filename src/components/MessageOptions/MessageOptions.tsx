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
        <button className="optionBtn">
          <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" clip-rule="evenodd" d="M12.2512 2.00309C12.1677 2.00104 12.084 2 12 2C6.477 2 2 6.477 2 12C2 17.522 6.477 22 12 22C17.523 22 22 17.522 22 12C22 11.916 21.999 11.8323 21.9969 11.7488C21.3586 11.9128 20.6895 12 20 12C15.5817 12 12 8.41828 12 4C12 3.31052 12.0872 2.6414 12.2512 2.00309ZM10 8C10 6.896 9.104 6 8 6C6.896 6 6 6.896 6 8C6 9.105 6.896 10 8 10C9.104 10 10 9.105 10 8ZM12 19C15.14 19 18 16.617 18 14V13H6V14C6 16.617 8.86 19 12 19Z"></path><path d="M21 3V0H19V3H16V5H19V8H21V5H24V3H21Z" fill="currentColor"></path></svg>
        </button>
      </div>

      <div className="optionItem">
        <button className="optionBtn" onClick={() => editCallback(messageId)}>
          <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2929 9.8299L19.9409 9.18278C21.353 7.77064 21.353 5.47197 19.9409 4.05892C18.5287 2.64678 16.2292 2.64678 14.817 4.05892L14.1699 4.70694L19.2929 9.8299ZM12.8962 5.97688L5.18469 13.6906L10.3085 18.813L18.0201 11.0992L12.8962 5.97688ZM4.11851 20.9704L8.75906 19.8112L4.18692 15.239L3.02678 19.8796C2.95028 20.1856 3.04028 20.5105 3.26349 20.7337C3.48669 20.9569 3.8116 21.046 4.11851 20.9704Z" fill="currentColor"></path></svg>       
        </button>
      </div>
  
      <div className="optionItem">
        <button className="optionBtn" onClick={() => deleteCallback(messageId)}>
          <svg aria-hidden="false" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M15 3.999V2H9V3.999H3V5.999H21V3.999H15Z"></path><path fill="currentColor" d="M5 6.99902V18.999C5 20.101 5.897 20.999 7 20.999H17C18.103 20.999 19 20.101 19 18.999V6.99902H5ZM11 17H9V11H11V17ZM15 17H13V11H15V17Z"></path></svg>        
        </button>
      </div>
    
      
    </StyledMessageOptions>
  )
}

export default MessageOptions
