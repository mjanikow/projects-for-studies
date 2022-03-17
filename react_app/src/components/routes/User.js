// Auth protected route
import React from "react";
import { isAuth } from "../../helpers/authHelper";
import { Navigate as Redirect } from "react-router-dom";

export default function User(props)
{
    return isAuth() ? props.target : <Redirect replace to={{pathname: props.error}} />;
}