import { useNavigate } from 'react-router-dom'

import React from 'react'
interface navButtonProps {
    loc: string
    buttonString: string
}
export const NavButton = ({ loc, buttonString }: navButtonProps) => {
    const nav = useNavigate()


    return (
        <input className="element-invisible mobile-exposed" type="button" value={buttonString} onClick={() => nav(loc)}></input>
    )
}

