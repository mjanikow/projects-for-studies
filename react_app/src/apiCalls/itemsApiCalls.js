// Handles players API calls
import { getToken } from "../helpers/authHelper";
const itemsBaseURL = "http://localhost:3000/api/items";

export function getItems()
{
    return fetch(itemsBaseURL);
}

export function getItemById(itemId)
{
    return fetch(`${itemsBaseURL}/${itemId}`);
}

export function addItem(data)
{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    };

    return fetch(itemsBaseURL, options);
}

export function updateItem(itemId, data)
{
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    };

    return fetch(`${itemsBaseURL}/${itemId}`, options);
}

export function deleteItem(itemId)
{
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    };

    return fetch(`${itemsBaseURL}/${itemId}`, options);
}