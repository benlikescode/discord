import { SearchIcon } from '@heroicons/react/outline'
import { FC } from 'react'
import { StyledSearchbar } from '.'
import { Icon } from '../Icon'

type Props = {
  callback?: any
  placeholder?: string
}

const Searchbar: FC<Props> = ({ callback, placeholder }) => {
  return (
    <StyledSearchbar>    
      <input 
        type="text" 
        placeholder={placeholder || "Search"} 
        onChange={callback ? (e) => callback(e) : undefined} 
      />
      <Icon size={20} fill="#b9bbbe"><SearchIcon /></Icon>
    </StyledSearchbar>
  )
}

export default Searchbar
