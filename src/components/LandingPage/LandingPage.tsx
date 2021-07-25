import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LandingPageStyled } from '.'
import { FooterSection } from '../FooterSection'
import { HeroSection } from '../HeroSection'
import { WavePath } from '../Icon'
import sectionImage1 from './SectionImage1.svg'
import sectionImage2 from './SectionImage2.svg'
import sectionImage3 from './SectionImage3.svg'
import sectionImage4 from './SectionImage4.svg'
import sectionImage5 from './SectionImage5.svg'
import firebase from 'firebase'
import { config } from '../../utils/firebase'

const LandingPage: FC = () => {
  (!firebase.apps.length) ? firebase.initializeApp(config) : firebase.app()
  const db = firebase.firestore()
  const auth = firebase.auth()
  const user = auth.currentUser
  const [userId, setUserId] = useState("")
  const [serverPath, setServerPath] = useState("")
  const [isLoggedIn, setIsLoggedIn] = useState(false)
 
  useEffect(() => {
    if (user) {
      setIsLoggedIn(true)
      setUserId(user.uid)
    }
    else {
      console.log("User not signed in")
    }
  }, [user])

  const getUsersServers = () => {
    if (userId) {
      db.collection('servers')
      .where('members', 'array-contains', userId)
      .onSnapshot(({ docs }) => { 
        //const servers = docs.map((doc) => (doc.data()))
        const serverId = docs[0].id
        getGeneralId(serverId) 
      })
    }
  }

  const getGeneralId = (serverId: string) => {
    db.collection('channels')
    .where("serverToken", "==", serverId)
    .where("name", "==", "general") // added this
    .onSnapshot(({docs}) => {
      const generalChannelId = docs[0].id
      setServerPath(`/server/${serverId}/${generalChannelId}`)
    })
  }

  useEffect(() => {
    getUsersServers()
  }, [userId])

  return (
    <LandingPageStyled>
        <HeroSection isLoggedIn={isLoggedIn} serverPath={serverPath}/>
        <div className="center-wrapper">
          <div className="home-page-section">
            <img src={sectionImage1} alt=""/>
            <div className="section-content-wrapper">
              <h2>An invite-only place with plenty of room to talk</h2>
              <div className="section-text">
                Discord servers are organized into topic-based channels where you can collaborate, share, and just talk about your day without clogging up a group chat.
              </div>
            </div>
          </div>
        </div>
         
        <div className="wave-path-wrapper">
          <WavePath/>
        </div>

        <div className="wave-section-bg">
          <div className="center-wrapper">
            <div className="home-page-section">
              <div className="section-content-wrapper">
                <h2>Where hanging out is easy</h2>
                <div className="section-text">
                  Grab a seat in a voice channel when you’re free. Friends in your server can see you’re around and instantly pop in to talk without having to call.
                </div>
              </div>
              <img src={sectionImage2} alt=""/>
            </div>
          </div>
        </div>

        <div className="wave-path-inverted-wrapper">
          <WavePath/>
        </div>

        <div className="center-wrapper">
          <div className="home-page-section">
            <img src={sectionImage3} alt=""/>
            <div className="section-content-wrapper">
              <h2>From a few to a fandom</h2>
              <div className="section-text">
                Get a community of any size running with moderation tools and custom member access. Give members special powers, set up private channels, and more.
              </div>
            </div>
          </div>
        </div>

        <div className="wave-path-wrapper">
          <WavePath/>
        </div>

        <div className="wave-section-bg">
          <div className="center-wrapper">
            <div className="last-home-section">
              <div className="section-content-wrapper">
                <h2>Reliable tech for staying close</h2>
                <div className="section-text">
                  Low-latency voice and video feels like you’re in the same room. Wave hello over video, watch friends stream their games, or gather up and have a drawing session with screen share.
                </div>
              </div>
              <img src={sectionImage4} alt=""/>
            </div>
          </div>
        </div>

        <div className="wave-section-bg">
          <div className="center-wrapper">
            <div className="bottom-section">
              <img src={sectionImage5} alt=""/>
              <h4>Ready to start your journey?</h4>
              {
                isLoggedIn ?
                <Link to={serverPath} className="login-btn">
                  <button>Open Discord in your browser</button>
                </Link>
                :
                <Link to="/login" className="login-btn">
                  <button>Open Discord in your browser</button>
                </Link>
              } 
            </div>
          </div>
        </div>
        <FooterSection isLoggedIn={isLoggedIn} serverPath={serverPath}/>
    </LandingPageStyled>
  )
}

export default LandingPage
