import { useContext } from "react";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useContext(AuthContext);

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <div className="container mx-sm py-8">
      <h1 className="text-2xl font-semibold text-center">
        Protected Route : Please login to access this page
      </h1>
      <Link to="/signin">
        <h3 className="py-8 text-xl font-semibold underline text-center">
          Goto '/signin'
        </h3>
      </Link>

      <p className="py-8 text-lg   text-center">
        If you are not an existing,{" "}
        <Link to="/signup">
          <span className="underline">please click here to signup</span>
        </Link>
      </p>
    </div>
  );
};

export default ProtectedRoutes;
