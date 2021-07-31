import { FC, useState, useEffect } from 'react'
import { StyledHomePeopleList } from '.'
import { PeopleListItem } from './PeopleListItem'
import { UserType } from '../../types/'
import { fireDb } from '../../utils/firebase'

type Props = {
  onlineCount: number
  friendIds: string[]
}

const HomePeopleList: FC<Props> = ({ onlineCount, friendIds }) => {

  return (
    <StyledHomePeopleList>
      <div className="peopleList">
        <h2 className="title">{`Online - ${onlineCount}`}</h2>
        { 
          friendIds.map((friendId, idx) => (
            <PeopleListItem 
              key={idx}           
              userId={friendId}
            />
          ))       
        }
      </div>
    </StyledHomePeopleList>
  )
}

export default HomePeopleList
