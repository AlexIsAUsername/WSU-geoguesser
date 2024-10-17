import { BrowserRouter, Routes, Route } from 'react-router-dom'

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
                    <Route path='/home' element={<Home />}> </Route>
                    <Route path='/game' element={<Game />}> </Route>
                    <Route path='/score' element={<Score />}> </Route>
                </Routes>
            </BrowserRouter>
        </>
    )

}

export default App
