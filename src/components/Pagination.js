import React from 'react';
// import {Link} from 'react-router-dom';

const Pagination = ({handlePage, title, disabled}) => {

  return (
    <>
      <li className="page-item">
        <button
          className='page-link'
          onClick={handlePage}
          disabled={disabled}
        >
          <i className='fa'>{title}</i>       
        </button>
      </li>
    </>
  )
}

export default Pagination
