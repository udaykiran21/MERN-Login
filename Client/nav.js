import React, {useContext} from 'react';
import {Link} from 'react-router-dom'
import {store} from './App'

const Nav = () => {
    const [token,setToken] = useContext(store)
    return(
        <div>
        {
            !token &&
                <ul>
                    <Link to='/register'><p>register</p></Link>
                    <Link to='/login'><p>login</p></Link>
                </ul>
            
        }          
        </div>
    )
}


export default Nav
