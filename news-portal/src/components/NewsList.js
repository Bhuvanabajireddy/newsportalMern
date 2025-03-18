
import React, { useEffect, useState } from 'react';
import { fetchNews } from '../api/Newsapi';
import Newscard from './Newscard';

const NewsList = ({ category }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const getNews = async () => {
      const data = await fetchNews(category);
      setNews(data);
    };
    getNews();
  }, [category]);

  return (
    <div className="row g-4">
      {news.map((article) => (
        <Newscard
          key={article.article_id}
          title={article.title}
          description={article.description}
          image={article.image_url}
          link={article.link}
        />
      ))}
    </div>
  );
};

export default NewsList;