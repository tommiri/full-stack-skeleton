import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/auth-context';
import Button from '../components/button/Button';

const NavLinks = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <ul>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {!isLoggedIn && (
        <li>
          <NavLink to="/auth">Login</NavLink>
        </li>
      )}
      {isLoggedIn && (
        <li>
          <Button onClick={logout}>Logout</Button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
