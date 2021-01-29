import React, { createRef } from 'react'

function ImageUploader({mediaFile, fileHandler}) {
    const filePickerRef = createRef();

    const pickerFileHandler = () => {
        filePickerRef.current.click();
    }

    return (
        <div className="file-upload my-2 my-sm-3">
            <span className="text-muted text-center px-2">
                { mediaFile ? mediaFile.name : 'Select any image file' }
            </span>
            <input 
                type="file"
                ref={filePickerRef}
                style={{"display": "none"}}
                accept=".jpg,.jpeg,.png"
                onChange={fileHandler}
                />
            <button type="button" onClick={pickerFileHandler} className="btn btn-secondary btn-sm my-2">Upload</button>
        </div>
    )
}

export default ImageUploader
