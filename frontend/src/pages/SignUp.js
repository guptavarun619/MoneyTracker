import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import { SIGNUP_URL } from "../utils/url-constants";
import UserCredential from "../components/UserCredential";

const SignUp = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState({});
  const [error, setError] = useState("");
  const [success, setSucsess] = useState(null);

  const signup = async (username, password) => {
    try {
      setLoading(true);
      const response = await Axios.post(SIGNUP_URL, {
        username: username,
        password: password,
      });
      //   console.log(response);
      if (response.status === 201) {
        setSucsess(true);
        setUsername("");
        setPassword("");
      } else setSucsess(false);
      setResponse(response.data);
      setLoading(false);

      //   if signup was successfull - redirect to singup page
      navigate("/signin");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };

  return (
    <div className="signup container py-32 flex justify-center">
      <UserCredential
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        postReqMethod={signup}
        headingLabel="Sign up here ✍️"
        buttonLabel={loading ? "Loading..." : "Submit"}
      />
    </div>
  );
};

export default SignUp;
