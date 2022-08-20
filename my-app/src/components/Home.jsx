import React from 'react'
import { useState } from 'react'
import Navbar from './Navbar'
import './home.css'
import { CopyToClipboard } from 'react-copy-to-clipboard'


const Home = () => {
  const [url, setUrl] = useState()
  const [shortUrl, setshortUrl] = useState()
  const [copied, setCopied] = useState(false)

  async function getUrl(url) {
    setCopied(false)
    let token = JSON.parse(localStorage.getItem("token"));
    if (!token) {
      return alert('To get Url SignUp First')
    } else if (!url) {
      return alert('please provide a valid URL')
    }
    const payload = { url: url };
    try {
      let res = await fetch(`http://localhost:8081/geturl`, {
        method: 'post',
        body: JSON.stringify(payload),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      let user_data = await res.json();
      console.log(user_data);
      console.log(user_data.shortURl);

      setshortUrl(user_data.url)

    } catch (error) {
      console.log(error)
    }
  }
   
  return (
    <>
      <Navbar />
      <h1 className='HomeH1'>Get Short URL</h1>
      <div className="homeInputContainer">
        <input type="text" className="homeUrlInput" onChange={(e) => setUrl(e.target.value)} placeholder='Enter Url' />
      </div>
      <button className="HomeButton" onClick={() => getUrl(url)}> Submit</button>

      {shortUrl ? <h1 style={{ textAlign: "center" }}><a href={`http://localhost:8081/${shortUrl.shortURl}`} target='_blank' >http://localhost:8081/{shortUrl.shortURl}</a></h1> : <></>}
      {shortUrl ? (< CopyToClipboard text={shortUrl.url}
        onCopy={() => setCopied(true)}
      >
        {copied ?  <button className='CopyButton' style={{backgroundColor:'green'}}>Copy To ClipBoard</button> : <button className='CopyButton'>Copy To ClipBoard</button>}
       
      </CopyToClipboard>) : <></>}


    </>
  )
}
// http://localhost:8081/bMVOWKAHH

export default Home