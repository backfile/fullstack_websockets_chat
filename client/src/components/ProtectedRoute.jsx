import {Outlet, Navigate } from "react-router-dom"

export function ProtectedRoute({canActivate, children}){
    if(canActivate){
        return <Outlet></Outlet>
    }else{
        return <Navigate to={"/login"} replace/>
    }

}