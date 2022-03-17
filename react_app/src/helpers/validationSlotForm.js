import { validateText, validateNumber, showLocalizedError } from "./validationCommon";

// Validates Slot form
export default function validateSlotForm()
{
    let isValid = true;

    if (!validateText("Player", "ErrorPlayer", true, 0))
    {
        isValid = false;
    }

    if (!validateText("Item", "ErrorItem", true, 0))
    {
        isValid = false;
    }

    if (!validateNumber("Amount", "ErrorAmount", true))
    {
        isValid = false;
    }

    if (!validateText("Event", "ErrorEvent"))
    {
        isValid = false;
    }

    showLocalizedError("ErrorSummary", "errSummary", isValid);
    return isValid;
}