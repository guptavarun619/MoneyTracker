import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../contexts/AuthContext";
import { SIGNIN_URL } from "../utils/url-constants";
import UserCredential from "../components/UserCredential";

const SignIn = () => {
  const { setIsAuthenticated, setClientUserId } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [success, setSucsess] = useState(null);

  const signin = async (username, password) => {
    try {
      setLoading(true);
      const res = await Axios.post(SIGNIN_URL, {
        username: username,
        password: password,
      });
      //   console.log(res);
      if (res.status === 200) {
        setSucsess(true);
        setUsername("");
        setPassword("");
      } else setSucsess(false);
      setResponse(res.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.message);
      setLoading(false);
    }
    //   if signin was successfull
    if (success) {
      //   save the authToken in localstorage
      //   console.log(response);
      localStorage.setItem("authToken", response.data.authToken);
      localStorage.setItem("userId", response.data.userId);
      // set the authenticated boolean in 'AuthContext'
      setIsAuthenticated(true);
      // set the userId in 'AuthContext'
      setClientUserId(response.data.userId);
      // redirect to homepage page
      console.log(response.data.authToken, "/tranasction");
      navigate("/transactions");
    }
  };

  return (
    <div className="signin container py-32 flex justify-center">
      <UserCredential
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        postReqMethod={signin}
        headingLabel="Sign in here 🔐"
        buttonLabel={loading ? "Loading..." : "Submit"}
      />
    </div>
  );
};

export default SignIn;
