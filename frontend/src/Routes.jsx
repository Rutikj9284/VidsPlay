import React, { useContext } from 'react'
import LoginAndRegister from './LoginAndRegister'
import { UserContext } from './UserContext'
import Home from './Home';

const Routes = () => {
    const {username, id} = useContext(UserContext);
    // console.log(username);

    if(username){
        return (
            <Home />
        )
    }
  return (
    <LoginAndRegister />
  )
}

export default Routes;