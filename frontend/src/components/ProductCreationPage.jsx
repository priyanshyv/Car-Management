import React, { useState } from 'react';
import { createCar } from '../services/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductCreationPage = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    title: '',
    description: '',
    tags: '',
    images: '',  // Now a string to accept comma-separated URLs
  });

  // Handle changes for title, description, and tags
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
    const formattedCarData = {
      ...carData,
      tags: carData.tags.split(',').map(tag => tag.trim()), // Convert tags to an array
      images: carData.images.split(',').map(url => url.trim()), // Convert images to an array
    };

    try {
      await createCar(formattedCarData);  // Send the request to create the car
      toast.success('Car added successfully');
      navigate('/');
    } catch (error) {
      toast.error('Failed to create car');
    }
  };

  return (
    <div>
      <h2>Create a New Car</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={carData.title}
          onChange={handleChange}
          placeholder="Car title"
          required
        />
        <textarea
          name="description"
          value={carData.description}
          onChange={handleChange}
          placeholder="Car description"
          required
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
        <button type="submit">Create Car</button>
      </form>
    </div>
  );
};

export default ProductCreationPage;


