import React from 'react'

const Profile = ({userData}) => {
  return (
    <>
     <h1>{userData.username}</h1>
     <div>
        {userData.map((user)=>{
            return (
                <div>
                    <p>Operating System :- {user.OS}</p>
                    <p>Browser :- {user.browser}</p>
                    <p>Device Type :- {user.deviceType}</p>
                    <p>Logged in At :- {(user.updatedAt).split('T')}</p>
                </div>
            )
        })}
     </div>
    </>
  )
}

export default Profile