import React from "react";
import { Link } from "react-router-dom";
import "./Newscard.css";

const Newscard = ({ title, description, image, link }) => {
  console.log("Rendering News Card:", title); 

  return (
    <div className="news-card">
      <img
        src={image || "https://via.placeholder.com/400"}
        alt={title}
        className="news-image"
      />
      <div className="news-content">
        <h3 className="news-title">{title}</h3>
        <p className="news-description">
          {description || "No description available."}
        </p>
        <Link to={link} className="news-link">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default Newscard;
