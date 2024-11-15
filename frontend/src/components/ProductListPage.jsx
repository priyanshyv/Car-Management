import React, { useEffect, useState } from 'react';
import { getCars, searchCars, deleteCar } from '../services/api';  // Import API functions
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ProductListPage = () => {
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await getCars();  // Fetch cars
      setCars(response.data);
    } catch (error) {
      toast.error('Failed to load cars');
    }
  };

  const handleSearch = async () => {
    try {
      const response = await searchCars(searchQuery);  // Search cars by keyword
      setCars(response.data);
    } catch (error) {
      toast.error('Search failed');
    }
  };
  const handleAdd = ()=>{
    navigate('/cars/create')
  }
  const handleDelete = async (carId) => {
    try {
      await deleteCar(carId);  // Delete car by ID
      fetchCars();  // Refresh the list after deletion
      toast.success('Car deleted successfully');
    } catch (error) {
      toast.error('Failed to delete car');
    }
  };
  
  return (
    <div>
      <h2>Your Cars</h2>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search cars"
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleAdd}>Car add karde</button>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <h3>{car.title}</h3>
            <button onClick={() => navigate(`/cars/${car._id}`)}>View Details</button>
            <button onClick={() => navigate(`/cars/edit/${car._id}`)}>Edit</button>
            <button onClick={() => handleDelete(car._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductListPage;
