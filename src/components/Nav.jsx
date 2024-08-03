import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto flex justify-between">
        <div className="text-white font-bold">MyApp</div>
        <div className="space-x-4">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/check-price-list" className="text-white">Check Price</Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
