import React, { useState, useEffect } from 'react'
import ChatIcon from '@mui/icons-material/Chat';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Reels from './Reels'
import Avatar from '@mui/material/Avatar';
import './css/Comments.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { database } from '../../firebase/FirebaseSetup';
import TextField from '@mui/material/TextField';
import { ArrowBackIosNewTwoTone } from '@mui/icons-material';
import FavoriteIcon from '@mui/icons-material/Favorite';

function Comments(props) {
    console.log("props=" + JSON.stringify(props))

    const [post, setPost] = useState(props.post)
    const [open, setOpen] = useState(false);
    const [commentText, setCommentText] = useState('')
    const [commentsList, setCommentList] = useState([])


    let getComments = async (commentIdList) => {
        console.log("addcommentsuseeffect")
        let arr = []
        for (let i = 0; i < commentIdList.length; i++) {
            await database.comments.doc(commentIdList[i]).get()
                .then((doc) => {
                    console.log("addcommentsuseeffect" + JSON.stringify(doc.data()))
                    arr.push(doc.data())

                })
        }
        setCommentList(arr)

    }

    useEffect(() => {
        database.posts.doc(props.postId).onSnapshot((doc) => {
            setPost(doc.data())
            getComments(doc.data().comments == null ? [] : doc.data().comments)

        })

    }, [])

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let handlePostComment = async () => {
        let commentObj = {
            postedBy: {
                userName: props.user.fullname,
                profilePicUrl: props.user.profileUrl
            },
            text: commentText,
            datePosted: database.getTimeStamp(),
            likes: []
        }

        await database.comments.add(commentObj)
            .then(async (doc) => {
                await database.posts.doc(props.postId).update({
                    comments: [...post.comments, doc.id]
                })
                console.log("addcommentsuseeffectupdate")
            })

    }

    return (
        <div>
            <ChatIcon style={{ color: 'white' }} onClick={handleClickOpen} />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                fullWidth={true}
                maxWidth='md'
            > <DialogContent>
                    <div className='modal'>
                        <div className='reel-container'>
                            <Reels className='reel-modal' video={props.post.pUrl} />
                        </div>


                        <Card className='comments-modal'>
                            <Card className='comments-list'>
                                <CardContent>
                                    <div className='commentslist-container'>

                                        {

                                            commentsList.map((comment) => (
                                                <div style={{ display: 'flex', alignItems: 'start',margin:'1%' }}>
                                                    <Avatar src={comment.postedBy.profilePicUrl} />
                                                    <div style={{backgroundColor:'lightgrey',width:'100%',padding:'0',borderRadius:'10px'}} >

                                                        <h4 style={{margin:'0',padding:'0',color:'blue'}}>{comment.postedBy.userName}</h4>

                                                        <p style={{margin:'0',padding:'0'}}>{comment.text}</p>
                                                        <FavoriteIcon />
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>

                                </CardContent>
                            </Card>
                            <Card>
                                <CardContent>
                                    <div className='add-comments'>
                                        <TextField fullWidth={true} value={commentText} onChange={(e) => { setCommentText(e.target.value) }} />
                                        <Button variant="contained" onClick={handlePostComment}>Post</Button>
                                    </div>
                                </CardContent>

                            </Card>

                        </Card>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Comments