// Contains auth util functions
export function getCurrentUser()
{
    return JSON.parse(localStorage.getItem("user"));
}

export function getToken()
{
    const player = getCurrentUser();
    let token = "";

    if (player && player.token)
    {
        token = player.token;
    }

    return token;
}

export function isAuth()
{
    const player = getCurrentUser();

    if (player)
    {
        return true;
    }

    return false;
}

export function isAdmin()
{
    const player = getCurrentUser();

    if (player && player.isVIP)
    {
        return true;
    }

    return false;
}

export function isOwner(id)
{
    const player = getCurrentUser();

    if (player && (player.id == id || player.isVIP))
    {
        return true;
    }

    return false;
}