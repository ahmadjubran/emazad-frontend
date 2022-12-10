import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { signUp } from '../../store/actions/authActions'

function Signup() {

  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={(e) => signUp(dispatch, e)}>

        <label>Email</label>
        <input type="email" name="email" placeholder='email' autoComplete='email' required/>

        <label>Username</label>
        <input type="text" name="userName" placeholder='username' autoComplete='username'required/>

        <label>Full Name</label>
        <input type="text" name="fullName" placeholder='full name' autoComplete='name' required/>

        <label>Phone Number</label>
        <input type="text" name="phoneNumber" placeholder='phone number' autoComplete='tel' required/>

        <label>Password</label>
        <input type="password" name="password" placeholder='password' autoComplete='new-password' required/>

        <label>Confirm Password</label>
        <input type="password" name="confirmPassword" placeholder='confirm password' autoComplete='new-password' required/>

        <label>Gender</label>
        <select name='gender'>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>

        <label>Birth Date</label>
        <input type="date" name="birthDate" placeholder='birth date' autoComplete='bday' required/>

        <label>Image</label>
        <input type="file" name="image" placeholder='image' autoComplete='image'/>

        {error && <p>{error}</p>}

        <p>{loading ? 'Loading...' : ''}</p>

        <button type="submit">Signup</button>
        
        <p>Already Registered? 
          <a href="/login">Login</a>
        </p>
        
        </form>

    </div>
  )
}

export default Signup