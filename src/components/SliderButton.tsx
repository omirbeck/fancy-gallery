import React, { useEffect, useState } from 'react'
import { Button, createStyles, Fade, makeStyles, Theme } from '@material-ui/core'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    button: {
      position: 'sticky',
      zIndex: theme.zIndex.drawer + 1,
      transition: 'opacity 1000ms, background',
      top: '90%',
      left: '85%',
      width: 80,
      height: 80,
      background: 'rgb(63,81,181, .8)',
      fontSize: 'large',
      color: 'secondary',
      "&:hover": {
        backgroundColor: "rgb(63,81,181)"
    }
    },
    icon: {
      fontSize: 80,
      color: '#fff'
    },
  }),
);

const SliderButton = () => {
  const [toggle, setToggle] = useState(false)
  const classes = useStyles();

  const handleScroll = () => {
    if (0 < window.scrollY) {
      setToggle(true)
    } else if (0 === window.scrollY) {
      setToggle(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToUp = () => {

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <>
      <Fade in={toggle} >
        <Button
          className={classes.button}
          onClick={scrollToUp}
        >
          <KeyboardArrowUpIcon className={classes.icon} />
        </Button>
      </Fade>
    </ >
  )
}

export default SliderButton
