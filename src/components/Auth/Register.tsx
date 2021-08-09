import React, { FC, useState, useRef } from 'react'
import { fireDb, auth, realDb } from '../../utils/firebase'
import { Link, useHistory } from 'react-router-dom'
import splashImage from './splash.png'
import { RegisterStyled } from '.'
import { getRandomAvatar } from '../../utils/helperFunctions'
import { updateAvatar, updateUser } from '../../reducers/user'
import { useDispatch } from 'react-redux'

const Register: FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUserName] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const dispatch = useDispatch()

  const register = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      const user = auth.currentUser
      const avatar = `/images/${getRandomAvatar()}`
      await user!.updateProfile({
        displayName: username,
        photoURL: avatar
      })
      dispatch(updateUser({
        id: user?.uid,
        email: user?.email,
        name: username,
        avatar: avatar, 
        status: 'Online'
      }))
      await addUserToDB(user!.uid, avatar)
      await createNewSever(username, user!.uid)  
    } 
    catch (error) {
      setErrorMessage(error.message)
    }
  }

  const addUserToDB = async (userId: string, avatar: string) => {
    await fireDb.collection('users').doc(userId).set({
      username: username,
      friends: [],
      avatarUrl: avatar,
      status: "Online",
      directMessages: []
    })
    const userStatus = realDb.ref('status').child(userId)
    userStatus.set({
      status: 'Online'
    })
  }

  const createNewSever = async (username : string, userId: string) => {
    const thisServer = await fireDb.collection('servers').add({
      name: username + "'s server",
      avatar: "",
      owner: userId,
      members: [userId],
      roles: [],
      banList: [],
      createdAt: Date.now()
    })
    await fireDb.collection('servers').doc(thisServer.id).collection('members').doc(userId).set({
      username: username,
      nickname: '',
      roles: []
    })
    addGeneralChannel(thisServer)
  }

  const addGeneralChannel = async (server: any) => {
    const thisChannel = await fireDb.collection('channels').add({
      name: "general",
      serverToken: server.id,
      createdAt: Date.now()
    })
    fireDb.collection('servers').doc(server.id).update({generalId: thisChannel.id})
    await addVoiceChannel(server.id)
    history.push(`/server/${server.id}/${thisChannel.id}`)
  }

  const addVoiceChannel = async (serverToken: string) => {
    await fireDb.collection("voiceChannels").add({
      name: "General",
      serverToken: serverToken,
      createdAt: Date.now(),
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
