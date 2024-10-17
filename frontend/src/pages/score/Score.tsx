import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Score = () => {

    const { state } = useLocation();
    const nav = useNavigate();

    
    const data = state;
    return (
        <div>{data}</div>
    )
}


export default Score;