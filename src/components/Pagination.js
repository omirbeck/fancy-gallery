import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';

const Pagination = ({handlePage, title}) => {

  return (
    <Fragment>
      <li className="page-item">
        <Link to="/"
          className='page-link'
          onClick={handlePage}
        >
          {title}          
        </Link>
      </li>
    </Fragment>
  )
}

export default Pagination
