import React, { FC, useState, useRef } from 'react'
import { fireDb, auth } from '../../utils/firebase'
import { Link, useHistory } from 'react-router-dom'
import splashImage from './splash.png'
import { RegisterStyled } from '.'
import { getRandomAvatar } from '../../utils/helperFunctions'

const Register: FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUserName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const register = (e: React.FormEvent) => {
    e.preventDefault()
    auth.createUserWithEmailAndPassword(email, password)
    .then(() => {
      const user = auth.currentUser
      const avatar = `/images/${getRandomAvatar()}`
      user!.updateProfile({
        displayName: username,
        photoURL: avatar
      })
      addUserToDB(user!.uid, avatar)
      createNewSever(username, user!.uid)  
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }

  const addUserToDB = (userId: string, avatar: string) => {
    fireDb.collection('users').doc(userId).set({
      username: username,
      friends: [],
      avatarUrl: avatar,
      status: "Online",
      directMessages: []
    })
    .catch((error) => {
      console.log("Error writing document:", error)
    })
  }

  const createNewSever = (username : string, userId: string) => {
    fireDb.collection("servers").add({
      name: username + "'s server",
      avatar: "",
      owner: userId,
      members: [userId],
      roles: [],
      banList: [],
      createdAt: Date.now()
    })
    .then((thisServer) => {
      addGeneralChannel(thisServer)
    })
    .catch((error) => {
      console.log("Error writing document:", error)
    })
  }

  const addGeneralChannel = (server: any) => {
    fireDb.collection("channels").add({
      name: "general",
      serverToken: server.id,
      createdAt: Date.now()
    })
    .then((thisChannel) => {
      fireDb.collection('servers').doc(server.id).update({generalId: thisChannel.id})
      addVoiceChannel(server.id)
      history.push(`/server/${server.id}/${thisChannel.id}`)
    })
    .catch((error) => {
      console.log("Error writing document:", error)
    })
  }

  const addVoiceChannel = (serverToken: string) => {
    fireDb.collection("voiceChannels").add({
      name: "general",
      serverToken: serverToken,
      members: []
    })
  }

  return (
    <RegisterStyled>
      <img className="splash-image" src={ splashImage } alt="" />
      <div className="auth-sizer">
        <form className="auth-container" onSubmit={ register }>
          <h1>Create an account</h1>
          <div className="auth-inputs">
            <div>
              <label>EMAIL</label>
              <input type="email" onChange={(e) => setEmail(e.currentTarget.value)} />
            </div>
            <div>
              <label>USERNAME</label>
              <input type="text" onChange={(e) => setUserName(e.currentTarget.value)} />
            </div>
            <div>
              <label>PASSWORD</label>
              <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} />
            </div>
          </div>
          {errorMessage && <span className="register-error-msg">{errorMessage}</span>} 
          <button type="submit">Continue</button>
          <Link to="/login" >Already have an account?</Link>
        </form>
      </div>
    </RegisterStyled>
  )
}

export default Register
