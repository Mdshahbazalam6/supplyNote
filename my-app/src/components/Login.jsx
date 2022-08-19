import React, { useState } from 'react'
import './login.css'

const Login = ({ cut }) => {
  const [email, setemail] = useState()
  const [Password, setPassword] = useState()
  async function logintohome(email, password) {
    const payload = { postbody: { email, password } };
    try {
      let res = await fetch(`http://localhost:8081/log`, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let user_data = await res.json();
      console.log(user_data);
      localStorage.setItem('token', JSON.stringify(user_data.data.token));
      //   if(user_data.data.token){
      getLoggedIn()
      cut()
      //   }
    } catch (error) {
      alert('Incorrect Email or Password')
    }
  }
  React.useEffect(() => {
    getLoggedIn()
  }, [])

  function getLoggedIn() {
    let token = JSON.parse(localStorage.getItem("token"));
    console.log(token)
    let url = `http://localhost:8081/loggedinuser`;
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        token: token
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then((res) => {
        console.log(res)


      })
      .catch((error) => console.log(error))
  }


  return (
    <div className='LoginBox'>
      <p style={{ textAlign: "right", margin: '.5vh 1vh' }} onClick={cut}>❌</p>
      <div className='SignUpForm'>
        <h3 className='loginh3'>LOGIN</h3>
        <label>Email</label>
        <input type="email" className='LoginEmail' onChange={(e) => setemail(e.target.value)} />
        <label>Password</label>
        <input type="password" className='LoginPassword' onChange={(e) => setPassword(e.target.value)} />
        <button className='Loginbutton' onClick={() => logintohome(email, Password)}>Login</button>
      </div>

    </div>
  )
}

export default Login