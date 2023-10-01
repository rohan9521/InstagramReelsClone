// import React from 'react'
import Stories from './Stories'
import React, { useEffect, useContext, useState } from 'react'
import { AuthContextProvider } from '../../context/AuthProvider'
import { database } from '../../firebase/FirebaseSetup';
import ContentPostView from './ContentPostView';

function ContentPosts() {
    const { user } = useContext(AuthContextProvider)
    const [postList, setPostList] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        let contentPosts = []
        setLoading(true)
        database.contentPost.orderBy('createdAt', 'desc').onSnapshot((snapshot) => {
            snapshot.forEach((doc) => {
                console.log("DOC" + JSON.stringify(doc.data() + "id-" + doc.id))
                let obj = { postData: { ...doc.data() }, index: doc.id }
                console.log("useEffect" + doc.id)
                contentPosts.push(obj)
            })
            setLoading(false)
      
            setPostList(contentPosts)
        })
       
    }, [])

    return (
        <div
            style={{
                marginTop: '0',
                display: 'flex',
                justifyContent: 'center'
            }}
        >
           
            <div
                style={{
                    height: '90vh',
                    width: '40vw',
                }}
            >
                <div
                    style={{
                        height: '10vh',
                        backgroundColor: '#edf0ef',
                        marginBottom: '5%',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
                    }}
                >
                    <Stories />
                </div>
          
                {
                    postList.map((posts) => (
                        <>
                         
                           <ContentPostView user={user} postData={posts.postData} postId={posts.index} />

                        </>
                    ))
                }

            </div>
        </div>
    )
}

export default ContentPosts