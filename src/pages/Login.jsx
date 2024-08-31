import React from 'react'
import { UserAuth } from '../components/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../styles/Forms.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState('');

  const navigate = useNavigate();
  const { signin } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');

    try {
      await signin(email, password)
      alert('Logged In')
      navigate('/account')
    } catch (e) {
      if(e.message === 'Firebase: Error (auth/wrong-password).') {
        setErrors('Wrong Password. Try again.');
      } else if(e.message === 'Firebase: Error (auth/user-not-found).'){
        setErrors('User Not Found. Sign Up First.');
      } else if(e.message === 'Firebase: Error (auth/invalid-email).'){
        setErrors('Email is invalid.');
      }  else if(e.message === 'Firebase: Error (auth/internal-error).'){
        setErrors('Fill the blanks.');
      }
      document.getElementById('error').style.visibility='visible';
      console.log(e.message);
    }
  }

  return (
    <div className='submit-form'>
      <h2 className='login-title'>Sign In</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input placeholder='Email' type="email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} />
        <p id='error'>* {errors} *</p>
        <button className='submit-button'>Sign In</button>
      </form>
    </div>
  )
}

export default Login