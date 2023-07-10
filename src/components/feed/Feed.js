import React, { useContext , useRef,useState,useEffect} from 'react'
import { useNavigate,useLocation } from 'react-router-dom'
import { AuthContextProvider } from '../context/AuthProvider'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import {database} from '../firebase/FirebaseSetup'
import UploadFile from './feedComponents/UploadFile';

function Feed() {
  const navigate = useNavigate()
  const [file,setFile] = useState()
  const [loading,setLoading] = useState(false)
  
  const { signOut,user  } = useContext(AuthContextProvider)
  const inputReelsRef = useRef()


  let handleOnSignOut = () => {
    signOut()
    navigate('/login')
  }
  useEffect(()=>{
   
    return ()=>{
    
    }
  })
  return (
    <div >   
    <UploadFile user={user} />
    </div>
  )
}

export default Feed