import React, { useState, useEffect, createContext } from 'react'
import { auth, database } from '../firebase/FirebaseSetup'
import { useNavigate } from 'react-router-dom'

export const AuthContextProvider = createContext('')
export function AuthProvider({ children }) {
    const [user, setUser] = useState('')
    const [authUser, setAuthUser] = useState(null)
    const [loading, setLoading] = useState(false)
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
                console.log(`${JSON.stringify(user)}`)
                setAuthUser(user)
                navigate('/')
            } else {
                navigate('/login')
            }
        })

    })

    const store = {
        authUser,
        signIn,
        signUp,
        signOut,
        user
    }

    return (
        <AuthContextProvider.Provider value={store}>
            {!loading && children}
        </AuthContextProvider.Provider>
    )
}
