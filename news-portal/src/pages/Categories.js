
import React from 'react';
import { Link } from 'react-router-dom';
import './Categories.css'; 

const Categories = () => {
  const categories = [
    { name: 'Politics', image: 'https://images.pexels.com/photos/1679618/pexels-photo-1679618.jpeg' },
    { name: 'Sports', image: 'https://images.pexels.com/photos/46798/the-ball-stadion-football-the-pitch-46798.jpeg' },
    { name: 'Entertainment', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg' },
    { name: 'Technology', image: 'https://images.pexels.com/photos/270404/pexels-photo-270404.jpeg' },
  ];

  return (
    <div className="categories-page">
      <h2 className="text-center mb-4">Choose a Category</h2>
      <div className="categories-container">
        {categories.map((category) => (
          <Link to={`/category/${category.name.toLowerCase()}`} key={category.name} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <h3 className="category-title">{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;