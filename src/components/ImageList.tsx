import React, { useEffect, useState } from 'react';
import { createStyles, GridList, GridListTile, GridListTileBar, IconButton, ListSubheader, makeStyles, Theme, useMediaQuery, useTheme } from '@material-ui/core';
import { Image } from '../service/type';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: "80%",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
  }),
);


const ImageList = ({ images }: { images: Image[] }) => {
    const [breakpoint, setBreakpoint] = useState(1);
    const classes = useStyles();
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const xl = useMediaQuery(theme.breakpoints.up('xl'));

    const cols = () => {
      if (xs) setBreakpoint(1)
      if (sm) setBreakpoint(2)
      if (md) setBreakpoint(3)
      if (xl) setBreakpoint(4)
    }

    useEffect(() => {
      cols();
    }, [xs, sm, md, xl])

  return (
    <div className={classes.root}>
      <GridList cellHeight={450} className={classes.gridList} cols={breakpoint}>
        {images.map((image, index) => {
          const { id, color, urls, alt_description, likes, user, description } = image;

          return (
          <GridListTile key={`${id}-${index}`} cols={1}>
            <img src={urls.small} alt={alt_description} />
            <GridListTileBar
              title={<span>Author: {user.name}</span>}
              subtitle={<span>{description && description}</span>}
              actionIcon={
                <IconButton aria-label={`info about ${likes}`} className={classes.icon} >
                  <span>Likes:{likes}</span>
                </IconButton>
              }
            />
          </GridListTile>
          )
        })}
      </GridList>
    </div>
    )



    // return (
    //     <div className="image-grid">
    //     {images.map((image, index) => {
    //       const { id, color, urls, alt_description } = image;
    //       return (
    //         <div
    //           className="image-item"
    //           key={`${id}-${index}`}
    //           style={{ backgroundColor: color }}
    //         >
    //           <img src={urls.small} alt={alt_description} />
    //         </div>
    //       );
    //     })}
    //   </div>
    // )
}

export default ImageList;
