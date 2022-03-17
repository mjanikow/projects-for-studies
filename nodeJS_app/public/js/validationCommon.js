function resetErrors(inputs, errorTexts, errorInfo) {
    for (let i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove("error-input");
    }
    for (let i = 0; i < errorTexts.length; i++) {
        errorTexts[i].innerText = "";
    }
    errorInfo.innerText = "";
}
function checkRequired(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    if (value === "") {
        return false;
    }
    return true;
}
function checkTextLengthRange(value, min, max) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const length = value.length;
    if (max && length > max) {
        return false;
    }
    if (max && length < min) {
        return false;
    }
    return true;
}
function checkIsNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /[0-9]/
    return re.test(value);
}
function checkPhoneNumber(value) {
    if (!value) {
        return false;
    }
    value = value.toString().trim();
    const re = /^\d{3} ?\d{3} ?\d{3} ?$/
    return re.test(value);
}