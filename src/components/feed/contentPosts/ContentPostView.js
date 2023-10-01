import { Card } from '@mui/material'
import React from 'react'
import Like from '../feedComponents/Like'
import Comments from '../feedComponents/Comments'
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import '../feedComponents/css/Posts.css'

function ContentPostView(props) {
  return (
    <div
      style={{
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
      }}
    >
      <Card sx={{ maxWidth: 600 }}>
        <CardHeader
          avatar={
            <Avatar src={props.postData.creatorUserProfileImage} sx={{ bgcolor: red[500] }} aria-label="recipe" />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={props.postData.creatorUserName}
          subheader={Date(props.postData.createdAt.seconds)}
        />
        <CardContent>
          {props.postData.contentText != '' &&
            <Typography variant="body2" color="text.secondary">
              {props.postData.contentText}
            </Typography>}
        </CardContent>
        <CardMedia
          component="img"
          height="194"
          image={props.postData.contentImage}
          alt=""
        />

      </Card >
      <Card
        style={{
          height: '2%',

        }}
      >
        <CardContent
          style={{
            margin: '0',
            height:'3%',
            display: 'flex',
            justifyContent: 'start',
            backgroundColor: 'gray',
            alignItems:'center',
            borderRadius:'15px',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
 
          }}>
          <Like style={{ marginLeft: '1%' }} className='like-styling' postData={props.postData} userData={props.user} postId={props.postId} />
          <Comments style={{ marginLeft: '1%' }} post={props.postData} user={props.user} postId={props.postId} className='comments-styling' />
        </CardContent>

      </Card>
    </div>
  )
}

export default ContentPostView