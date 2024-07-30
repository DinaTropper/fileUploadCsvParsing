import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});

const Upload = () => {

    const fileRef = useRef();
    const navigate = useNavigate();

    const onUploadClick = async () => {
        if (!fileRef.current.files.length) {
            return;
        }
        const file = fileRef.current.files[0];
        const base64 = await toBase64(file);
        await axios.post('/api/fileupload/upload', {
            fileName: file.name,
            base64data: base64
        })

        navigate('/');
    }

    return (
        <div className="container" style={{ marginTop: "60px" }} >
            <div className="d-flex vh-100" style={{ marginTop: "-70px" }} >
                <div className="d-flex w-100 justify-content-center align-self-center">
                    <div className="row">
                        <div className="col-md-10">
                            <input type="file" ref={fileRef} className="form-control" />
                        </div>
                        <div className="col-md-2">
                            <button onClick={onUploadClick} className="btn btn-primary">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;