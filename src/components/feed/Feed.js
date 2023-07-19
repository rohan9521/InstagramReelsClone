import React, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { AuthContextProvider } from '../context/AuthProvider'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { database } from '../firebase/FirebaseSetup'
import UploadFile from './feedComponents/UploadFile';
import Posts from './feedComponents/Posts';
import Navbar from './feedComponents/Navbar';
import CircularProgress from '@mui/material/CircularProgress';

function Feed() {
  const navigate = useNavigate()
  const [file, setFile] = useState()
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  const { signOut, authUser } = useContext(AuthContextProvider)
  const inputReelsRef = useRef()


  let handleOnSignOut = () => {
    signOut()
    navigate('/login')
  }
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
    user != null ?
      <div >
        <Navbar />
        <UploadFile user={user} />
        <Posts user={user} />
      </div> :
      <div>
        <CircularProgress color="secondary" />
      </div>

  )
}

export default Feed