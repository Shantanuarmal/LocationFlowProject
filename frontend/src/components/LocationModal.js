import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, StandaloneSearchBox } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";

import './LocationModal.css';

const LocationModal = ({ isOpen }) => {
  const [locationPermission, setLocationPermission] = useState(null);
  const [address, setAddress] = useState("");
  const [manualSearch, setManualSearch] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => setLocationPermission("granted"),
        () => setLocationPermission("denied")
      );
    }
  }, []);

  const enableLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setAddress(`Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const searchManually = (newAddress) => {
    setAddress(newAddress);
  };

  const handleClose = () => {
    navigate("/LocationSelection"); // Navigate to /LocationSelection on close
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Location Permission</h2>
        <p>
          {locationPermission === "granted"
            ? "Location permission granted"
            : "Location permission denied"}
        </p>

        <button onClick={enableLocation}>Enable Location</button>
        <button onClick={() => setManualSearch(true)}>Search Manually</button>

        {manualSearch && <ManualSearch onSearch={searchManually} />}

        <button onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

const ManualSearch = ({ onSearch }) => {
  const [searchBox, setSearchBox] = useState(null);

  const handlePlacesChanged = () => {
    const places = searchBox.getPlaces();
    if (places.length > 0) {
      const place = places[0];
      onSearch(place.formatted_address);
    }
  };

  return (
    <div className="search-container">
      <LoadScript googleMapsApiKey={AIzaSyADMDreOoidHSbnP7grvNILrvf3WKeMdjw}> {/* Use environment variable */}
        <GoogleMap
          id="manual-search-map"
          mapContainerStyle={{
            width: "100%",
            height: "400px",
          }}
          zoom={10}
        >
          <StandaloneSearchBox
            onLoad={(ref) => setSearchBox(ref)}
            onPlacesChanged={handlePlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for an address"
              style={{
                boxSizing: `border-box`,
                border: `1px solid transparent`,
                width: `240px`,
                height: `32px`,
                padding: `0 12px`,
                borderRadius: `3px`,
                fontSize: `15px`,
                outline: `none`,
                textOverflow: `ellipses`,
              }}
            />
          </StandaloneSearchBox>
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default LocationModal;
