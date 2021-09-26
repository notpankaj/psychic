import React, { useContext} from 'react'
import Dropdown from '../components/Dropdown'
import { KernelContext } from "../contexts/kernelContext"

function Header() {
    const { kernel } = useContext(KernelContext)

    
    return (
        <header className="header">
            <div className="header__logo">
                <img className="header__logo-img" src={process.env.PUBLIC_URL + '/logo.png'}  alt="logo" />
                <span className="header__logo-title">P s y c h i c</span>
            </div>
            <span className="header__active-eingne"> {kernel?.activeEngine}</span>
            <div className="dropdown__container">
                <Dropdown/>
            </div>
        </header>
    )
}

export default Header