import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Avatar from '@mui/material/Avatar';
import { database } from '../firebase/FirebaseSetup'
import CircularProgress from '@mui/material/CircularProgress';
import './Profile.css'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import UserList from './userList/UserList';
import UserReels from './userReels/UserReels';

function Profile() {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  let getReels = async () => {

    if (user != null && user.postIds.length != 0) {
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
  const [tabName, setTabName] = React.useState('followers');

  const handleChange = (event, tabName) => {
    setTabName(tabName);
  };
  useEffect(() => {
    database.users.doc(id).onSnapshot((doc) => {
      setUser(doc.data())
      console.log("user" + JSON.stringify(doc.data()))
    })
  }, [id])


  useEffect(() => {
    getReels()
  }, [user])

  let showSwitch = (tabNamevalue) => {
    switch (tabNamevalue) {
      case "posts":
        return <UserReels posts={posts} user={user}/>

      case "reels":
        return console.log("reels")

      case "followers":{
        console.log("followers"+tabName)
        return <UserList userList={user.followers} type={"followers"} />
      }
      case "following":{
        console.log("following"+tabName)
        return <UserList userList={user.following} type={"following"}/>
      }
      default:
        return <></>
      
    }
  }

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
                  <Button style={{ marginLeft: '25 %', height: '10%' }}>Edit Profile</Button>
                </div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <h4> {posts.length} Posts</h4>
                  <h4 style={{ marginLeft: '5%' }}> {user.followers.length} followers</h4>
                  <h4 style={{ marginLeft: '5%' }}> {user.following.length} following </h4>
                </div>
                <div>
                  {user.description}
                </div>
                <div>
                  <Button>Follow</Button>
                </div>
              </div>
            </div>

            <hr style={{ marginTop: '1rem', marginBottom: '1rem' }} />
            <Box sx={{ width: '100%' }}>
              <Tabs
                value={tabName}
                onChange={handleChange}
                textColor="secondary"
                indicatorColor="secondary"
                aria-label="secondary tabs example"
                style={{display:'flex',justifyContent:'space-evenly'}}
              >
                
                <Tab value="posts" label="Posts" />
                <Tab style={{ marginLeft: '20%' }} value="reels" label="Reels" />
                <Tab style={{ marginLeft: '20%' }} value="followers" label="Followers" />
                <Tab style={{ marginLeft: '20%' }} value="following" label="Following" />
              </Tabs>
            </Box>
            <div className='reels-container'>
            {showSwitch(tabName)}
            </div>
          </div>
          :
          <CircularProgress color="secondary" />
      }
    </div >
  )
}

export default Profile