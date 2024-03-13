import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import DefaultLayout from "./pages/layouts/Default";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import RestrictedRoute from "./context/RestrictedRoute";
import CategoryProducts from "./pages/CategoryProducts";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<DefaultLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/profile"
            element={
              <RestrictedRoute>
                <Profile />
              </RestrictedRoute>
            }
          />
          <Route path="/cart" element={<Cart />} />
          <Route path="/category/:categoryName" element={<CategoryProducts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
