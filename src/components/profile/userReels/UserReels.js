import React from 'react'
import Comments from '../../feed/feedComponents/Comments'
import Reels from '../../feed/feedComponents/Reels'

function UserReels(props) {
    return (
        <div>{
            props.posts.map((post) => (
                <div key={post.index} style={{ height: '20vh' }}>
                    {console.log("newUserReels" + post.index)}
                    <div className='video-frame-profile'>
                        <Reels style={{ height: '100%', borderRadius: '20px' }} video={post.postData.pUrl} />
                        <div style={{ display: 'flex', alignContent: 'center', position: 'absolute', bottom: '5%', left: '5%' }}>
                            <Comments post={post.postData} user={props.user} postId={post.index} className='comments-styling-profile' />
                        </div>
                    </div>
                </div>
            ))
        }
        </div>
    )
}

export default UserReels