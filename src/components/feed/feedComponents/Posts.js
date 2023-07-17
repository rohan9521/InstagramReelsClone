import React, { useState, useEffect, useContext } from 'react'
import { AuthContextProvider } from '../../context/AuthProvider'
import CircularProgress from '@mui/material/CircularProgress';
import { database } from '../../firebase/FirebaseSetup';
import Reels from './Reels';
import './css/Posts.css'
import Avatar from '@mui/material/Avatar';
import Like from './Like';


function Posts(props) {
    const [posts, setPosts] = useState([])
    const { user } = useContext(AuthContextProvider)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let parr = []
        database.posts.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                console.log("DOC" + JSON.stringify(doc.data() + "id-" + doc.id))
                let obj = { postData:{...doc.data()}, index: doc.id }
                console.log("useEffect"+doc.id)
                parr.push(obj)
            })
            setLoading(false)
            setPosts(parr)
        })
    }, [])


    return (

        <div className='container'>
           
            {
                posts.length == 0 || user == null ?
                    <CircularProgress color="secondary" /> :
                    <div className='video-container'>
                    
                        {
                            posts.map((post) => (
                                
                                <React.Fragment key={post.index}>
                                      {console.log(post.index)}
                                    <div className='video-frame'>
                                        <Reels video={post.postData.pUrl} />
                                        <div className='details' style={{ display: 'flex', alignContent: 'center' }}>
                                            <Avatar src={post.postData.userProfileImage} />
                                            <h4>{post.postData.user}</h4>
                                          
                                            <Like className='like-styling' postData={post.postData} userData={props.user} postId={post.index} />
                                        </div>
                                    </div>

                                </React.Fragment>
                            ))
                        }
                    </div>
            }
        </div>
    )
}

export default Posts