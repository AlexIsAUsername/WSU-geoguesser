import React, { FormEvent, useState } from 'react'
import { NavButton } from '../../components/NavButton/NavButton'
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const [key, setKey] = useState<string>("");
    const nav = useNavigate()

    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if(key != ""){
            setKeyOnFS(key)
        }
        nav("/game")
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
        })

        const data: string = await res.json();

        if (res.status != 200){
            console.log("sum wrong :(");
            console.log(data);
        }

    }


    return (
        <>
            <div>Welcome to WSU Geoguesser</div>

            <form onSubmit={handleSubmit}>

                <input 
                    type="text"
                    onChange={(e) => setKey(e.target.value)}
                />

                <button type='submit'>Submit</button>

            </form>
        </>
    )
}
export default Home

