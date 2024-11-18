import React from "react"
import { Marker, Popup } from "react-leaflet"
import L from "leaflet"

const CustomMarker = ({ user, coordinates, selectedUser, onClick }) => {
  // Define a custom icon for the marker
  const icon = new L.Icon({
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png", // Default marker icon URL
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  })

  return (
    <Marker
      position={coordinates}
      icon={user === selectedUser ? icon : undefined} // Highlight selected user with a different icon
      eventHandlers={{
        click: () => onClick(user), // Pass user data when clicking marker
      }}
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
}

export default CustomMarker
