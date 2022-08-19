import React, { useState } from 'react'
import './nav.css'
import SignUp from './SignUp'
import Login from './Login'

const Navbar = () => {
    const [signUp, setSignUp] = useState(false)
    const [login, setLogin] = useState(false)

    const handleShowLogin = () => {
        setSignUp(false)
        setLogin(!login)
    }
    const handleShowSignUp = () => {
        setLogin(false)
        setSignUp(!signUp)
    }
    const hideSignUp = () => {
        setSignUp(false)
    }
    let token = JSON.parse(localStorage.getItem("token"));
    const LogOut = () => {
        localStorage.clear()
        window.location.reload()
    }
    return (
        <>
            <div className='NavbarBox'>
                <div className='NavbarInnerBox'>
                    <p onClick={handleShowLogin}>Login</p>
                    {token ? <p onClick={LogOut}>LogOut</p> : <></>}

                    <p onClick={handleShowSignUp}>Sign Up</p>
                </div>
            </div>
            {signUp ? <SignUp showlogin={handleShowLogin} hideSignUp={hideSignUp} /> : <></>}


            {login ? < Login cut={handleShowLogin} /> : <></>}
        </>
    )
}

export default Navbar