import React, { useState, useEffect } from 'react'
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import './css/Like.css'
import { database } from '../../firebase/FirebaseSetup'

function Like({ postData, postId, userData }) {
    const [liked, setLiked] = useState(false)
    console.log(liked)
    let handleClick = async () => {
        let likedUserArr = []
        if (liked == true)
            likedUserArr = postData.likes.filter((userId) => (userId != userData.userId))
        else
            likedUserArr = [...postData.likes, userData.userId]

        await database.posts.doc(postId).update({
            likes: likedUserArr
        })
        let like = liked? false : true
        setLiked(like)
    }
    useEffect(() => {
        console.log(liked)
        let checkLike = postData.likes.includes(userData.userId)
        setLiked(checkLike)
    }, [])

    return (
        <div>
            {liked ? <FavoriteBorderOutlinedIcon style={{color:'black'}} onClick={handleClick} className='like' /> : <FavoriteBorderOutlinedIcon style={{color:'black'}} onClick={handleClick} className='un-like' />
            }
        </div>
    )
}

export default Like