import { useState } from "react";
import "./App.css";
import Background from "./components/Background";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Income from "./components/Income";
import Expenses from "./components/Expenses";
import Register from "./components/Register";
import Login from "./components/Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuthContext } from "./context/AuthContext";

function App() {
  const [active, setActive] = useState(1); // selected item
  

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Dashboard />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Background />
          <Routes>
            <Route
              path="/register"
              element={
                <>
                  <h2 className="project-heading">ExpenseBuddy</h2>
                  <div className="login">
                    <Register />
                  </div>
                </>
              }
            />
            <Route
              path="/"
              element={
                <RequireAuth>
                  <div className="mainLayout">
                    <Navigation active={active} setActive={setActive} />
                    <div className="main">{displayData()}</div>
                  </div>
                </RequireAuth>
              }
            />
            <Route
              path="/login"
              element={
                <>
                  <h2 className="project-heading">ExpenseBuddy</h2>
                  <div className="login">
                    <Login />
                  </div>
                </>
              }
            />
            <Route
              exact
              path="/dashboard"
              element={
                <RequireAuth>
                  <div className="mainLayout">
                    <Navigation active={active} setActive={setActive} />
                    <div className="main">{displayData()}</div>
                  </div>
                </RequireAuth>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

function RequireAuth({ children }) {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default App;
