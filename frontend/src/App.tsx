import { useState } from 'react'
import reactLogo from './assets/react.svg'

import { HashRouter, Routes, Route } from 'react-router-dom'

import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/home/Home'
import Game from './pages/game/Game'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <HashRouter>
                <Routes>
                    <Route path='/' element={<Home />}> </Route>
                    <Route path='/game' element={<Game />}> </Route>
                </Routes>
            </HashRouter>
        </>
    )
}

export default App
