import React, { useEffect, useState } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css" // Leaflet CSS

const UserList = () => {
  const [users, setUsers] = useState([]) // State for user data
  const [loading, setLoading] = useState(true) // State for loading status
  const [error, setError] = useState(null) // State for error handling
  const [selectedUser, setSelectedUser] = useState(null) // State for the selected user to highlight

  useEffect(() => {
    // Fetch user data on component mount
    fetch("https://fakestoreapi.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch data")
        }
        return res.json()
      })
      .then((data) => {
        setUsers(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  // Function to get coordinates based on the city (mocked data for now)
  const getUserCoordinates = (city) => {
    const coordinates = {
      "New York": [40.7128, -74.006],
      "Los Angeles": [34.0522, -118.2437],
      London: [51.5074, -0.1278],
      Berlin: [52.52, 13.405],
    }

    return coordinates[city] || [51.505, -0.09] // Default to London if city is not in the mock list
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <h3>
              {user.firstname} {user.lastname}
            </h3>
            <p>Email: {user.email}</p>
            <p>City: {user.address.city}</p>
            <button onClick={() => setSelectedUser(user)}>Show on Map</button>
          </li>
        ))}
      </ul>

      {/* Leaflet Map */}
      <MapContainer
        center={[51.505, -0.09]} // Default center, should be updated dynamically if needed
        zoom={2}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {users.map((user) => {
          const coords = getUserCoordinates(user.address.city)

          return (
            <Marker
              key={user.id}
              position={coords}
              icon={
                user === selectedUser
                  ? new L.Icon({
                      iconUrl:
                        "https://upload.wikimedia.org/wikipedia/commons/1/1f/Map_marker_icon_%28yellow%29.svg", // Highlighted marker icon
                      iconSize: [32, 32],
                    })
                  : undefined
              }
            >
              <Popup>
                <h3>
                  {user.firstname} {user.lastname}
                </h3>
                <p>Email: {user.email}</p>
                <p>City: {user.address.city}</p>
              </Popup>
            </Marker>
          )
        })}
        {/* Highlight the selected user on the map */}
        {selectedUser && (
          <Marker
            position={getUserCoordinates(selectedUser.address.city)}
            icon={
              new L.Icon({
                iconUrl:
                  "https://upload.wikimedia.org/wikipedia/commons/1/1f/Map_marker_icon_%28yellow%29.svg", // Highlighted marker icon
                iconSize: [32, 32],
              })
            }
          >
            <Popup>
              <h3>
                {selectedUser.firstname} {selectedUser.lastname}
              </h3>
              <p>Email: {selectedUser.email}</p>
              <p>City: {selectedUser.address.city}</p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  )
}

export default UserList
