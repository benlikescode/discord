import React, { FC, useState } from 'react'
import { config, fireDb, auth } from '../../utils/firebase'
import { useHistory, Link } from 'react-router-dom'
import { LogInStyled } from '.'
import splashImage from './splash.png'

const LogIn: FC = () => {
  const history = useHistory()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const logIn = (e: React.FormEvent) => {
    e.preventDefault()
    auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const userId = userCredential.user!.uid
      getUsersServers(userId)
    })
    .catch((error) => {
      setErrorMessage(error.message)
    })
  }

  const getUsersServers = (userId: string) => {
    if (userId) {
      fireDb.collection('servers')
      .where('members', 'array-contains', userId)
      .onSnapshot(({ docs }) => { 
        const serverId = docs[0].id
        getGeneralId(serverId) 
      })
    }
  }

  const getGeneralId = (serverId: string) => {
    fireDb.collection('channels')
      .where("serverToken", "==", serverId)
      .where("name", "==", "general")
      .onSnapshot(({docs}) => {
      const generalChannelId = docs[0].id
      history.push(`/server/${serverId}/${generalChannelId}`)        
    })
  }

  return (
    <LogInStyled>
      <img className="splash-image" src={ splashImage } alt="" />
      <div className="auth-sizer">
        <form className="auth-container" onSubmit={ logIn }>
          <h1>Welcome back!</h1>
          <div className="auth-inputs">
            <div>
              <label>EMAIL</label>
              <input type="email" onChange={(e) => setEmail(e.currentTarget.value)} />
            </div>
            <div>
              <label>PASSWORD</label>
              <input type="password" onChange={(e) => setPassword(e.currentTarget.value)} />
            </div>
          </div>
          {errorMessage && <span className="login-error-msg">{errorMessage}</span>}
          <button type="submit">Login</button>
          <Link to="/register" >Need an Account? Register</Link>
        </form>
      </div>
    </LogInStyled>
  )
}

export default LogIn
