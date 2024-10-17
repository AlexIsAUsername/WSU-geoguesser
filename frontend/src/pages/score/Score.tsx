import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

const Score = () => {

    const { state } = useLocation();
    const nav = useNavigate();
    const dist = state;

    const [score, setScore] = useState<number | undefined>();

    useEffect(() => {

        fetch("http://localhost:4000/score", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ dist })
        })
            .then((res) => {

                if (res.status != 200) {
                    alert("sum went wrong");
                    return;
                }

                return res.json();
            })
            .then((data) => {
                const s = data.score;
                setScore(s);
            })
    }, [score]) // on mount  or score load??


    return (
        (score) ? (
            <div>{score}</div>
        ) : (
            <>
                <h1> Loading... </h1>
                <p> Pretend there is a skeleton screen here</p>
            </>
        )

    )
}


export default Score;