import React from 'react'
import { useState } from 'react'
import './signup.css'

const Login = ({ showlogin, hideSignUp,onSignup }) => {
  const [name, setName] = useState()
  const [email, setemail] = useState()
  const [Password, setPassword] = useState()

  const SignUp = async (name, email, password) => {
    console.log(email)
    if (email[email.length - 1] != 'm' && email[email.length - 2] != 'o' && email[email.length - 3] != 'c' && email[email.length - 4] != '.' && email[email.length - 5] != 'l'
      && email[email.length - 6] != 'i' && email[email.length - 7] != 'a' && email[email.length - 8] != 'm' && email[email.length - 9] != 'g'
      && email[email.length - 10] != '@') {
      console.log('line no 15')
      return alert('Check Your Email')
    } else if (((password.includes('@' || '!' || '#' || '$' || '%' || '^' || '&' || '*')) == false) && password.length <= 8) {
      return alert("Password Should consist atleast 8 caharcters")
    }
    else {
      const payload = { "postbody": { name, email, password } }
      console.log(payload)

      try {
        let res = await fetch(`http://localhost:8081/signup`, {
          method: "post",
          body: JSON.stringify(payload)
          , headers: {
            "Content-Type": "application/json"
          }
        })
        let user_data = await res.json()
        console.log(user_data)
        if(user_data.err){
          return alert('User Exist')
        }
        hideSignUp()
        hideSignUp()
        onSignup()

      } catch (error) {
        alert('user Exists')
        console.log(error)
      }
    }
  }
  return (
    <div className='SignUpBox'>
      <p style={{ textAlign: "right", margin: '.5vh 1vh' }} onClick={hideSignUp}>❌</p>
      <div className='SignUpForm'>
        <h3 className='SignUph3'>SIGN UP FORM</h3>
        <p className='SignUpP'>It's free and only takes a minute</p>
        <label>Name</label>
        <input type="text" className='SignUpName' onChange={(e) => setName(e.target.value)} />
        <label>Email</label>
        <input type="email" className='SignUpEmail' onChange={(e) => setemail(e.target.value)} />
        <label>Password</label>
        <input type="password" className='SignUpPassword' onChange={(e) => setPassword(e.target.value)} />
        <input type="submit" className='SignUpbutton' onClick={() => SignUp(name, email, Password)} />
        <p className='SignUpDescription'>By clicking the Sign Up buttton, you agree to our <span style={{ textDecoration: 'underLine', color: 'blue' }}>Terms and Condition</span>and <span style={{ textDecoration: 'underLine', color: 'blue' }}>Policy Privacy</span></p>
      </div>
      <p className='SignUpFormLogin'>Already have an account?  <span onClick={showlogin} style={{ color: 'blue', fontWeight: '800' }} >Log in</span></p>
    </div>
  )
}

export default Login