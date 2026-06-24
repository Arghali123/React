import React, { useContext } from 'react'
import { UserContext } from './UserContext'

function Profile() {
    const user=useContext(UserContext);
  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <h1>Welcome {user.role}</h1>
    </div>
  )
}

export default Profile
