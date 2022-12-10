import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../../store/actions/authActions'

function Login() {

  const dispatch = useDispatch();

  const error = useSelector(state => state.auth.error);
  const loading = useSelector(state => state.auth.loading);

  return (
    <div>

      <h1>Login</h1>

      <form onSubmit={(e) => login(dispatch, e)}>

        <label>Email</label>
        <input type="email" name="email" placeholder='email' autoComplete='email' required/>

        <label>Password</label>
        <input type="password" name="password" placeholder='password' autoComplete='current-password' required/>

        {error && <p>{error}</p>}
        <p>{loading ? 'Loading...' : ''}</p>

        <button type="submit">Login</button>

        <p>Not Registered?
          <a href="/signup">Signup</a>
        </p>

      </form>
      
    </div>
  )
}

export default Login