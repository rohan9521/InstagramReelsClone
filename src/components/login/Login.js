import React, { useState, useEffect, useContext } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Instagram from '../../Assets/Instagram.JPG'
import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField';
import { Link,useNavigate } from 'react-router-dom'
import './Login.css'
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext,Image } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
import bg2 from '../../Assets/insta.png'
import img5 from '../../Assets/img5.jpg'
import img4 from '../../Assets/img4.jpg'
import img3 from '../../Assets/img3.jpg'
import img2 from '../../Assets/img2.jpg'
import img1 from '../../Assets/img1.jpg'
import { AuthContextProvider } from '../context/AuthProvider';

function Login() {
    const [email, setEmail]         = useState('')
    const [password, setPassword]   = useState('')
    const [error, setError]         = useState('')
    const [loading,setLoading]      = useState('')
    const {signIn} = useContext(AuthContextProvider)
    const navigate = useNavigate()

    const styles = ({
        text1: {
            color: 'grey',
            textAlign: 'center'
        }
    })
    let handleLogin = async ()=>{
        try{
            setError('')
            setLoading(true)
            await signIn(email,password)
            setLoading(false)
            navigate('/')
        }catch(err){
            setTimeout(()=>{
                setError(error)
            },2000)
            setLoading(false)
            console.log(err)
        }
    }
    return (
        <div className='login-wrapper'>
            <div className='imgcar' style={{backgroundImage: 'url('+bg2+')',backgroundSize:'cover'}}>
                <div className='car'>
                <CarouselProvider
                        naturalSlideWidth={100}
                        naturalSlideHeight={177}
                        totalSlides={5}
                        isPlaying={true}
                        touchEnabled={false}
                        dragEnabled={false}
                        >
                        <Slider>
                            <Slide index={0}><Image src={img1}/></Slide>
                            <Slide index={1}><Image src={img2}/></Slide>
                            <Slide index={2}><Image src={img3}/></Slide>
                            <Slide index={3}><Image src={img4}/></Slide>
                            <Slide index={4}><Image src={img5}/></Slide>
                        </Slider>
                    </CarouselProvider>
                </div>
           
            </div>
            <div className='login-card'>
                <Card variant="outlined">
                    <div class='insta-logo'>
                        <img src={Instagram} />
                    </div>
                    
                    <CardContent>
                        <Typography className={styles.text1}>
                            Sign up to see photos and videos from your friends
                        </Typography>
                        <Typography className='typography-text'>
                            {
                                error!="" && <Alert variant="outlined" severity="error">
                                    {error}
                                </Alert>
                            }
                        </Typography>
                        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} margin="dense" size="small" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth={true} margin="dense" size="small" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <CardContent>
                            <Typography className='typography-text'>
                                Forget Password?
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button margin="dense" variant="contained" onClick={handleLogin} color="primary" fullWidth={true}>Login</Button>
                        </CardActions>

                    </CardContent>

                </Card>
                <Card variant='outlined' >
                    <CardContent className='card-content'>
                        <Typography className={styles.text1}>
                            Dont have an account ? <Link to="/signup">Sign up</Link>
                        </Typography>
                    </CardContent>
                </Card>

            </div>

        </div>
    )
}

export default Login