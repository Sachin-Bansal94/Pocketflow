import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    const user = localStorage.getItem(
        "expenseTracker-user"
    );

    if(user){
        return children;
    }

    return <Navigate to="/" />;
}

export default ProtectedRoute;