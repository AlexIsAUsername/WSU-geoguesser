import React, { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Home.css";

const Home = () => {

    const [key, setKey] = useState<string>("");
    const nav = useNavigate();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (key !== "") {
            setKeyOnFS(key);
        }
        nav("/game");
    }

    const setKeyOnFS = async (apiKey: string) => {
        const res = await fetch("http://localhost:4000/setkey", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                key: apiKey
            }) 
        });

        const data: string = await res.json();

        if (res.status !== 200) {
            console.log("Something went wrong :(");
            console.log(data);
        }
    }

    return (
        <div className="home-container">
            <div className="home-title">Welcome to WSU Geoguesser</div>

            <form className="home-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    className="home-input"
                    placeholder="Enter API Key"
                    onChange={(e) => setKey(e.target.value)}
                />
                <button type='submit' className="home-button">Submit</button>
            </form>
        </div>
    )
}

export default Home;
