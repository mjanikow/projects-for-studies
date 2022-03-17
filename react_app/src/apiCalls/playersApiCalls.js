// Handles players API calls
import { getToken } from "../helpers/authHelper";
const playersBaseURL = "http://localhost:3000/api/players";

export function getPlayers()
{
    return fetch(playersBaseURL);
}

export function getPlayerById(playerId)
{
    return fetch(`${playersBaseURL}/${playerId}`);
}

export function addPlayer(data)
{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    };

    return fetch(playersBaseURL, options);
}

export function updatePlayer(playerId, data)
{
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    };

    return fetch(`${playersBaseURL}/${playerId}`, options);
}

export function deletePlayer(playerId)
{
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    };

    return fetch(`${playersBaseURL}/${playerId}`, options);
}