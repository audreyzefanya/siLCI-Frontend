import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ element: Component }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    console.log("veroooo")
    const canAccessRoute = (currentRoute, allowedRoutes) => {
        return allowedRoutes.some((allowedRoute) => currentRoute.startsWith(allowedRoute));
    };
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))

    const manajerRoutes = [
        '/manajer/dashboard',
        '/manajer/register',
    ];

    const managerOperasionalRoutes = [
        '/manager-operasional/dashboard',
        '/manager-operasional/register',
    ];

    if (isAuthenticated) {
        if (userInfo.role === 'Manajer' && canAccessRoute(window.location.pathname, manajerRoutes)) {
            return <Component />;
        }
        else if (userInfo.role === 'Manager Operasional' && canAccessRoute(window.location.pathname, managerOperasionalRoutes)) {
            return <Component />;
        } 
        else {
            return <Navigate to="/logout" />;
        }
    } else {
        return <Navigate to="/login" />;
    }
};

export default ProtectedRoutes;