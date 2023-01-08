import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div className="navbar py-2 px-4 flex justify-between">
      <h1 className="text-4xl font-bold text-center">Money Tracker 💸</h1>
      <div className="navlinks flex gap-4 items-center ">
        <NavLink to="/" className="navlink-btn">
          Home
        </NavLink>
        <NavLink to="/transactions" className="navlink-btn">
          Transactions
        </NavLink>
        <NavLink to="/ledgers" className="navlink-btn">
          Ledgers
        </NavLink>
        {isAuthenticated ? (
          <button
            type="button"
            className="font-semibold text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-1 focus:ring-blue-300 rounded-lg text-sm px-4 py-2"
          >
            Logout
          </button>
        ) : (
          <>
            <NavLink to="/sigup" className="navlink-btn">
              Register
            </NavLink>
            <NavLink to="/sigin" className="navlink-btn">
              Login
            </NavLink>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
