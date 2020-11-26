import React, { createRef } from 'react'

function ProfilePicUploader({fileHandler, btnText, btnClass}) {
    const filePickerRef = createRef();

    const pickerFileHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <>
            <input 
                type="file"
                ref={filePickerRef}
                style={{"display": "none"}}
                accept=".jpg,.jpeg,.png"
                onChange={fileHandler}
                />
            <button className={btnClass} onClick={pickerFileHandler}>{btnText}</button>
        </>
    )
}

export default ProfilePicUploader
