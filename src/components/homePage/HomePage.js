import React, { useEffect, useContext, useState } from 'react'
import Navbar from '../feed/feedComponents/Navbar'
import { Outlet } from 'react-router-dom'
import { AuthContextProvider } from '../context/AuthProvider'
import { database } from '../firebase/FirebaseSetup'
import './HomePage.css'
import CircularProgress from '@mui/material/CircularProgress';

function HomePage() {
    const { signOut, authUser } = useContext(AuthContextProvider)
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        if (authUser != null) {
            database.users.doc(authUser.uid).get().then((doc) => {
                console.log("user" + JSON.stringify(doc.data()))
                setUser(doc.data())
                setLoading(false)
            })
        }
        return () => {

        }
    }, [])
    return (

        <>
            {
                user != null ?
                    <>
                        <Navbar signOut={signOut} profileImageUrl={user.profileUrl} userId={user.userId} />
                        <div className='child-container'>
                            <Outlet context={[user]} />
                        </div>

                    </> :

                    <div>
                        <CircularProgress color="secondary" />
                    </div>
            }
        </>
    )
}

export default HomePage