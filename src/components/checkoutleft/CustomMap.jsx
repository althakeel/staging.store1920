import React, { useRef, useState } from "react";
import {
  GoogleMap,
  Marker,
  StandaloneSearchBox,
  useJsApiLoader,
} from "@react-google-maps/api";
import Pin from '../../assets/images/common/pin.png'; // your custom pin image

const libraries = ["places"];
const defaultCenter = { lat: 24.4539, lng: 54.3773 }; // Abu Dhabi center

const CustomMap = ({ onPlaceSelected, initialPosition }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAO5eU8fxUEYC_tK4HR7b3cNQ1o20uddv0",
    libraries,
  });

  const mapRef = useRef(null);
  const searchBoxRef = useRef(null);

  const [markerPosition, setMarkerPosition] = useState(initialPosition || null);
  const [manualAddress, setManualAddress] = useState("");
  const [detectedAddress, setDetectedAddress] = useState(null);
  const [showConfirmButton, setShowConfirmButton] = useState(false);

  // Extract address components
// Extract address components safely
const extractAddress = (place) => {
  let street = "", city = "", state = "", country = "";

  if (!place || !place.address_components) return { street, city, state, country };

  place.address_components.forEach((c) => {
    const types = c.types;
    if (types.includes("street_number")) street = c.long_name + " ";
    if (types.includes("route")) street += c.long_name;
    if (types.includes("locality")) city = c.long_name;
    if (types.includes("administrative_area_level_1")) state = c.short_name;
    if (types.includes("country")) country = c.long_name;
  });

  return { street, city, state, country };
};


  // SearchBox selection
  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (!places || !places.length) return;
    const place = places[0];
    if (!place.geometry?.location) return;

    const pos = { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
    setMarkerPosition(pos);
    mapRef.current?.panTo(pos);

    const address = extractAddress(place);
    setDetectedAddress({ ...address, lat: pos.lat, lng: pos.lng });
    setShowConfirmButton(true);
  };

  // Detect user location
// Detect user location
// Detect user location
const detectLocation = () => {
  if (!navigator.geolocation) return alert("Geolocation not supported");

  navigator.geolocation.getCurrentPosition((position) => {
    const pos = { lat: position.coords.latitude, lng: position.coords.longitude };
    setMarkerPosition(pos);
    mapRef.current?.panTo(pos);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: pos }, (results, status) => {
      let address = { lat: pos.lat, lng: pos.lng };
      if (status === "OK" && results[0]) {
        address = { ...extractAddress(results[0]), lat: pos.lat, lng: pos.lng };
      }

      setDetectedAddress(address);
      setShowConfirmButton(false); // 🚫 hide confirm button
      onPlaceSelected?.(address);  // ✅ auto-pass to parent
    });
  });
};



const handleConfirmAddress = () => {
  if (detectedAddress) {
    onPlaceSelected?.(detectedAddress);
    setShowConfirmButton(false); // hide the button after click
  }
};


  const handleManualSubmit = () => {
    onPlaceSelected?.({
      street: manualAddress,
      city: "",
      state: "",
      country: "",
      lat: markerPosition?.lat || null,
      lng: markerPosition?.lng || null,
    });
    setManualAddress("");
  };

  if (!isLoaded) return <div style={{ textAlign: "center", padding: "20px" }}>Loading map...</div>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Search Box */}
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          placeholder="Search your address..."
          style={{
            width: "100%",
            padding: "8px 12px", // smaller font / smaller input
            fontSize: "0.9rem",
            borderRadius: "12px",
            border: "1px solid #ddd",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
            outline: "none",
          }}
        />
      </StandaloneSearchBox>

      {/* Map */}
      <GoogleMap
        mapContainerStyle={{
          width: "100%",
          height: "250px", // slightly smaller
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        }}
        center={markerPosition || defaultCenter}
        zoom={markerPosition ? 16 : 11}
        onLoad={(map) => (mapRef.current = map)}
      >
        {markerPosition && (
          <Marker
            position={markerPosition}
            icon={{
              url: Pin,
              scaledSize: new window.google.maps.Size(35, 35),
              anchor: new window.google.maps.Point(17, 35),
            }}
            draggable
            onDragEnd={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setMarkerPosition({ lat, lng });

              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode({ location: { lat, lng } }, (results, status) => {
                if (status === "OK" && results[0]) {
                  const address = extractAddress(results[0]);
                  setDetectedAddress({ ...address, lat, lng });
                } else {
                  setDetectedAddress({ lat, lng });
                }
                setShowConfirmButton(true);
              });
            }}
          />
        )}
      </GoogleMap>

      {/* Buttons (responsive) */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "8px",
        }}
      >
        <button
          onClick={detectLocation}
          style={{
            flex: "1 1 0",
            minWidth: "120px",
            padding: "10px 14px",
            backgroundColor: "#ff5100",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Detect My Location
        </button>

      {showConfirmButton && (
  <button
    id="confirm-address-btn"
    onClick={handleConfirmAddress}
    style={{
      flex: "1 1 0",
      minWidth: "120px",
      padding: "10px 14px",
      backgroundColor: "#28a745",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontWeight: 500,
      cursor: "pointer",
      animation: "pulse 1s infinite",
    }}
  >
    Use Detected Address
  </button>
)}
{showConfirmButton && (
  <div style={{ color: "#28a745", fontWeight: 500, marginTop: "8px" }}>
    Location detected! Click "Use Detected Address" to select it.
  </div>
)}


        <button
          onClick={handleManualSubmit}
          style={{
            flex: "1 1 0",
            minWidth: "120px",
            padding: "10px 14px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Use Manual Address
        </button>
      </div>

      {/* Display detected address */}
      {detectedAddress && (
        <div
          style={{
            marginTop: "12px",
            padding: "10px 12px",
            background: "#f9f9f9",
            borderRadius: "8px",
            fontSize: "0.9rem",
            color: "#333",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <strong>Detected Address:</strong>{" "}
          {detectedAddress.street
            ? `${detectedAddress.street}, ${detectedAddress.city}, ${detectedAddress.state}, ${detectedAddress.country}`
            : "Location detected"}
        </div>
      )}
    </div>
  );
};

export default CustomMap;
