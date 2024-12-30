import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import './AddressForm.css';

const AddressForm = () => {
  const [form, setForm] = useState({
    category: '',
    houseNumber: '',
    roadArea: '',
    location: { lat: 0, lng: 0 },
  });

  const navigate = useNavigate();  // Initialize useNavigate

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5000/api/addresses', form);
      alert('Address saved successfully');
    } catch (err) {
      alert('Failed to save address');
    }
  };

  const handleManageAddress = () => {
    navigate('/manage-addresses');  // Navigate to the manage addresses page
  };

  return (
    <div className="address-form-container">
      <h1>Enter Address Details</h1>
      <input
        type="text"
        placeholder="House/Flat Number"
        onChange={(e) => setForm({ ...form, houseNumber: e.target.value })}
      />
      <input
        type="text"
        placeholder="Road/Area"
        onChange={(e) => setForm({ ...form, roadArea: e.target.value })}
      />
      <select
        onChange={(e) => setForm({ ...form, category: e.target.value })}
      >
        <option value="">Select Category</option>
        <option value="Home">Home</option>
        <option value="Office">Office</option>
        <option value="Friends & Family">Friends & Family</option>
      </select>
      <button onClick={handleSubmit}>Save Address</button>

      {/* Manage Address button */}
      <button onClick={handleManageAddress}>Manage Addresses</button>
    </div>
  );
};

export default AddressForm;
