import React from 'react'
import './CustomerLogin.css'
const LoginSignup = () => {
  return (
    <div className='loginsignup'>
        <div className="loginsignup-container">
            <h1>SIGN IN</h1>
            <div className="loginsignup-fields">
                <input type="text" placeholder='Your name' />
                <input type="email" placeholder='Your email' />
                <input type="password" placeholder='enter password'/>
            </div>
            <button>LOGIN</button>
            
        </div>
      
    </div>
  )
}

export default LoginSignup
