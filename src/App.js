import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ACCESS_KEY, API_URL } from "./credentials";
import "./App.css";
import Pagination from "./components/Pagination";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [query, setQuery] = useState();
  const [firstPage, setFirstPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isQuery, setIsQuery] = useState(false);

  const loader = useRef(null);

  const fetchImages = (newPage = 1) => {
    axios
      .get(
        `${API_URL}/photos/?page=${newPage}`,
        {
          headers: { Authorization: `Client-ID ${ACCESS_KEY}` }
        }
      )
      .then((response) => {
        setTotal(Number(response.headers["x-total"]))
        setImages(response.data)
        setIsQuery(false)
      });
  };

  const searchImages = (newPage = 1) => {
    axios
      .get(
        `${API_URL}/search/photos/?query=${query}&page=${newPage}&per_page=10`,
        {
          headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
        }
      )
      .then((response) => {
        setLastPage(response.data.total_pages)
        setTotal(response.data.total)
        setImages(response.data.results)
        setIsQuery(true)
      });
  };

  useEffect(() => {
    if (!isQuery) {
      getLastPage()
    }
  }, [total])

  useEffect(() => {
    if (query) {
      searchImages(page);
    } else {
      fetchImages(page);
    }
  }, [page, query]);

  const handleClick = (newQuery) => {
    if (newQuery !== query) {
      setPages(1);
    }
    setQuery(newQuery);
  };

  const getLastPage = () => {
    setLastPage(Math.ceil(total / 10))
  }

  const nextPage = () => {
    console.log(lastPage, total)
    if (page < lastPage) {
      setPages(page + 1)
    }
  }

  const previewPage = () => {
    if (page > firstPage) {
      setPages(page - 1)
    }
  }

  const firstPageHandle = () => {
    setPages(firstPage)
  }

  const lastPageHandle = () => {
    setPages(lastPage)
  }

  return (
    <div className="container">
      <header className="header">
        <h1>Fancy Gallery</h1>
        <div className="form-inline mb-3 mt-3">
          <input
            className='form-control'
            type="text"
            onChange={(event) => {
              setInputValue(event.target.value)
            }}
          />
          <button
            className='btn btn-primary ml-3'
            onClick={() => handleClick(inputValue)}
          >
            Find
        </button>
        </div>
        <ul className='pagination'>
          <Pagination handlePage={firstPageHandle} title='First' />
          <Pagination handlePage={previewPage} title='&laquo;' />
          {<Pagination title={page} />}
          <Pagination handlePage={nextPage} title='&raquo;' />
          {isQuery && <Pagination handlePage={lastPageHandle} title='Last' />}
        </ul>
      </header>

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
      { isQuery && (
        <div className="footer">
          <p>Количество результатов: {total}</p>
          <p>Количество страниц: {lastPage}</p>
          <p>Номер страницы: {page}</p>
        </div>
      )
      }

    </div>
  );
}

export default App;
