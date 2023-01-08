import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Homepage,
  SignIn,
  SignUp,
  Transactions,
  ProtectedRoutes,
  PageNotFound,
} from "./pages/index.js";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientUserId, setClientUserId] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) setIsAuthenticated(true);
    const userId = localStorage.getItem("userId");
    if (userId) setClientUserId(userId);
  }, []);

  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <div className="App w-screen h-screen">
        <BrowserRouter>
          <AuthContext.Provider
            value={{
              isAuthenticated,
              setIsAuthenticated,
              clientUserId,
              setClientUserId,
            }}
          >
            <header className="App-header">
              <h1 className="py-2 text-5xl font-bold text-center">
                Money Tracker 💸
              </h1>
            </header>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/transactions" element={<Transactions />} />
              </Route>
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </AuthContext.Provider>
        </BrowserRouter>
      </div>
    </QueryClientProvider>
  );
}

export default App;
