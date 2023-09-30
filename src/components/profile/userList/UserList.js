import React, { useState, useEffect } from 'react'
import { database } from '../../firebase/FirebaseSetup'
import { Avatar, Button } from '@mui/material'
import './UserList.css'
function UserList(props) {
    const [loading, setLoading] = useState(false)
    const [userList, setUserList] = useState([])

    let loadUsers = async () => {
        let userArr = []

        for (const key of props.userList.keys()) {
            let userId = key
            console.log(userId)

            await database.users.doc(userId).get().then((user) => {
                console.log("UserData" + JSON.stringify(user.data()))
                userArr.push(user.data())
            })
        }

        setUserList(userArr)
    }

    let handleFollowUnfollow = async (otherUserId) => {
        if(loading)
            return
        
        if (props.followingMap.has(otherUserId)) {
            //unfollow a user
            setLoading(true)
            await database.users.doc(otherUserId).get().then(async (obj) => {
                let followersList = obj.data().followers
                let newFollowerList = followersList.filter((id) => {
                  return  id != props.user.userId
                })
                await database.users.doc(otherUserId).update({
                    followers: [...newFollowerList]
                })

                let followingList = props.user.following
                let newFollowingList = followingList.filter((id) => {
                    return  id != otherUserId
                })
                await database.users.doc(props.user.userId).update({
                    following: [...newFollowingList]
                })
                setLoading(false)
            })
        } else {
            //following a user
            await database.users.doc(otherUserId).get().then(async (obj) => {
                setLoading(true)
                let followersList = obj.data().followers
                followersList.push(props.user.userId)
                await database.users.doc(otherUserId).update({
                    followers: [...followersList]
                })

                let followingList = props.user.following
                followingList.push(otherUserId)
                await database.users.doc(props.user.userId).update({
                    following: [...followingList]
                })
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        loadUsers()
        return () => {
            setUserList([])
        }
    }, [props.userList])

    let handleShowFollowUnfollow = (userInList) => {
        console.log("UserJSON" + JSON.stringify(props))
        if (props.type == "followers" && props.followingMap.has(userInList.userId))
            return "unfollow"
        else if(props.type == "following")
            return "unfollow"
        return "follow"
    }

    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {
                userList.map((user) => (

                    <div style={{ display: 'flex', alignItems: 'center', width: '40%' }}>
                        <Avatar
                            src={user.profileUrl}
                            sx={{ width: 60, height: 60, padding: '0%', margin: '0%' }}
                        />
                        <div style={{ display: 'flex', margin: '2%', padding: '2%', backgroundColor: 'lightgray', borderRadius: '10px', alignItems: 'center', width: '90%' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <p>{user.fullname}</p>
                                <p>{user.description}</p>
                                <p>{user.followers.length} Followers {user.following.length} Following</p>

                            </div>
                            {console.log(JSON.stringify(user))}
                            <Button style={{ height: '30%', color: 'black', marginLeft: '2%' }} onClick={()=>{handleFollowUnfollow(user.userId)}} variant="outlined">{handleShowFollowUnfollow(user)}</Button>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default UserList