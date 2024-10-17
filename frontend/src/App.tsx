import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'
import Game from './pages/game/Game'
import Score from './pages/score/Score'

function App() {


    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path='/game' element={<Game />}> </Route>
                    <Route path='/score' element={<Score />}> </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}

export default App
