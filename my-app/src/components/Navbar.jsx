import React, { useState } from 'react'
import './nav.css'
import SignUp from './SignUp'
import Login from './Login'
import { useEffect } from 'react'

const Navbar = () => {
    const [signUp, setSignUp] = useState(false)
    const [login, setLogin] = useState(false)
    const[user,setUser]=useState()
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

    function getLoggedIn(){
        let token = JSON.parse(localStorage.getItem("token"));
     console.log(token)
      let url = `http://localhost:8081/loggedinuser`;
      fetch(url,{
        method:"POST",
        body: JSON.stringify({
          token:token
        }),
        headers:{
          "Content-Type" : "application/json"
        }
      })
      .then(res=>res.json())
      .then((res)=>{
        console.log(res)
        setUser(res)
      })
      .catch((error)=>console.log(error))
    }
    useEffect(()=>{
        getLoggedIn()
    },[])
    console.log(user)
    return (
        <>
            <div className='NavbarBox'>
                <div className='NavbarInnerBox'>
                    <p onClick={handleShowLogin}>{user ? <span>{user.data.name}</span> : <span>Login</span>}</p>
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