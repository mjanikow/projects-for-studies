// Validates text field
export function validateText(textId, errorId, isRequired = false, maxLength = 30)
{
    const input = document.getElementById(textId);

    if (!input)
    {
        return false;
    }

    if (isRequired)
    {
        const tmp = checkReq(input.value);
        showLocalizedError(errorId, "errRequired", tmp);

        if (!tmp)
        {
            return false;
        }
    }

    if (maxLength > 0)
    {
        const tmp = checkLen(input.value, maxLength);
        showLocalizedError(errorId, `errMaxLength:${maxLength}`, tmp);

        if (!tmp)
        {
            return false;
        }
    }

    return true;
}

// Validates number field
export function validateNumber(numId, errorId, isRequired = false, minValue = 0)
{
    const input = document.getElementById(numId);

    if (!input)
    {
        return false;
    }

    if (isRequired)
    {
        const tmp = checkReq(input.value);
        showLocalizedError(errorId, "errRequired", tmp);

        if (!tmp)
        {
            return false;
        }
    }

    if (input.value <= minValue)
    {
        showLocalizedError(errorId, `errMinValue:${minValue}`, false);
        return false;
    }

    return true;
}

// Validates date field
export function validateDate(dateId, errorId, isRequired = false, onlyFuture = true)
{
    const input = document.getElementById(dateId);

    if (!input)
    {
        return false;
    }

    if (isRequired)
    {
        const tmp = checkReq(input.value);
        showLocalizedError(errorId, "errRequired", tmp);

        if (!tmp)
        {
            return false;
        }
    }

    if (input.value)
    {
        let tmp = input.value.match(/^[1-9][0-9]{3}-[0-1][0-9]-[0-3][0-9]([ T][0-2][0-9]:[0-5][0-9])?$/);
        showLocalizedError(errorId, "errFormat", tmp);

        if (!tmp)
        {
            return false;
        }

        if (onlyFuture)
        {
            tmp = new Date(input.value) > Date.now();
            showLocalizedError(errorId, "errOnlyFuture", tmp);

            if (!tmp)
            {
                return false;
            }
        }
    }

    return true;
}

// Checks required value
function checkReq(value)
{
    return value ? value.toString().trim() !== "" : false;
}

// Checks text length
function checkLen(value, maxLength)
{
    return value ? value.toString().length <= maxLength : true;
}

// Displays an error
export function showError(errorId, message, isValid = true)
{
    const err = document.getElementById(errorId);

    if (err)
    {
        err.innerHTML = isValid ? "" : message;
    }
}

// Displays an localized error
export function showLocalizedError(errorId, key, isValid = true)
{
    const err = document.getElementById(errorId);

    if (err)
    {
        err.innerHTML = isValid ? "" : getLocalizedError(key);
    }
}

// Returns localized error message
function getLocalizedError(key)
{
    let err;
    let val;

    if (typeof (key) == "string" && key.includes(":"))
    {
        const args = key.split(":");
        err = document.getElementById(args[0]);

        if (args.length > 1)
        {
            val = args[1];
        }
    }
    else
    {
        err = document.getElementById(key);
    }

    return err ? err.innerHTML + (val ? val : "") : "";
}