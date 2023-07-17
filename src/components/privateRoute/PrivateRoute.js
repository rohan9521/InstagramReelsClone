import React, { useContext } from 'react'
import { AuthContextProvider } from '../context/AuthProvider'
import { Navigate } from 'react-router-dom'

function PrivateRoute( {children}) {
    const { authUser } = useContext(AuthContextProvider)
  console.log(`authuser ${JSON.stringify(authUser)}`)
    return ( authUser ? children : <Navigate to='/login' />)
}

export default PrivateRoute