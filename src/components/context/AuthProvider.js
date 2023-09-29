import React, { useState, useEffect, createContext } from 'react'
import { auth, database } from '../firebase/FirebaseSetup'
import { useNavigate } from 'react-router-dom'

export const AuthContextProvider = createContext('')
export function AuthProvider({ children }) {
    const [user, setUser] = useState('')
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [followersMap,setFollowersMap] = useState(new Map())
    const [followingMap,setFollowingMap] = useState(new Map())

    const navigate = useNavigate()
    let signUp = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }
    let signIn = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }
    let signOut = () => {
        return auth.signOut();
    }


    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            if (user) {
                console.log(`authuser${JSON.stringify(user)}`)
                setAuthUser(user)
              
            } else {
                navigate('/login')
            }
        })

    },[])
    useEffect(()=>{
        if(authUser!=null){
            database.users.doc(authUser.uid).get().then((doc) => {
                console.log("user" + JSON.stringify(doc.data()))
                let followersMap = new Map()
                for(let i=0;i<doc.data().followers.length;i++){
                    followersMap.set(doc.data().followers[i],"")
                }
                setFollowersMap(followersMap)

                let followingMap = new Map()
                for(let i=0;i<doc.data().following.length;i++){
                    followingMap.set(doc.data().following[i],"")
                }

                setFollowingMap(followingMap)

                setUser(doc.data())
                navigate('/')
            })
        }
    },[authUser])

    const store = {
        authUser,
        signIn,
        signUp,
        signOut,
        user,
        followingMap,
        followersMap
    }

    return (
        <AuthContextProvider.Provider value={store}>
            {!loading && children}
        </AuthContextProvider.Provider>
    )
}
