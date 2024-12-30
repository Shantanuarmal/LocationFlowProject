import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AddressManagement.css';

const AddressManagement = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/addresses');
        setAddresses(res.data);
      } catch (error) {
        alert('Failed to fetch addresses');
      }
    };
    fetchAddresses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/addresses/${id}`);
      setAddresses(addresses.filter((address) => address._id !== id));
    } catch (err) {
      alert('Failed to delete address');
    }
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    alert(`Selected Address: ${address.houseNumber}, ${address.roadArea}`);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredAddresses = addresses.filter(
    (address) =>
      address.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${address.houseNumber}, ${address.roadArea}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  return (
    <div className="address-management-container">
      <h1>Manage Addresses</h1>

      {/* Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for an address or category..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <ul className="address-list">
        {filteredAddresses.map((address) => (
          <li key={address._id} className="address-item">
            <div className="address-info">
              <p className="address-category">{address.category}</p>
              <p className="address-details">
                {address.houseNumber}, {address.roadArea}
              </p>
            </div>
            <div className="address-actions">
              <button
                className="select-button"
                onClick={() => handleSelectAddress(address)}
              >
                Select
              </button>
              <button
                className="delete-button"
                onClick={() => handleDelete(address._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {selectedAddress && (
        <div className="selected-address">
          <h2>Selected Address for Delivery:</h2>
          <p>{`${selectedAddress.houseNumber}, ${selectedAddress.roadArea}`}</p>
        </div>
      )}
    </div>
  );
};

export default AddressManagement;
