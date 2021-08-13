import React, { useState, useContext } from 'react';
import axios from 'axios'
import './App.css';
import {store} from './App'
import {Redirect} from 'react-router'

function Login() {

  const [token,setToken] = useContext(store) 

  const [data, setData] = useState({
    username:'',
    password:''
  })


  const onChange = e => {
    setData({...data,[e.target.name]:e.target.value})
  }
  const onSubmit = e => {
    e.preventDefault()
    axios.post('http://127.0.0.1:5000/login',data).then(
        res => setToken(res.data.token)    
    )
  }
  if(token){
       return <Redirect to='/profile' />
  }
  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={onSubmit}>
          <h3>Login</h3>
          <input type="text" name="username" onChange={onChange} placeholder="username" />
          <br />
          <input type="password" name="password" onChange={onChange} placeholder="password" />
          <br />
          
          <button type="submit">Login</button>
        </form>
        
      </header>
    </div>
  );
}

export default Login;