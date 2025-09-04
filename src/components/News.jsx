import { useState } from "react";
import "./News.css";
import { useHttp } from "../hooks/useHttp";

import { useModal } from "../hooks/useModal";

const categories = [
  "general",
  "world",
  "nation",
  "business",
  "technology",
  "entertainment",
  "sports",
  "science",
  "health",
];

const requestConfig = {};



export default function News() {
  const { openModal } = useModal();
  const [selectedCategory, setSelectedCategory] = useState("general");
  const {
    data: newsHeadlines,
    isLoading,
    error,
  } = useHttp("top-headlines", selectedCategory, 10, requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching News Items ....</p>;
  }
  if (error) {
    //return <Error title="Failed to fetch meals" message={error}></Error>
  }

  function handleCategoryClick(category) {   
    setSelectedCategory(category);
  }


  
  return (
    <div className="news-app">
      <div className="news-header">
        <h1 className="logo">News App</h1>
      </div>
      <div className="news-content">
        <nav className="navbar">
          <h1 className="nav-heading">Categories</h1>
          <div className="categories">
            {categories.map((category, index) => (
              <a
                key={index}
                className="nav-link"
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </a>
            ))}
          </div>
        </nav>
        <div className="news-section">
           {newsHeadlines.articles && newsHeadlines.articles.length > 0 && (             
              <div className="headline" key={0}>
                <img src={newsHeadlines.articles[0].image} alt={newsHeadlines.articles[0].title} />
                <h2 className="headline-title">{newsHeadlines.articles[0].title}</h2>
              </div>
            )}
          <div className="news-grid">
            {newsHeadlines.articles &&
              newsHeadlines.articles.slice(1).map((article, index) => (
                <div className="news-grid-item" key={index + 1} onClick={() => openModal(article)}>
                  <img src={article.image} alt={article.title} />
                  <h3>{article.title}</h3>
                </div>
              ))}
          </div>
        </div>       
      </div>
      <footer>
        <p className="copyright">
          <span>News App</span>
        </p>
        <p>&copy; All Rights Reserved. By Code And Create</p>
      </footer>
    </div>
  );
}
