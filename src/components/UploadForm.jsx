import React from 'react';
import { useState } from 'react';

const UploadForm = () => {

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const typesAllowed = ['image/png', 'image/jpeg'];
  
    const changeHandler = (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile && typesAllowed.includes(selectedFile.type)) { 
            setFile(selectedFile);
            setError('')
        } else {
            setFile(null);
            setError('Please select an image file (.png or .jpg)');
        }
    }
  
    return (
    <form>
        <label>
            <input type="file" onChange={changeHandler}/>
            <span>+</span>
        </label>
        <div className="output">
            {error && <div className="error">{error}</div>}
            {file && <div>{file.name}</div>}
            {/* {file && <ProgressBar file={file} setFile={setFile}/>} */}
        </div>
    </form>
  )
}

export default UploadForm;