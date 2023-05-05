import React from 'react';
import { NavLink } from 'react-router-dom';
import './TopMenu.css';

const TopMenu = () => {
  return (
    <nav className="top-menu">
      <ul>
        <li>
          <NavLink to="/config" activeClassName="active">Config</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default TopMenu;
