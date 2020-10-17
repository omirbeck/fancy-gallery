import React, { useState, useRef, useEffect } from "react";
import { ACCESS_KEY, API_URL } from "./credentials";
import { Image } from './service/type';
import "./App.css";
import {useFetchData, useIntersactionObserver} from './service/hooks';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ImageList from "./components/ImageList";
import { CircularProgress, Grid } from "@material-ui/core";

const INITIAL_PAGE = 1;

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPages] = useState(INITIAL_PAGE);
  const [path, setPath] = useState<string>('');
  const [query, setQuery] = useState<string>();
  const {data, loading, hasError} = useFetchData(path);
  const {loader, hasInterSection} = useIntersactionObserver(); 
  
  const params = `page=${page}&per_page=20&client_id=${ACCESS_KEY}`;

  const handleClick = (newQuery? : string) => {
    if (newQuery !== query) {
      setImages([]);
      setPages(INITIAL_PAGE);
    }
    setQuery(newQuery);
  };
  
  useEffect(() => {
    setImages(images => [...images, ...data])
  }, [data]);

  useEffect(() => {
    hasInterSection && setPages(page => page + 1);
  }, [hasInterSection])

  useEffect(() => {
    if (query) {
      setPath(`${API_URL}/search/photos/?query=${query}&${params}`);
    } else {
      setPath(`${API_URL}/photos/?${params}`);
    }
  }, [query, params]);

  return (
    <Grid container direction="column" justify="center">
      <Header />
      <Sidebar handleClick={handleClick} />
      <ImageList images={images} />
  <div ref={loader}>{loading && <CircularProgress /> }</div>
    </Grid>
  );
}

export default App;