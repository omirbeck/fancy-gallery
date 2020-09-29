import React, { useState, useRef, useEffect} from "react";
import axios from "axios";
import { ACCESS_KEY, API_URL } from "./credentials";
import "./App.css";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [query, setQuery] = useState();
  const [firstPage, setFirstPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);

  const loader = useRef(null);

  const fetchImages = (newPage = 1) => {
    axios
      .get(
        `${API_URL}/photos/?page=${newPage}`,
        {
          headers: { Authorization: `Client-ID ${ACCESS_KEY}`}
        }
      )
      .then((response) => {
        console.log(response.data)
        console.log(response.headers)
        setTotal(Number(response.headers["x-total"]))
        console.log(response.headers["x-total"])
        setImages([...response.data])
        lastPageCount()
      });
  };

  const searchImages = () => {
    axios
      .get(
        `${API_URL}/search/photos/?query=${query}&page=${page}&per_page=10`,
        {
          headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        }
      )
      .then((response) =>  {
        console.log(response.headers)
        setImages([...images, ...response.data.results])
      });
  };

  useEffect(() => {
    fetchImages()
  }, [total])

  const handleClick = (newQuery) => {
    if (newQuery !== query) {
      setImages([]);
      setPages(1);
    }
    setQuery(newQuery);
  };

  const lastPageCount = () => {
    setLastPage(Math.ceil(total / 10))
  }

  const nextPage = () => {
    if (page <= lastPage) {
      setPages(page + 1)
      fetchImages(page)
    }
  }

  // const handleObserver = (entities) => {
  //   const target = entities[0];

  //   if (target.intersectionRatio > 0) {
  //     setPages((page) => page + 1);
  //   }
  // };

  // useEffect(() => {
  //   const options = {
  //     root: null,
  //     rootMargin: "0px",
  //     treshold: 1,
  //   };

  //   const observer = new IntersectionObserver(handleObserver, options);

  //   if (loader.current) {
  //     observer.observe(loader.current);
  //   }
  // }, []);

  // useEffect(() => {
  //   if (query) {
  //     searchImages();
  //   } else {
  //     fetchImages();
  //   }
  // }, [page, query]);
  

  return (
    <div className="container">
      <header className="header">
        <h1>Fancy Gallery</h1>
      </header>
      <div className="form-inline">
        <input className='form-control' type="text" onChange={(event) =>  { 
          setInputValue(event.target.value)
          }} 
        />
        <button className='btn btn-primary ml-3' onClick={() =>  handleClick(inputValue)}>Find</button>
      </div>
      <ul className='pagination'>
        <li className="page-item">
          <span 
            className='page-link' 
            onClick={() => fetchImages(firstPage)}
          >First</span>
        </li>
        <li className="page-item">
          <a href="!#" className='page-link' aria-label="Previous">&laquo;</a>
        </li>
        <li className="page-item">
          <span 
            className='page-link' 
            onClick={nextPage}
            >&raquo;</span>
        </li>
        <li className="page-item">
          <span 
            className='page-link'
            onClick={() => fetchImages(lastPage)}
            >Last</span>
        </li>
      </ul>
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
