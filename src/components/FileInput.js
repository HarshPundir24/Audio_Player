import React from 'react';

const FileInput = ({ onFileChange }) => {
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        onFileChange(selectedFile);
    };

    return (
            <div className='d-flex'>
                <input type="file" accept="audio/*" onChange={handleFileChange} />
            </div>
    );
};

export default FileInput;