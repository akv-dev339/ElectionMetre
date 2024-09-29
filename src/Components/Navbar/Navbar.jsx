import React from 'react'
import './Navbar.css'
import {Link} from 'react-router-dom'
import logo from '../Assets/Screenshot 2024-08-25 162105.png'
const Navbar = () => {
  return (
    <div className='navbar'>
        <div className="nav-logo">
        <img src = {logo} alt="" />
        <Link to='/' style={{ textDecoration: 'none' }}  > <p>ElectionMetre</p> </Link>
        </div>
        <div className="nav-login-cart">
        <Link to='/login'><button>Login</button></Link>
        <Link to='/RegistrationPage'><button>Register</button></Link>
    
        </div> 
    </div>
  )
}

export default Navbar
