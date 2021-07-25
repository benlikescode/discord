import { FC, useState, useEffect } from 'react'
import { StyledHomePeopleList } from '.'
import { PeopleListItem } from './PeopleListItem'
import { UserType } from '../../types/'

import { config } from '../../utils/firebase'
import firebase from 'firebase'

type Props = {
  onlineCount: number
  friendIds: string[]
}

const HomePeopleList: FC<Props> = ({ onlineCount, friendIds }) => {
  (!firebase.apps.length) ? firebase.initializeApp(config) : firebase.app()
  const db = firebase.firestore()
  const auth = firebase.auth()
  const [people, setPeople] = useState<UserType[]>([])

  useEffect(() => {
    let peopleArr: UserType[] = []

    friendIds.map((friendId) => {
      db.collection('users').doc(friendId).get()
      .then((query) => {
        console.log("GLASS: " + query.data()!.name)
        const newUser: UserType = {
          id: query.id,
          name: query.data()!.username,
          status: "Online",
          avatar: "https://images.unsplash.com/photo-1569982175971-d92b01cf8694?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&w=1000&q=80"
        }
        peopleArr.push(newUser)
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
      
    })
    setPeople(peopleArr)

  }, [friendIds])

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
