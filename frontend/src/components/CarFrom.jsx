import React, { useState, useEffect } from 'react';
import { createCar, updateCar, getCarById } from '../../services/api';
import { useParams, useNavigate } from 'react-router-dom';

const CarForm = () => {
  const { id } = useParams();  // If editing, we'll get the car ID from the URL
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    images: []
  });
  const [error, setError] = useState(null);  // For error handling
  const [isLoading, setIsLoading] = useState(false);  // To show loading state if necessary

  // Fetch car data for editing
  useEffect(() => {
    if (id) {
      const fetchCarDetails = async () => {
        try {
          const response = await getCarById(id);
          setFormData({
            title: response.data.title,
            description: response.data.description,
            tags: response.data.tags || [],  // Ensure tags is an array
            images: response.data.images || []  // Ensure images is an array
          });
        } catch (error) {
          console.error('Error fetching car details:', error);
          setError('Failed to fetch car details. Please try again later.');
        }
      };
      fetchCarDetails();
    }
  }, [id]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'tags' || name === 'images') {
      setFormData({ ...formData, [name]: value.split(',').map(item => item.trim()) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Set loading to true while submitting

    try {
      if (id) {
        await updateCar(id, formData);
      } else {
        await createCar(formData);
      }
      navigate('/cars');
    } catch (error) {
      console.error('Error submitting car:', error);
      setError('Failed to submit car. Please check your input and try again.');
    } finally {
      setIsLoading(false); // Reset loading state after submission
    }
  };

  return (
    <div>
      <h2>{id ? 'Edit Car' : 'Create Car'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Car Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Car Description"
          required
        />
        <input
          type="text"
          name="tags"
          value={formData.tags.join(', ')}  // Display tags as a comma-separated string
          onChange={handleChange}
          placeholder="Car Tags (comma separated)"
        />
        <input
          type="text"
          name="images"
          value={formData.images.join(', ')}  // Display image URLs as a comma-separated string
          onChange={handleChange}
          placeholder="Image URLs (comma separated)"
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Submitting...' : id ? 'Update Car' : 'Create Car'}
        </button>
      </form>
    </div>
  );
};

export default CarForm;

