import { getAuth, onAuthStateChanged } from 'firebase/auth/cordova'
import React, { createContext, useEffect, useState } from 'react'
import app from '../Friebase/Firebase.ini'




export const AuthContext = createContext(null)

const auth = getAuth(app)




export default function ContextApi({ children }) {

  const [user, setUser] = useState(null)
  const [userData, setUserData] = useState(null)

  // fetch the current user data from backend 



  // to check the current user data if he is logged in or not
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        fetch(`http://localhost:5000/user/${user?.email}`)
          .then(res => res.json())
          .then(data => setUserData(data[0]))
        setUser(user)
        // ...
      } else {
        // User is signed out
        // ...
        setUser(null)
      }
    });
  }, [])
 
  console.log(userData)



  console.log(user?.email)

  const authInfo = {
    user,
    auth,
    userData,
    setUser,
    setUserData,
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}
