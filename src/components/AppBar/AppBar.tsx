import React, {useCallback} from 'react';
import {Link, NavLink} from 'react-router-dom';
import {useAppDispatch} from '../../app/hooks';
import {showTransactionModal} from '../../features/transactions/transactionSlice';


const Appbar: React.FC = () => {
  const dispatch = useAppDispatch();

  const showModal = useCallback(() => {
    dispatch(showTransactionModal());
  }, [dispatch])

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
          <button className="btn btn-success" onClick={showModal}>Add</button>
        </ul>
      </div>
    </nav>
  );
};

export default Appbar;