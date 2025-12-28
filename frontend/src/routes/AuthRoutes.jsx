import React from "react";
import { Routes, Route } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/resetPassword";
import OAuthSuccess from "../pages/oauth-success";
import Signup from "../pages/Signup"; // if you have this

export default function AuthRoutes() {
  return (
    <TransitionGroup>
      <CSSTransition classNames="slide-page" timeout={400}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
