import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({})

export function UserContextProvider({children}){
    const [username, setUsername] = useState(null);
    const [id, setid] = useState(null);
    const [data, setData] = useState(null);
    useEffect(()=>{
        axios.get("/profile").then(res=>{
            // console.log(res.data); //the data that we're sending when jwt token has been verified
            setUsername(res.data.username);
            setid(res.data.userId);
        })
    }, []);
    return (
        <UserContext.Provider value={{username, id, setUsername, setid, setData, data}}>
            {children}
        </UserContext.Provider>
    );
}