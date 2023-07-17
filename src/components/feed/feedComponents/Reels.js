import React from 'react'
import  ReactDOM  from 'react-dom'
import './css/Video.css'
function Reels(props) {
  let handleScroll = (e)=>{
    let next = ReactDOM.findDOMNode(e.target).parentNode.nextSibling
    console.log(ReactDOM.findDOMNode(e.target).parentNode)
    if(next!=null){
   
        next.scrollIntoView()
        e.target.muted = true
    }
  }
  let handleClick = (e)=>{
    e.preventDefault()
    if(e.target.paused) 
      e.target.play()
   
    e.target.muted = !e.target.muted
  }
    return (
 
        <video className='video' src={props.video}  onClick={handleClick} controls={false} onEnded={(e)=>{handleScroll(e)}}>

        </video>
 
  )
}

export default Reels