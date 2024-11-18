import React from "react"

const UserItem = ({ user, onClick }) => {
  return (
    <li>
      <h3>
        {user.firstname} {user.lastname}
      </h3>
      <p>Email: {user.email}</p>
      <p>City: {user.address.city}</p>
      <button onClick={() => onClick(user)}>Show on Map</button>
    </li>
  )
}

export default UserItem
