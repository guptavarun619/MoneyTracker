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
  Ledger,
} from "./pages/index.js";
import { AuthContext } from "./contexts/AuthContext";
import Navbar from "./components/Navbar.js";

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
      <div className="App container ml-auto mr-auto">
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
              <Navbar />
            </header>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route element={<ProtectedRoutes />}>
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/ledgers" element={<Ledger />} />
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
