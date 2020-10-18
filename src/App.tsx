import React, { useState, useRef, useEffect } from "react";
import { ACCESS_KEY, API_URL } from "./credentials";
import { Image } from './service/type';
import "./App.css";
import { useFetchData, useIntersactionObserver } from './service/hooks';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ImageList from "./components/ImageList";
import { CircularProgress, Grid, makeStyles, Typography } from "@material-ui/core";


const INITIAL_PAGE = 1;

const useStyles = makeStyles((theme) => ({
  loading: {
    padding: theme.spacing(2),
  },
  title: {
    padding: theme.spacing(2, 0),
  }
}))

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPages] = useState(INITIAL_PAGE);
  const [open, setOpen] = useState(false);
  const [path, setPath] = useState<string>('');
  const [query, setQuery] = useState<string>();
  const { data, loading, hasError } = useFetchData(path);
  const { loader, hasInterSection } = useIntersactionObserver();

  const classes = useStyles();

  const params = `page=${page}&per_page=20&client_id=${ACCESS_KEY}`;

  const handleClick = (newQuery?: string) => {
    if (newQuery !== query) {
      setImages([]);
      setPages(INITIAL_PAGE);
    }
    setQuery(newQuery);
  };

  const handleSidebarOpen = () => {
    setOpen(true);
  }

  const handleSidebarClose = () => {
    setOpen(false);
  }

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
      <Header 
        open={open} 
        handleSidebarOpen={handleSidebarOpen} />
      <Sidebar 
        open={open}
        handleSidebarClose={handleSidebarClose}
        handleClick={handleClick} />
      <Typography
        variant="h2"
        align="center"
        color="primary"
        className={classes.title}>{query || 'random'}</Typography>
      {images.length > 0 && <ImageList images={images} />}
      {hasError &&
        <Typography
          variant="h4"
          color="secondary"
          align="center">Someting gues wrong...</Typography>}
      <div
        ref={loader}
        className={classes.loading}>{loading && <CircularProgress />}</div>
    </Grid>
  );
}

export default App;