import React from 'react'

function ShowImage(props) {
    return (
        <img src={props.src} className={props.classes} {...props} alt=""/>
    )
}

export default ShowImage
