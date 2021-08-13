import React, { useState, createContext} from 'react'
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Nav from './nav'
import Register from './register'
import Login from './login'
import Profile from './profile'

export const store = createContext()

function App() {
  
  const [token,setToken] = useState(null)

  return (
    <div className="App">
      <header className="App-header">
        <store.Provider value={[token,setToken]}>
        <BrowserRouter>
          <Nav />
          <Switch>
            <Route path='/register' component={Register} />
            <Route path='/login' component={Login} />
            <Route path='/profile' component={Profile} />
          </Switch>
        </BrowserRouter>
        </store.Provider>     
      </header>
    </div>
  );
}

export default App;
