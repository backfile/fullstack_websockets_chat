import {Outlet, Navigate} from "react-router-dom"

export function ProtectedRoute({canActivate, redirect}){
    if(canActivate){
        return <Outlet></Outlet>
    }else{
        return <Navigate to={redirect} replace/>
    }

}