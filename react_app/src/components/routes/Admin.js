// Admin protected route
import React from "react";
import { isAdmin } from "../../helpers/authHelper";
import { Navigate as Redirect } from "react-router-dom";

export default function Auth(props)
{
    return isAdmin() ? props.target : <Redirect replace to={{pathname: props.error}} />;
}