import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./Loader.css";

const Home = React.lazy(() => import("./pages/Home"));
import ScrollToTop from "./components/ScrollToTop";
const UserDashboard = React.lazy(() => import("./pages/UserDashboard"));
const ConnectWallet = React.lazy(() => import("./pages/ConnectWallet"));
import { Provider } from "react-redux";
import { store } from "./app/store";
const AdminPage = React.lazy(() => import("./pages/Admin"));

export const Fallback = () => (
  <div className="flex-1 bg-white flex justify-center items-center min-h-[70vh] h-[100%]w-[100%]">
    <span className="loader"></span>
  </div>
);

export const LazyRoute = ({ Component }) => (
  <React.Suspense fallback={<Fallback />}>
    <Component />
  </React.Suspense>
);

function App() {
  return (
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<LazyRoute Component={Home} />} />
          <Route
            path="/dashboard"
            element={<LazyRoute Component={UserDashboard} />}
          />
          <Route
            path="/connect_wallet"
            element={<LazyRoute Component={ConnectWallet} />}
          />
          <Route
            path="/admin"
            element={<LazyRoute Component={AdminPage} />}
          />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
