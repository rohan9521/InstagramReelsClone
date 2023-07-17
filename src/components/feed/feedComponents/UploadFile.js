import React, { useContext, useRef, useState } from 'react'
import { AuthContextProvider } from '../../context/AuthProvider'
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import { database, storage } from '../../firebase/FirebaseSetup'
import { v4 as uuidv4 } from 'uuid'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom';

function UploadFile(props) {
  
  const [currUser, setCurrUser] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { signOut, user } = useContext(AuthContextProvider)
  const navigate = useNavigate()
  const inputReelsRef = useRef()

  let handleOnSignOut = () => {
    signOut()
    navigate('/login')
  }
  let handleUploadReel = async (file) => {
    console.log(file)
    setLoading(true)
    if (file == null) {
      setError('No file selected')
      setTimeout(() => {
        setError('')
      }, 2000)
    }
    if (file.size / (1024 * 1024) > 100) {
      setError('File size if very large! Reels size limit is 100MB')
      setTimeout(() => {
        setError('')
      }, 2000)
    }
    let uuid = uuidv4()
    console.log(`${uuid}`)
    let uploadTask = storage.ref(`/posts/${uuid}/${file.name}`).put(file)
    let imageUploadSuccess = async () => {

      uploadTask.snapshot.ref.getDownloadURL().then((url) => {
        console.log(url)

        let obj = {
          likes: [],
          comments: [],
          pId: uuid,
          pUrl: url,
          user: props.user.fullname,
          userProfileImage: props.user.profileUrl,
          userId: props.user.userId,
          createdAt: database.getTimeStamp()
        }
        database.posts.add(obj).then(async (ref) => {
          let res = await database.users.doc(props.user.userId).update({
            postIds: props.user.propIds == null ? [ref.id] : [...currUser.postIds, ref.id]
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
    uploadTask.on('state_changed', imageUploadLoading, imageUploadError, imageUploadSuccess)

  }
  return (
    <div style={{
      display:'flex',
      flexDirection:'column',
      justifyContent:'start',
      alignItems:'center'
      }}>
      {error != "" &&
        <Alert variant="outlined" severity="error">
          {error}
        </Alert>
      }
      <Button  margin="dense" variant="outlined" color="secondary" fullWidth={false} onClick={() => { inputReelsRef.current.click() }}>
        Upload reels
        <input ref={inputReelsRef} hidden type='file' accept='video/*' onChange={(e) => { handleUploadReel(e.target.files[0]) }} />
      </Button>
      {loading && <LinearProgress color="secondary" style={{ width: 100 }} />}
    </div>
  )
}

export default UploadFile