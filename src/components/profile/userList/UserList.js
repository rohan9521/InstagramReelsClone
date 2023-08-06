import React, { useState, useEffect } from 'react'
import { database } from '../../firebase/FirebaseSetup'
import { Avatar, Button } from '@mui/material'
import './UserList.css'
function UserList(props) {
    const [userList, setUserList] = useState([])
    console.log(props.type)
    let loadUsers = async () => {
        let userArr = []
        for (let i = 0; i < props.userList.length; i++) {
            let userId = props.userList[i]
            await database.users.doc(userId).get().then((user) => {
                console.log("UserData" + JSON.stringify(user.data()))
                userArr.push(user.data())
            })
        }
        console.log(JSON.stringify(props))
        console.log(JSON.stringify(JSON.stringify(userArr)))
        setUserList(userArr)
    }
    useEffect(() => {
        loadUsers()
    }, [])

    return (
        <div style={{ width: '100%', display: 'flex',flexDirection:'column', alignItems: 'center' }}>
            {
                userList.map((user) => (

                    <div style={{ display: 'flex', alignItems: 'center', width: '40%' }}>
                        <Avatar
                            src={user.profileUrl}
                            sx={{ width: 60, height: 60, padding: '0%', margin: '0%' }}
                        />
                        <div style={{ display: 'flex',margin:'2%',padding:'2%',backgroundColor: 'lightgray' ,borderRadius:'10px',alignItems:'center',width:'90%'}}>
                            <div style={{ display: 'flex', flexDirection: 'column',width:'100%' }}>
                                <p>{user.fullname}</p>
                                <p>{user.description}</p>
                                <p>{user.followers.length} Followers {user.following.length} Following</p>

                            </div>
                            {console.log(JSON.stringify(user))}
                            <Button style={{ height: '30%', color: 'black',marginLeft:'2%' }} variant="outlined">Follow</Button>
                        </div>
                    </div>
                ))
            }
        </div>

    )
}

export default UserList