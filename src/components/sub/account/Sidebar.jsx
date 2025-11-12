// Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import accountMenu from './accountMenu';
import '../../../assets/styles/sidebar.css';

const Sidebar = () => {
  return (
    <aside className="account-sidebar no-border">
      <ul>
        {accountMenu.map(({ label, slug, icon }) => (
          <li key={slug}>
            <NavLink
              to={`/myaccount/${slug}`}
              className={({ isActive }) =>
                'sidebar-item' + (isActive ? ' active' : '')
              }
              end
            >
              <span className="icon">{icon}</span>
              <span className="label">{label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
