import { validateText, validateDate, showLocalizedError } from "./validationCommon";

// Validates Player form
export default function validatePlayerForm()
{
    let isValid = true;

    if (!validateText("Nickname", "ErrorNickname", true))
    {
        isValid = false;
    }

    if (!validateDate("TradeBan", "ErrorTradeBan"))
    {
        isValid = false;
    }

    if (!validateText("Pass", "ErrorPass"))
    {
        isValid = false;
    }

    showLocalizedError("ErrorSummary", "errSummary", isValid);
    return isValid;
}