import React, { useState, useEffect,createContext } from 'react'
import { auth } from '../firebase/FirebaseSetup'

export const AuthContextProvider = createContext('')
export function AuthProvider({children}) {
   
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)

    let signUp = (email,password)=>{
        return auth.createUserWithEmailAndPassword(email,password)
    }
    let signIn = (email,password)=>{
        return auth.signInWithEmailAndPassword(email,password)
    }
    let signOut =()=>{
        return auth.signOut();
    }

    useEffect(() => {
        const unsub = auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoading(false)
        })
        return ()=>{
            unsub()
        }
    })

    const store = {
        user,
        signIn,
        signUp,
        signOut
    }

    return (
        <AuthContextProvider.Provider value={store}>
            {!loading && children}
        </AuthContextProvider.Provider>
    )
}
