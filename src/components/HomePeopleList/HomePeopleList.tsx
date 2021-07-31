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
  const [people, setPeople] = useState<UserType[]>([])

  useEffect(() => {
    benTest()

  }, [friendIds])

  const benTest = () =>{
    let peopleArr: UserType[] = []

    friendIds.map((friendId) => {
      fireDb.collection('users').doc(friendId).get()
      .then((query) => {
        const newUser: UserType = {
          id: query.id,
          name: query.data()!.username,
          status: query.data()!.status,
          avatar: query.data()!.avatarUrl
        }
        peopleArr.push(newUser)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
      
    })
    setPeople(peopleArr)
  }

  return (
    <StyledHomePeopleList>
      <div className="peopleList">
        <h2 className="title">{`Online - ${onlineCount}`}</h2>
        { 
          people.map((person, idx) => (
            <PeopleListItem 
              key={idx}           
              id={person.id}
              name={person.name}
              status={person.status}
              avatarUrl={person.avatar}
            />
          ))       
        }
      </div>
    </StyledHomePeopleList>
  )
}

export default HomePeopleList
