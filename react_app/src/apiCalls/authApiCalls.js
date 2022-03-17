// Handles auth API calls
const authBaseURL = "http://localhost:3000/api";

export function login(player)
{
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(player)
    };

    return fetch(`${authBaseURL}/login`, options);
}