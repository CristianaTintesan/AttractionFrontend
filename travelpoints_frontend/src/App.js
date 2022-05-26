import {BrowserRouter as Router, Navigate, Route, Routes,} from 'react-router-dom';
import ErrorPage from './pages/ErrorPage';
import AttractionsListPage from './pages/AttractionsListPage';
import AttractionPage from './pages/AttractionPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';
import React from 'react';
import ContactUs from "./pages/ContactUs";
import Wishlist from "./components/Wishlist";

function App() {

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/attractions"
          element={
            <React.Fragment>
              <Navbar
              />
              <AttractionsListPage />
            </React.Fragment>
          }
        />
        <Route
          exact
          path="/attraction/:id"
          element={
            <React.Fragment>
              <Navbar
              />
              <AttractionPage />
            </React.Fragment>
          }
        />
        <Route
          exact
          path="/admin"
          element={
            <React.Fragment>
              <Navbar
              />
              <AdminPage />
            </React.Fragment>
          }
        />
          <Route
              exact
              path="/contact-us"
              element={
                  <React.Fragment>
                      <Navbar
                      />
                      <ContactUs />
                  </React.Fragment>
              }
          />

          <Route
              exact
              path="/wishlist"
              element={
                  <React.Fragment>
                      <Navbar
                      />
                      <Wishlist />
                  </React.Fragment>
              }
          />

        <Route
          exact
          path="/"
          element={<Navigate replace to="/attractions" />}
        ></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}


export default App;
