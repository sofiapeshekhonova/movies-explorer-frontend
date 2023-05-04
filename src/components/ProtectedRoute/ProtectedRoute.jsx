import React from 'react';
import { Navigate } from "react-router-dom";
import { AppRoute } from '../../constants';

const ProtectedRouteElement = ({ component: Component, ...props  }) => {
  return (
    props.isLoggedIn ? <Component {...props} /> : <Navigate to={AppRoute.Login} />
)}

export default ProtectedRouteElement;
