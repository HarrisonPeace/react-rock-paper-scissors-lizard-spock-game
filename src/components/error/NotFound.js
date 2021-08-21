import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <main className="not-found-error-container">
      <h2>Page Not Found</h2>
      <p>Sorry! We couldn't find the page you're looking for.</p>
      <Link className="stand-alone-button" to="/">
        Return Home
      </Link>
    </main>
  );
};

export default NotFound;
