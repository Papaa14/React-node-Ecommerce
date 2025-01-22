import React, { useState, useRef, useEffect } from 'react';
import {
  BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill
} from 'react-icons/bs';
import './sidebar.css';
import { NavLink, Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { FiMenu } from 'react-icons/fi';



const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);     

  const ref = useRef();
  useEffect(() => {
    const handler = (event) => {
      if (
        sidebarOpen &&
        ref.current &&
        !ref.current.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);
    return () => {
      // Cleanup the event listener
      document.removeEventListener('mousedown', handler);
      document.addEventListener('touchstart', handler);
    };
  }, [sidebarOpen]);



  return (
    <aside id="sidebar" >
      <button
        className="toggle"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        {sidebarOpen ? (
          <MdClose style={{ width: '32px', height: '32px' }} />
        ) : (
          <FiMenu
            style={{
              width: '32px',
              height: '32px',
            }}
          />
        )}
      </button>


      <ul ref={ref} className={`menu-nav${sidebarOpen ? ' show-menu' : ''}`}>
       

        <li className='sidebar-list-item'>
          <NavLink
            to={Link.path}
            onClick={() => setSidebarOpen(false)}
          >
            {Link.text}
          </NavLink>

          <NavLink to="/admin">
            <BsGrid1X2Fill className='icon' /> Dashboard
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="orders">
            <BsFillArchiveFill className='icon' /> Orders
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="products">
            <BsFillGrid3X3GapFill className='icon' /> Manage Products
          </NavLink>
        </li>
        <li className='sidebar-list-item'>
          <NavLink to="users">
            <BsPeopleFill className='icon' /> Customers
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
