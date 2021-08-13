import React, { useState } from 'react';
import axios from 'axios'
import './App.css';

function Register() {

  const [data, setData] = useState({
    username:'',
    email:'',
    password:'',
    confirmpassword:''
  })

  const { username,email,password,confirmpassword } = data
  const onChange = e => {
    setData({...data,[e.target.name]:e.target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    axios.post('http://127.0.0.1:5000/register',data).then(
      res => alert(res.data)
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit}>
          <h3>Register</h3>
          <input type="text" name="username" value={username} onChange={onChange} placeholder="username" />
          <br />
          <input type="text" name="email" value={email} onChange={onChange} placeholder="email" />
          <br />
          <input type="password" name="password" value={password} onChange={onChange} placeholder="password" />
          <br />
          <input type="password" name="confirmpassword" value={confirmpassword} onChange={onChange} placeholder="confirmpassword" />
          <br />
          <button type="submit">Register</button>
        </form>
        
      </header>
    </div>
  );
}
export default Register;
