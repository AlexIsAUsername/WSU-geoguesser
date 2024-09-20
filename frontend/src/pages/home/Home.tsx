import React from 'react'
import { NavButton } from '../../components/NavButton/NavButton'

const Home = () => {
    return (
        <>
            <div>Welcome to WSU Geoguesser</div>
            <NavButton loc='/game' buttonString='no' />
        </>
    )
}
export default Home

