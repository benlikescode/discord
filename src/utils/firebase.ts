import firebase from 'firebase'

export const config = {
  apiKey: "AIzaSyBC7IXrNCc00WCScZLZe_KtlLLHlMgl3wE",
  authDomain: "bencord-9b434.firebaseapp.com",
  databaseURL: "https://bencord-9b434-default-rtdb.firebaseio.com",
  projectId: "bencord-9b434",
  storageBucket: "bencord-9b434.appspot.com",
  messagingSenderId: "537615140964",
  appId: "1:537615140964:web:ed2e1173c7c8fde1c17771"
}

const firebaseApp = firebase.initializeApp(config)
const fireDb = firebaseApp.firestore()
const realDb = firebaseApp.database()
const auth = firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export { fireDb, realDb, auth, storage }