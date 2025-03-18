import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css"; 

const Home = () => {
    const navigate = useNavigate();

   
    const categories = [
        {
            name: "Political News",
            description: "Stay updated with the latest political events, policies, and government updates.",
            image: "https://images.unsplash.com/photo-1591253665066-51a5fe9b309e?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBvbGl0aWNhbCUyMG5ld3N8ZW58MHx8MHx8fDA%3D", // Updated Political Image
            route: "/category/political",
        },
        {
            name: "Technology News",
            description: "Explore the latest advancements in technology, gadgets, and AI innovations.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHRlY2hub2xvZ3l8ZW58MHx8MHx8fDA%3D", // Updated Technology Image
            route: "/category/technology",
        },
        {
            name: "Entertainment News",
            description: "Get insights into the latest movies, TV shows, celebrity gossip, and music industry trends.",
            image: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=2956&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Updated Entertainment Image
            route: "/category/entertainment",
        },
        {
            name: "Sports News",
            description: "Catch up with the latest sports highlights, match results, and player updates.",
            image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3BvcnRzfGVufDB8fDB8fHww", // Updated Sports Image
            route: "/category/sports",
        },
    ];

    return (
        <div className="home-page">
            <h2>News Categories</h2>
            <div className="news-container">
                {categories.map((category, index) => (
                    <div key={index} className="news-card">
                        <img src={category.image} alt={category.name} className="news-image" />
                        <h3>{category.name}</h3>
                        <p>{category.description}</p>
                        <button className="read-more-btn" onClick={() => navigate(category.route)}>
                            Read More
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
