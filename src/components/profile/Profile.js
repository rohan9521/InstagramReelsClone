import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase/FirebaseSetup'
import CircularProgress from '@mui/material/CircularProgress';
import './Profile.css'
import Button from '@mui/material/Button';
import Reels from '../../components/feed/feedComponents/Reels';
import Like from '../../components/feed/feedComponents/Like';
import Comments from '../../components/feed/feedComponents/Comments';

function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  let getReels = async () => {

    if (user != null && user.postIds.length!=0) {
      let posts = []
      await user.postIds.forEach(async (element) => {
        await database.posts.doc(element).get().then((postDoc) => {
          console.log("postsDOC" + JSON.stringify(postDoc.data()))
          posts.push({ postData: { ...postDoc.data() }, index: postDoc.id })
        })

      });
      setPosts(posts)
    }

  }
  useEffect(() => {
    database.users.doc(id).onSnapshot((doc) => {
      setUser(doc.data())
      console.log("user" + JSON.stringify(doc.data()))
    })
  }, [id])


  useEffect(() => {
    getReels()
  }, [user])

  return (
    <div>
      {
        user != null ?
          <div className='profile-container'>
            <div className='profile-details'>
              <div className='user-avatar'>
                <Avatar
                  src={user.profileUrl}
                  sx={{ width: 150, height: 150 }}
                />
              </div>
              <div className='user-data'>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h4 style={{ padding: '0', margin: '0' }}>{user.fullname}</h4>
                  <Button style={{ marginLeft: '40%', height: '10%' }}>Edit Profile</Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h4>Posts : {posts.length}</h4>
                  {/* <h4>followers</h4>
                  <h4>following</h4> */}
                </div>
              </div>
            </div>
            <hr style={{ marginTop: '3rem', marginBottom: '3rem' }} />

            <div className='reels-container'>

              {
                posts.map((post) => (
                  <div key={post.index} style={{ height: '20vh' }}>
                    {console.log("postindex" + post.index)}
                    <div className='video-frame-profile'>
                      <Reels style={{ height: '100%', borderRadius: '20px' }} video={post.postData.pUrl} />
                      <div style={{ display: 'flex', alignContent: 'center', position: 'absolute', bottom: '5%', left: '5%' }}>
                        <Comments post={post.postData} user={user} postId={post.index} className='comments-styling-profile' />
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          :
          <CircularProgress color="secondary" />
      }
    </div>
  )
}

export default Profile