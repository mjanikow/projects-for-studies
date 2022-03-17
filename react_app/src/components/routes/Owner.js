// Owner protected route
import React from "react";
import { useParams, Navigate as Redirect } from "react-router-dom";
import { isOwner } from "../../helpers/authHelper";

export default function Owner(props)
{
    const { playerId } = useParams();
    return isOwner(playerId) ? props.target : <Redirect replace to={{pathname: props.error}} />;
}