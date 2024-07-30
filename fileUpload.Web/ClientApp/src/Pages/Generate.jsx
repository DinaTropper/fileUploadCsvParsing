import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Generate = () => {

    const [amount, setAmount] = useState();
    const navigate = useNavigate();

    const onGenerateClick = async () => {
        window.location.href = `/api/fileupload/generate?amount=${amount}`;
    }

    return (
        <div className="d-flex vh-100" style={{ marginTop: "-70px" }} >
            <div className="d-flex w-100 justify-content-center align-self-center">
                <div className="row">
                    <input type="number" min="0" value={amount} onChange={e => setAmount(e.target.value)} placeholder="Amount" />
                </div>
                <div className="row">
                    <div className="col-md-4 offset-md-2">
                        <button onClick={onGenerateClick} className="btn btn-primary btn-lg">Generate</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Generate;