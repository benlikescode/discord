import { StyledHomeView } from '.'
import React, { FC, useState, useEffect } from 'react'
import { Sidebar } from '../Sidebar'
import { config, fireDb } from '../../utils/firebase'
import { Splash } from '../Splash'
import { HomeSidebar } from '../HomeSidebar'
import { HomePeopleList } from '../HomePeopleList'
import { Button } from '../System'
import { AddFriendView } from '../AddFriendView'
import { useDispatch, useSelector } from 'react-redux'
import { updateServer } from '../../reducers/server'
import { selectUser } from '../../reducers/user'
import { ServerType } from '../../types'

const HomeView: FC = () => {
  const [loading, setLoading] = useState(true)
  const [currentServer, setCurrentServer] = useState<ServerType>()
  const [currentUserName, setCurrentUserName] = useState("")
  const [friendIds, setFriendIds] = useState<string[]>([])
  const [currView, setCurrView] = useState(<HomePeopleList onlineCount={4} friendIds={friendIds}/>)
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const loadPeople = () => {
    if (user.id) {
      fireDb.collection('users').doc(user.id).get()
      .then((query) => {
        const friends: string[] = query.data()!.friends
        setFriendIds(friends)   
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      })
    }  
  }

  useEffect(() => {
    loadPeople()
  }, [])

  useEffect(() => {
    dispatch(updateServer({
      id: '',
      name: '',
      avatar: ''
    }))
  }, [])

  return (
    <StyledHomeView>
      <HomeSidebar />
      <div className="homeMainContainerWrapper">
        <div className="homeMainContainerNavbar">
          <div className="navbarContents">
            <div className="friendIcon">
              <svg x="0" y="0" aria-hidden="false" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fillRule="evenodd"><path fill="currentColor" fillRule="nonzero" d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z" transform="translate(2 4)"></path><path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path></g></svg>
            </div>
            <h3 className="friendsLabel">Friends</h3>
            <div className="divider"></div>
            <div className="tabBar">
              <Button type="solid2" callback={() => setCurrView(<HomePeopleList onlineCount={4} friendIds={friendIds}/>)}>Online</Button>
              <Button type="solid2">All</Button>
              <Button type="solid2">Pending</Button>
              <Button type="solid2">Blocked</Button>
              <Button type="solid" primaryColor="#3ba55d" secondaryColor="#fff" callback={() => setCurrView(<AddFriendView />)}>Add Friend</Button>
            </div>
          </div>
        </div>
        <div className="homeMainContainer">

          { currView }
        
          <div className="nowPlayingList">
            <h3 className="nowPlayingHeader">Active Now</h3>
            <div className="defaultPlayingItem">
              <span>It's quiet for now...</span>
              <span>When a friend starts an activity- like playing a game or hanging out on voice- we'll show it here!</span>
            </div>
          </div>
          
        </div>
      </div>
        
    </StyledHomeView>
  )
}

export default HomeView
