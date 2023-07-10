import React, { useContext } from 'react'
import { AuthContextProvider } from '../context/AuthProvider'
import { Route, Navigate } from 'react-router-dom'

function PrivateRoute({ children}) {
    const { authUser } = useContext(AuthContextProvider)
    return ( authUser ? children : <Navigate to='/login' />)
}

export default PrivateRoute