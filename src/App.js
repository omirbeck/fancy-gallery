import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { ACCESS_KEY, API_URL, DEFAULT_INITIAL_PAGE } from "./credentials";
import "./App.css";
import Pagination from "./components/Pagination";

function App() {
  const [inputValue, setInputValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPages] = useState(1);
  const [query, setQuery] = useState();
  const [lastPage, setLastPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isQuery, setIsQuery] = useState(false);
  const [disableFirst, setDisableFirst] = useState(true);
  const [disableLast, setDisableLast] = useState(false);

  const fetchImages = () => {
    axios
      .get(
        `${API_URL}/photos/?page=${page}`,
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

  const searchImages = () => {
    axios
      .get(
        `${API_URL}/search/photos/?query=${query}&page=${page}&per_page=10`,
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
      searchImages();
    } else {
      fetchImages(page);
    }
    disabledPagination()
  }, [page, query]);

  const handleClick = () => {
    if (inputValue !== query) {
      setPages(1);
    }
    setQuery(inputValue);
  };

  const enterInput = (e) => {
    if (e.key === 'Enter') {
      handleClick(inputValue)
    }
  };

  const getLastPage = () => {
    setLastPage(Math.ceil(total / 10))
  }

  const nextPage = () => {
    if (page < lastPage) {
      setPages(page + 1)
    }
  }

  const previousPage = () => {
    if (page > DEFAULT_INITIAL_PAGE) {
      setPages(page - 1)
    }
  }

  const lastPageHandle = () => {
    setPages(lastPage)
  }

  const disabledPagination = () => {
    if (page === DEFAULT_INITIAL_PAGE) {
      setDisableLast(false)
      setDisableFirst(true)
    } else if (page === lastPage) {
      setDisableLast(true)
      setDisableFirst(false)
    } else {
      setDisableLast(false)
      setDisableFirst(false)
    }
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
            onKeyDown={enterInput}
            value={inputValue}
          />
          <button
            className='btn btn-primary ml-3'
            onClick={handleClick}
          >
            Search
        </button>
        </div>

        {total > 10 &&
          <ul className='pagination'>
            {isQuery &&
              <span>{total} photos</span>
            }
            <Pagination
              handlePage={() => setPages(DEFAULT_INITIAL_PAGE)}
              title='&#xf100;'
              disabled={disableFirst}
            />
            <Pagination
              handlePage={previousPage}
              title='&#xf104;'
              disabled={disableFirst}
            />
            <span>{page}</span>
            {isQuery && <span>of {lastPage}</span>}
            <Pagination
              handlePage={nextPage}
              title='&#xf105;'
              disabled={disableLast}
            />
            {isQuery &&
              <Pagination
                handlePage={lastPageHandle}
                title='&#xf101;'
                disabled={disableLast}
              />}
          </ul>
        }
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
    </div>
  );
}

export default App;
