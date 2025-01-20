import { getAuth, onAuthStateChanged } from 'firebase/auth/cordova'
import React, { createContext, useEffect, useState } from 'react'
import app from '../Friebase/Firebase.ini'
import RestaurantList from '../Home/RestaurantList'




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

  // action state
  const [action,setAction]=useState(false)
  //items added notification
  const [itemsAdded,setItemsAdded]=useState(false)

 const [restaurantList,setRestaurantsList]=useState(null)

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
  }, [action])


  useEffect(()=>{

    if(foodData==null){
      setLoading(true)
    }

  fetch(`http://localhost:5000/foods`)
    .then(res => res.json())
    .then(data => setFoodData(data))
   
    setLoading(false)
    setAction(false)

  },[loading,action])
 
  useEffect(()=>{

    fetch(`http://localhost:5000/restaurants`)
    .then(res => res.json())
    .then(data => setRestaurantsList(data))

  },[])

  console.log(restaurantList)


  const authInfo = {
    user,
    auth,
    userData,
    setUser,
    setUserData,
    foodData,
    loading,
    setLoading,
    action,
    setAction,
    itemsAdded,
    setItemsAdded,
    restaurantList
  }
  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  )
}
