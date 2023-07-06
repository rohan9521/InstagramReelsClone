import React ,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContextProvider } from '../context/AuthProvider'
function Feed() {
    const navigate = useNavigate()
    const {signOut} = useContext(AuthContextProvider)
    let handleOnSignOut = ()=>{
        signOut()
        navigate('/login')
    }
  return (
    <div>
        <button onClick={handleOnSignOut}>Log out</button>
    </div>
  )
}

export default Feed