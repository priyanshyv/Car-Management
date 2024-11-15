import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCarById, updateCar } from '../services/api';
import { toast } from 'react-toastify';

const ProductEditPage = () => {
  const { id } = useParams();
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: '',  
    images: '', 
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchCar();
  }, []);

  const fetchCar = async () => {
    try {
      const response = await getCarById(id);  // Get car by ID
      const fetchedCar = response.data;

      // Ensure tags and images are strings if they are arrays
      setCarData({
        title: fetchedCar.title || '',
        description: fetchedCar.description || '',
        tags: Array.isArray(fetchedCar.tags) ? fetchedCar.tags.join(', ') : fetchedCar.tags || '',
        images: Array.isArray(fetchedCar.images) ? fetchedCar.images.join(', ') : fetchedCar.images || '',
      });
    } catch (error) {
      toast.error('Failed to load car data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({
      ...carData,
      [name]: value,
    });
  };

  // Handle image URL input (comma-separated)
  const handleImageChange = (e) => {
    setCarData({
      ...carData,
      images: e.target.value, // Keep images as a comma-separated string
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Make sure tags and images are properly formatted
    const formattedCarData = {
      ...carData,
      tags: carData.tags.split(',').map(tag => tag.trim()), // Convert tags to an array
      images: carData.images.split(',').map(url => url.trim()), // Convert images to an array
    };

    try {
      await updateCar(id, formattedCarData);  // Update the car
      toast.success('Car updated successfully');
      navigate(`/cars/${id}`);
    } catch (error) {
      toast.error('Failed to update car');
    }
  };

  return (
    <div>
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={carData.title}
          onChange={handleChange}
          placeholder="Car title"
        />
        <textarea
          name="description"
          value={carData.description}
          onChange={handleChange}
          placeholder="Car description"
        />
        <input
          type="text"
          name="tags"
          value={carData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
        />
        <input
          type="text"
          name="images"
          value={carData.images}
          onChange={handleImageChange}
          placeholder="Image URLs (comma-separated)"
        />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
};

export default ProductEditPage;


