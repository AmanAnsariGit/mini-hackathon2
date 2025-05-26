import React, { useState } from 'react'
import GreenImg from '../../assets/images/greenry.jfif'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '../../config/Supabase'

const Login = () => {

     const navigate = useNavigate()
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const handleSubmit = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if(error){
          alert(error.message)
          return;
        }

        if(data.user.email == 'admin@gmail.com'){
          const adminID = data.user.id
            navigate('/dashboard')
            localStorage.setItem('adminID', JSON.stringify(adminID))
            return
        }
        navigate('/home')
      };
  return (
    <div className='Login_body'>
    <div className="container">
      <div className="login-box">
          <h2>Login</h2>
          <p>If You Are Already A Member, Easily Log In</p>
          
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-group">
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" id="log-email" />
            </div>
            <div className="input-group">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" id="log-pass" />
                  <span className="eye-icon"><i className="fa-regular fa-eye" id="eye-icon"></i></span>
              </div>
              <input type="submit" className="login-btn"/>
              
              <a href="#" className="forgot-password">Forgot my password?</a>
              
              <p className="register-text">If You Don’t Have An Account, Create <Link className="register-btn" to={'/signup'}>Register</Link></p>
          </form>
      </div>

      <div className="image-box">
          <img src={GreenImg} alt="Gaming Setup" />
      </div>
  </div>
  </div>
  )
}

export default Login