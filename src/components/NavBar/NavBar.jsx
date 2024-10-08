import { Link } from "react-router-dom";
import { AuthedUserContext } from "../../App";
import { useContext } from "react";

import styles from "./NavBar.module.css";

const NavBar = ({ handleSignout }) => {
  const user = useContext(AuthedUserContext);
  return (
    <>
      {user ? (
        <nav className={styles.container}>
          <ul className={styles.ul}>
            <li className={styles.li}>Welcome, {user.username}</li>
            <li className={styles.li}>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/hoots/new">New Hoot</Link>
            </li>
            <li className={styles.li}>
              <Link to="" onClick={handleSignout}>
                Sign Out
              </Link>
            </li>
            <li className={styles.li}>
              <Link to="/hoots">Hoots</Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav className={styles.container}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link to="/signin">Sign In</Link>
            </li>
            <li className={styles.li}>
              <Link to="/signup">Sign Up</Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};
export default NavBar;
