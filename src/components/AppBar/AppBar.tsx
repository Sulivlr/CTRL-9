import React from 'react';
import {Link, NavLink} from 'react-router-dom';

const Appbar: React.FC = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark text-bg-warning">
      <div className="container-fluid">
        <span className="navbar-brand">
          <Link to="/" className="nav-link">Finance Tracker</Link>
        </span>
        <ul className="navbar-nav mr-auto flex-row flex-nowrap gap-2">
          <li className="nav-item">
            <NavLink to="/" className="nav-link">Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/categories" className="nav-link">Categories</NavLink>
          </li>
          <button className="btn btn-success">Add</button>
        </ul>
      </div>
    </nav>
  );
};

export default Appbar;