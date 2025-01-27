import { Outlet, Link } from "react-router-dom";
import { UserContext } from '../../context/UserContext'
import React, { useContext } from 'react'

const {logout,current_user} = useContext(UserContext)
const Navbar = () => {
  return (
    <>
      <nav>
        <ul className="nav nav-pills nav-fill">
          <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Register">Register</Link>
          </li>
          <li className="nav-item">
            <Link onclick={()=> logout()}className="nav-link">Logout</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;
