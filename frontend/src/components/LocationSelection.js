// import React, { useState } from 'react';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate from react-router-dom
// import './LocationSelection.css';

// const LocationSelection = () => {
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: 'AIzaSyADMDreOoidHSbnP7grvNILrvf3WKeMdjw',
//   });

//   const [location, setLocation] = useState({ lat: 0, lng: 0 });
//   const navigate = useNavigate();  // Initialize useNavigate

//   const handleLocateMe = () => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         setLocation({
//           lat: position.coords.latitude,
//           lng: position.coords.longitude,
//         });
//       },
//       () => alert('Failed to get location')
//     );
//   };

//   const handleAddressForm = () => {
//     navigate('/address-form');  // Navigate to /address-form
//   };

//   const handleAddressManagement = () => {
//     navigate('/manage-addresses');  // Navigate to /manage-addresses
//   };

//   if (!isLoaded) return <div>Loading...</div>;

//   return (
//     <div className="google-map">
//       <h1>Select Your Location</h1>
//       <GoogleMap
//         center={location}
//         zoom={15}
//         mapContainerStyle={{ width: '100%', height: '400px' }}
//         onClick={(e) =>
//           setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
//         }
//       >
//         <Marker position={location} />
//       </GoogleMap>
//       <button onClick={handleLocateMe}>Locate Me</button>
//       <div className="navigation-buttons">
//         <button onClick={handleAddressForm}>Address Form</button>
//         <button onClick={handleAddressManagement}>Manage Addresses</button>
//       </div>
//     </div>
//   );
// };

// export default LocationSelection;



import React, { useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useNavigate } from 'react-router-dom';
import './LocationSelection.css';

const LocationSelection = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyADMDreOoidHSbnP7grvNILrvf3WKeMdjw',
  });

  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [loadingLocation, setLoadingLocation] = useState(false); // Loading state for "Locate Me" button
  const navigate = useNavigate();

  const handleLocateMe = () => {
    setLoadingLocation(true); // Set loading state to true
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLoadingLocation(false); // Reset loading state
      },
      () => {
        alert('Failed to get location. Please enable location services.');
        setLoadingLocation(false); // Reset loading state
      }
    );
  };

  const handleAddressForm = () => {
    navigate('/address-form');
  };

  const handleAddressManagement = () => {
    navigate('/manage-addresses');
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div className="google-map">
      <h1>Select Your Location</h1>
      <GoogleMap
        center={location}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '400px' }}
        onClick={(e) =>
          setLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })
        }
      >
        <Marker position={location} />
      </GoogleMap>
      <button onClick={handleLocateMe} disabled={loadingLocation}>
        {loadingLocation ? 'Locating...' : 'Locate Me'}
      </button>
      <div className="navigation-buttons">
        <button onClick={handleAddressForm}>Address Form</button>
        <button onClick={handleAddressManagement}>Manage Addresses</button>
      </div>
    </div>
  );
};

export default LocationSelection;
