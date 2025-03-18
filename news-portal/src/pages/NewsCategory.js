// src/pages/NewsCategory.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Newscard from '../components/Newscard';
import './NewsCategory.css'; 

const NewsCategory = () => {
  const { category } = useParams();
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = 'pub_710536f4f69fea0d116da19c9f0363bf2b948'; 
        const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=${category}&country=in&language=en`;

        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch news');
        }

        const data = await response.json();
        setNews(data.results || []); 
      } catch (error) {
        setError('Error fetching news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, [category]);

  if (isLoading) {
    return <p className="text-center">Loading news...</p>;
  }

  if (error) {
    return <p className="text-center text-danger">{error}</p>;
  }

  if (news.length === 0) {
    return <p className="text-center">No articles available for this category.</p>;
  }

  return (
    <div className="news-category-page">
      <h2 className="text-center mb-4">Latest {category} News</h2>
      <div className="news-container">
        {news.map((article) => (
          <Newscard
            key={article.article_id}
            title={article.title}
            description={article.description || 'No description available.'}
            image={article.image_url || 'https://via.placeholder.com/400'}
            link={article.link}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsCategory;