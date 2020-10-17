import React from 'react';
import { Image } from '../service/type';

const ImageList = ({ images }: { images: Image[] }) => {
    return (
        <div className="image-grid">
        {images.map((image, index) => {
          const { id, color, urls, alt_description } = image;
          return (
            <div
              className="image-item"
              key={`${id}-${index}`}
              style={{ backgroundColor: color }}
            >
              <img src={urls.small} alt={alt_description} />
            </div>
          );
        })}
      </div>
    )
}

export default ImageList;
