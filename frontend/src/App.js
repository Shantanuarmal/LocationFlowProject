import {React,useState} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LocationSelection from './components/LocationSelection';
import AddressForm from './components/AddressForm';
import AddressManagement from './components/AddressManagement';
import LocationModal from './components/LocationModal';


function App() {
  const [isModalOpen, setModalOpen] = useState(true);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LocationModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />} />
        <Route path="/LocationSelection" element={<LocationSelection />} />
        <Route path="/address-form" element={<AddressForm />} />
        <Route path="/manage-addresses" element={<AddressManagement />} />
      </Routes>
    </Router>
  );
}

export default App;