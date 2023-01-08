import { useEffect } from "react";

const UserCredential = ({
  username,
  setUsername,
  password,
  setPassword,
  headingLabel,
  buttonLabel,
  postReqMethod,
}) => {
  const changeUsername = (event) => {
    setUsername(event.target.value);
  };
  const changePassword = (event) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    //   return () => {
    //     second
    //   }
  }, []);

  return (
    <div className="credential-form container max-w-md rounded-lg shadow-lg">
      <h3 className="text-2xl py-4 font-medium text-center">{headingLabel}</h3>
      <div className="p-8 flex flex-col gap-4">
        <input
          className="w-full p-2 border border-cyan-800 rounded-md"
          value={username}
          onChange={changeUsername}
          type="text"
          placeholder="username"
        />
        <input
          className="w-full p-2 border border-cyan-800 rounded-md"
          value={password}
          onChange={changePassword}
          type="password"
          placeholder="password"
        />
        <button
          type="button"
          className="text-white bg-cyan-500 hover:bg-cyan-600 focus:ring-1 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          onClick={() => {
            console.log("submit button clicked");
            postReqMethod(username, password);
          }}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  );
};

export default UserCredential;
