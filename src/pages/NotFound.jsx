import React from 'react';
import './NotFound.css';

const NotFoundPage = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
          <h2>Page not found</h2>
        </div>
        <a href="/">Take me back!</a>
      </div>
    </div>
  );
}

export default NotFoundPage;
