import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ACCESS_KEY, API_URL } from "./credentials";
import "./App.css";

function App() {
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [query, setQuery] = useState();
  const loader = useRef(null);

  const fetchImages = () => {
    axios
      .get(
        `${API_URL}/photos/?page=${page}&per_page=20&client_id=${ACCESS_KEY}`
      )
      .then((response) => setImages([...images, ...response.data]));
  };

  const searchImages = () => {
    axios
      .get(
        `${API_URL}/search/photos/?query=${query}&page=${page}&per_page=20`,
        {
          headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        }
      )
      .then((response) => setImages([...images, ...response.data.results]));
  };

  const handleClick = (newQuery) => {
    if (newQuery !== query) {
      setImages([]);
      setPages(1);
    }
    setQuery(newQuery);
  };

  const handleObserver = (entities) => {
    const target = entities[0];

    if (target.intersectionRatio > 0) {
      setPages((page) => page + 1);
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      treshold: 1,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }
  }, []);

  useEffect(() => {
    if (query) {
      searchImages();
    } else {
      fetchImages();
    }
  }, [page, query]);

  return (
    <div className="container">
      <header className="header">
        <h1>Fancy Gallery</h1>
      </header>
      <div className="tags">
        <button onClick={() => handleClick("cats")}>Cats</button>
        <button onClick={() => handleClick("dogs")}>Dogs</button>
        <button onClick={() => handleClick("coffee")}>Coffee</button>
        <button onClick={() => handleClick("react")}>React</button>
        <button onClick={() => handleClick()}>Random</button>
      </div>
      <div className="image-grid">
        {images.map((image) => {
          const { id, color, urls, alt_description } = image;
          return (
            <div
              className="image-item"
              key={id}
              style={{ backgroundColor: color }}
            >
              <img src={urls.small} alt={alt_description} />
            </div>
          );
        })}
      </div>
      <div ref={loader}>Loading...</div>
    </div>
  );
}

export default App;