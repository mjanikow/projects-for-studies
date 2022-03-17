// Handles players API calls
import { getToken } from "../helpers/authHelper";
const slotsBaseURL = "http://localhost:3000/api/slots";

export function getSlots()
{
    return fetch(slotsBaseURL);
}

export function getSlotById(slotId)
{
    return fetch(`${slotsBaseURL}/${slotId}`);
}

export function addSlot(data)
{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    };

    return fetch(slotsBaseURL, options);
}

export function updateSlot(slotId, data)
{
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + getToken()
        },
        body: JSON.stringify(data)
    };

    return fetch(`${slotsBaseURL}/${slotId}`, options);
}

export function deleteSlot(slotId)
{
    const options = {
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getToken()
        }
    };

    return fetch(`${slotsBaseURL}/${slotId}`, options);
}