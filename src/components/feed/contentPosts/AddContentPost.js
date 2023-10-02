import React, { useEffect, useContext, useState, useRef } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Modal from '@mui/material/Modal';
import bg from '../../../Assets/bg.jpg'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { database, storage } from '../../firebase/FirebaseSetup'
import { v4 as uuidv4 } from 'uuid'

function AddContentPost(props) {
    console.log(props.openModal)
    const [file, setFile] = useState(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [contentText, setContentText] = useState('')
    const inputRef = useRef()
    const handleClose = () => {
        props.setOpenModal(false)
    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
    let handleUploadPic = () => {
        inputRef.current.click()
    }
    let uploadPost = async () => {
        let uuid = uuidv4()
        let uploadTask = storage.ref(`/contentposts/${uuid}/contentImage`).put(file)

        let imageUploadSuccess = async () => {
            uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then(async (url) => {
                    let contentObj = {
                        contentImage: url,
                        contentText: contentText,
                        createdAt: database.getTimeStamp(),
                        createdBy: props.user.userId,
                        creatorUserName: props.user.fullname,
                        creatorUserProfileImage: props.user.profileUrl,
                        likes: [],
                        comments: []
                    }
                    await database.contentPost.add(contentObj).then(async (ref) => {
                        let res = await database.users.doc(props.user.userId).update({

                            contentPostIds: props.user.contentPostIds == null ? [ref.id] : [...props.user.contentPostIds, ref.id]
                        })

                    }).then(() => {
                        setLoading(false)
                    }).catch((error) => {
                        setError(error)
                        setLoading(false)
                        setTimeout(() => {
                            setError('')
                        }, 2000)
                    })
                })
        }
        let imageUploadLoading = (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            setLoading(true)
        }
        let imageUploadError = (error) => {
            setError(error)
            setLoading(false)
        }
        console.log("propsfromUploadFile3")

        uploadTask.on('state_changed', imageUploadLoading, imageUploadError, imageUploadSuccess)

    }
    return (
        <Dialog
            open={props.openModal}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth={true}

        > <DialogContent
            style={{
                height: '80vh'
            }}
        > <Box sx={style}>
                    <div
                        style={{
                            height: '60vh'
                        }}
                    >
                        <img
                            style={{
                                height: '40vh'
                            }}
                             src={bg}
                             onClick={handleUploadPic} />
                        {loading && <LinearProgress color="secondary" style={{ width: 100 }} />}
                        <input ref={inputRef} hidden type='file' accept='image/*' onChange={(e) => { setFile(e.target.files[0]) }} />
                        <input type="text" onChange={(e) => { setContentText(e.target.value) }} />
                        <Button color="secondary" variant="contained" onClick={uploadPost} >Post</Button>
                    </div>
                </Box>
            </DialogContent>
        </Dialog>
    );
}

export default AddContentPost




