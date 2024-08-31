import React, { useState }from 'react'
import { UserAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom'
import '../styles/Forms.css'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState('');
  const { createUser } = UserAuth();
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors('');
    try {
      await createUser(email, password);
      navigate('/login')
    } catch (e) {
      if (e.message === 'Firebase: Error (auth/email-already-in-use).') {
        setErrors('The email is already registered. Use another email address.')
      } else if (e.message === 'Firebase: Error (auth/invalid-email).') {
        setErrors('Invalid e-mail address. Use another e-mail address.')
      } else if (e.message === 'Firebase: Password should be at least 6 characters (auth/weak-password).') {
        setErrors('Weak password. It should be at least 6 characters.')
      }  else if(e.message === 'Firebase: Error (auth/internal-error).'){
        setErrors('Fill the blanks.')
      }
      console.log(e)
    }
  };

  return (
    <div className='submit-form'>
      <h2 className='register-title'>Create Your Account</h2>
      <form onSubmit={handleSubmit} className='form'>
        <input placeholder='Email' type="email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder='Password' type="password" onChange={(e) => setPassword(e.target.value)} />
        <h4 id='error'>* {errors} *</h4>
        <button className='submit-button'>Sign Up</button>
      </form>
    </div>
  )
}

export default Register