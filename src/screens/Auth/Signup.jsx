import React, { useState } from "react";
import GreenImg from "../../assets/images/greenry.jfif";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../config/Supabase";
const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if(error){
      alert(error.message)
      return;
    }
    navigate('/')
  };
  return (
    <div className="Login_body">
      <div className="container">
        <div className="login-box">
          <h2>SignUp</h2>
          <p>If You Are not A Member, Easily Sign up</p>

          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-group">
              <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="Email" id="log-email" />
            </div>
            <div className="input-group">
              <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="Password" id="log-pass" />
              <span className="eye-icon">
                <i className="fa-regular fa-eye" id="eye-icon"></i>
              </span>
            </div>
            <input type="submit" className="login-btn"/>

            <p className="register-text">
              If You Don’t Have An Account, Create{" "}
              <Link className="register-btn" to={"/"}>
                Login
              </Link>
            </p>
          </form>
        </div>

        <div className="image-box">
          <img src={GreenImg} alt="Gaming Setup" />
        </div>
      </div>
    </div>
  );
};

export default Signup;
