import { getAuth, onAuthStateChanged } from 'firebase/auth/cordova'
import React, { createContext, useEffect, useState } from 'react'
import app from '../Friebase/Firebase.ini'




export const AuthContext = createContext(null)

const auth = getAuth(app)




export default function ContextApi({ children }) {

  const [user, setUser] = useState(null)
  // to get the current user data
  const [userData, setUserData] = useState(null)
  // to get all the food data
  const [foodData,setFoodData]= useState(null)
  // loading state
  const [loading,setLoading]=useState(false)



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
        // ...
        setUser(user)
      } else {
        // User is signed out
        // ...
        setUser(null)
      }
    });
  }, [])


  useEffect(()=>{

    if(foodData==null){
      setLoading(true)
    }

  fetch(`http://localhost:5000/foods`)
    .then(res => res.json())
    .then(data => setFoodData(data))
   
    setLoading(false)

  },[loading])
 


  console.log(foodData)


  const authInfo = {
    user,
    auth,
    userData,
    setUser,
    setUserData,
    foodData
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}
