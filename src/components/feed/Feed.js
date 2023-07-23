import React, { useContext, useRef, useState, useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { AuthContextProvider } from '../context/AuthProvider'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import UploadFile from './feedComponents/UploadFile';
import Posts from './feedComponents/Posts';
import Navbar from './feedComponents/Navbar';

function Feed() {

  const [user] = useOutletContext()

  return (
  
    <div >
        <UploadFile user={user} />
        <Posts user={user} />
      </div> 

  )
}

export default Feed