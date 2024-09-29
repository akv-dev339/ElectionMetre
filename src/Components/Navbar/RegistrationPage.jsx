import React from 'react'
import './RegistrationPage.css'
import{Link} from 'react-router-dom'
const RegistrationPage = () => {
  return (
    <div className='loginsignup'>
    <div className="loginsignup-container">
        <h1>Register</h1>
        <div className="loginsignup-fields">
            <input type="text" placeholder='Your name' />
            <input type="email" placeholder='Your email' />
            <input type="phone" placeholder='Your Phone Number' />
            <input type="password" placeholder='create password'/>
        </div>
        <div className="loginsignup-agree">
            <input type="checkbox" />
            <p>By continuing I agree to the terms and conditions</p>
        </div>
        <button>Continue</button>
       <Link to='/login'><p className='loginsignup-login'>Already have an account <span>Login here</span></p></Link> 
        
    </div>
  
</div>
  )
}

export default RegistrationPage
