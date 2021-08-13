//import logo from './logo.svg';
import React, {useContext,useState,useEffect} from 'react'
import './App.css';
import {store} from './App'
import {Redirect} from 'react-router'
import axios from 'axios'

function Profile() {
  const [token,setToken] = useContext(store)
  const [data,setData] = useState([])
  useEffect(()=>{
      axios.get('/http://127.0.0.1:5000/profile',{
            headers : {
                'x-token':token
            }
        }).then(res => setData(res.data)).catch((err) => console.log(err))
  },[])
  if(!token){
      return <Redirect to='/login' />
  }
  return (
    <div className="App">
    {
      data &&
      <header className="App-header">
        <h1>Welcome to the profile page: {data.username}</h1> <br />
        <button onClick={() => setToken(null)}>Logout</button>  
      </header>
    }
    </div>
  );
}

export default Profile;
