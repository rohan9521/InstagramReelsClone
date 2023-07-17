import React, { Component, useState, useEffect, useContext,useRef } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './SignUp.css';
import insta from '../../Assets/Instagram.JPG'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import PublishIcon from '@mui/icons-material/Publish';
import { Link,useNavigate } from 'react-router-dom'
import {AuthContextProvider} from '../context/AuthProvider'
import { storage , database } from '../firebase/FirebaseSetup';


function SignUp() {
    const [email, setEmail]         = useState('')
    const [password, setPassword]   = useState('')
    const [fullName, setFullName]   = useState('')
    const [file,setFile]            = useState(null)
    const [error,setError]          = useState('')
    const [loading,setLoading]      = useState(false)
    const {signUp,setCurrUser} = useContext(AuthContextProvider)
    const navigate = useNavigate()
    const inputRef = useRef()
    const styles = ({
        text1: {
            color: 'grey',
            textAlign: 'center'
        }
    })

    let handleUploadProfilePic = ()=>{
        inputRef.current.click()
    }
 
    let handleSignUp = async ()=>{
       
        if(file==null){
            setError("Please Upload Profile Picture")
            setTimeout(()=>{
                setError('')
            },2000)
            return 
        }
        console.log("signup")
        try{
            let userObj = await signUp(email,password)
            console.log("err0")
            let uuid = userObj.user.uid
            let uploadTask = storage.ref(`/users/${uuid}/profileImage`).put(file)
            console.log("err1")
            let imageUploadSuccess=async ()=>{
                uploadTask
                .snapshot
                .ref
                .getDownloadURL()
                .then((url)=>{
                    console.log(url)
                    database.users.doc(`${uuid}`).set({
                        email:email,
                        userId:uuid,
                        fullname:fullName,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                    })    
                })
                .then(()=>{
                        setLoading(false)
                        navigate('/')
                })
                
            }
            let imageUploadLoading=(snapshot)=>{
                let progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
                setLoading(false)
            }
            let imageUploadError=(error)=>{
                setError(error)
            }
            uploadTask.on('state_changed',imageUploadLoading,imageUploadError,imageUploadSuccess)
            console.log("err")

        }catch(err){
            console.log(err)
        }

    }
    return (
        <div className='signupwrapper'>
          
            <div className='signupcard'>
                <Card variant="outlined">
                    <div class='insta-logo'>
                        <img src={insta} />
                       { console.log("asd")}
                    </div>
                    <CardContent>
                        <Typography className={styles.text1}>
                            
                            Sign up to see photos and videos from your friends
                        </Typography>
                        <Typography className={styles.text1}>
                            {
                                error!="" && <Alert variant="outlined" severity="error">
                                   {error} 
                                </Alert>
                            }
                        </Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                        <CardActions>
                            <Button margin="dense" variant="outlined" color="secondary" fullWidth={true} onClick={handleUploadProfilePic}>
                                Upload Profile Image
                                <input ref={inputRef} hidden type='file'  accept='image/*'  onChange={(e)=>{setFile(e.target.files[0])}} />
                            </Button>
                        </CardActions>
                        <CardActions>
                            <Button margin="dense" variant="contained" disabled={loading} onClick={handleSignUp} color="primary" fullWidth={true}>SignUp</Button>
                        </CardActions>
                        <CardContent>
                            <Typography >
                                By signing in you agree to terms, agreement and Cookie Policy.
                            </Typography>
                        </CardContent>
                    </CardContent>

                </Card>

                <Card variant='outlined' className='card-bottom'>
                    <CardContent className='card-content'>
                        <Typography className={styles.text1}>
                            Have Account ? <Link to="/login">Login</Link>
                        </Typography>
                    </CardContent>
                </Card>

            </div>
        </div>
    )

}

export default SignUp