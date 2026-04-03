import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// import Dashboard from "./pages/Dashboard";
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Landing = lazy(() => import("./pages/Landing"));

function App() {
  return (
    <>
      <BrowserRouter>
        <Appbar></Appbar>
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback="loading...">
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback="loading...">
                <Landing />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

function Appbar() {
  const navigate = useNavigate();
  return (
    <>
      <div>
        <button
          onClick={() => {
            navigate("/");
          }}
        >
          Landing
        </button>
        <button
          onClick={() => {
            navigate("/dashboard");
          }}
        >
          Dashboard
        </button>
      </div>
    </>
  );
}

export default App;

{
  /* this is not a better way to do client side routing  */
}
{
  /* <button
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Landing
        </button>
        <button
          onClick={() => {
            window.location.href = "/dashboard";
          }}
        >
          Dashboard
        </button> */
}
