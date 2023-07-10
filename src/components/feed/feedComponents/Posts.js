import React ,{useState,useEffect,useContext} from 'react'
import { AuthContextProvider } from '../../context/AuthProvider'
import CircularProgress from '@mui/material/CircularProgress';
import { database } from '../../firebase/FirebaseSetup';

function Posts() {
    const [posts,setPosts] = useState('')
    const {user} = useContext(AuthContextProvider)

    useEffect(()=>{
        database.posts.orderBy('createdAt','desc').onSnapshot((snapshot)=>{
            setPosts(snapshot.data())
        })
    },[])

  return (
    <div>
   {
        posts == null || user == null ? 
        <CircularProgress color="secondary" /> :
        <div>
            {
                posts.map(()=>{
                    
                })
            }
        </div>
    }
    </div>
  )
}

export default Posts