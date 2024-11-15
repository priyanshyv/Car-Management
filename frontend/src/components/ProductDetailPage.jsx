import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, deleteCar } from '../services/api';
import { toast } from 'react-toastify';

const ProductDetailPage = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    try {
      const response = await getCarById(id);  // Fetch car by ID
      setCar(response.data);
    } catch (error) {
      toast.error('Failed to load car details');
    }
  };

  const handleDelete = async () => {
    try {
      await deleteCar(id);  // Delete the car by ID
      toast.success('Car deleted successfully');
      navigate('/');  // Redirect to the main page
    } catch (error) {
      toast.error('Failed to delete car');
    }
  };

  if (!car) return <p>Loading...</p>;

  return (
    <div>
      <h2>{car.title}</h2>
      <img src={car.images[0]} alt={car.title} />
      <p>{car.description}</p>
      <p>Tags: {car.tags}</p>
      <button onClick={() => navigate(`/cars/edit/${car._id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default ProductDetailPage;

