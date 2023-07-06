import React, { useContext } from 'react'
import { AuthContextProvider } from '../context/AuthProvider'
import { Route, Navigate } from 'react-router-dom'

function PrivateRoute({ children}) {
    const { user } = useContext(AuthContextProvider)
    return (
      
             user ? children : <Navigate to='/login' />
        
    )
}

export default PrivateRoute