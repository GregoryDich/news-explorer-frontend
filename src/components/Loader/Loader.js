import React from 'react';
import './Loader.css';
import notFound from '../../images/not-found.svg';
import Preloader from '../Preloader/Preloader';

function Loader({ searchResult }) {
  return (
    <div className='loader'>
      {searchResult ? <Preloader /> : <img src={notFound} alt='sadly smile' />}
      {!searchResult && <h2 className='loader__title'>Nothing found</h2>}
      <span className='loader__text'>
        {!searchResult && 'Sorry, but nothing matched your search terms.'}
      </span>
    </div>
  );
}
export default Loader;
