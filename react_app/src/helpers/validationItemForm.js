import { validateText, showLocalizedError } from "./validationCommon";

// Validates Item form
export default function validateItemForm()
{
    let isValid = true;

    if (!validateText("Name", "ErrorName", true))
    {
        isValid = false;
    }

    if (!validateText("Quality", "ErrorQuality", true, 15))
    {
        isValid = false;
    }

    showLocalizedError("ErrorSummary", "errSummary", isValid);
    return isValid;
}