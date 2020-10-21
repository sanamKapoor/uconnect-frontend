import React from 'react'

function VideoPlayer({src, classes, height}) {
    return (
        <div style={{height: height}}>
            <video src={src} controlsList="nodownload" muted controls autoPlay loop className={classes} style={{height: height}}></video>
        </div>
    )
}

export default VideoPlayer
