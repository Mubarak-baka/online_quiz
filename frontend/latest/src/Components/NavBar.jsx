import { Outlet, Link } from "react-router-dom";
import { useContext } from 'react';
import { UserContext } from "../../context/UserContext";

const Navbar = ({ quiz }) => {
  const { logout,current_user } = useContext(UserContext);

  return (
    <>
      <nav>
        <ul className="nav nav-pills nav-fill">

      
          {current_user?<>
            <li className="nav-item">
            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
          </li>
        
          <li className="nav-item">
            <Link onClick={() => logout()} className="nav-link">Logout</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/profile">Profile</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="readquiz">Read Quiz</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="Addquiz">Add Quiz</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="ViewResults">View results</Link>
          </li>
         
          </>:
          <>
            <li className="nav-item">
            <Link className="nav-link" to="/Login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/Register">Register</Link>
          </li>
          </>}
         
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Navbar;