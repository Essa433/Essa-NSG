import React from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Map Component
const Map = ({ users, selectedUser }) => {
  const getUserCoordinates = (city) => {
    const coordinates = {
      "New York": [40.7128, -74.006],
      "Los Angeles": [34.0522, -118.2437],
      London: [51.5074, -0.1278],
      Berlin: [52.52, 13.405],
    }
    return coordinates[city] || [51.505, -0.09] // Default coordinates if city is not found
  }

  return (
    <MapContainer
      center={[51.505, -0.09]}
      zoom={2}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      {users.map((user) => {
        const coords = getUserCoordinates(user.address.city) // Get coordinates for the user's city

        const icon = new L.Icon({
          iconUrl:
            "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        })

        return (
          <Marker
            key={user.id}
            position={coords}
            icon={user === selectedUser ? icon : undefined}
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
    </MapContainer>
  )
}

export default Map
