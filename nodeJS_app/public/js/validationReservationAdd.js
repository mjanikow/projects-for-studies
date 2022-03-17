function validateForm() {


    const lastname = document.getElementById('lastName');
    const phonenumber = document.getElementById('phoneNumber');


    const errorname = document.getElementById('errorLastName');
    const errorphone = document.getElementById('errorPhoneNumber');
    const errorsSummary = document.getElementById('errorsSummary');

    resetErrors([lastname, phonenumber], [errorname, errorphone], errorsSummary);

    let valid = true;

    if (!checkRequired(lastname.value)) {
        valid = false;
        lastname.classList.add("error-input");
        errorname.innerText = "Pole jest wymagae";
    }
    else if (!checkTextLengthRange(lastname.value, 3, 30)) {
        valid = false;
        lastname.classList.add("error-input");
        errorname.innerText = "Pole powinno zawierać od 3 do 30 znaków.";
    }

    if (!checkRequired(phonenumber.value)) {
        valid = false;
        phonenumber.classList.add("error-input");
        errorphone.innerText = "Pole jest wymagae";
    }
    else if (!checkPhoneNumber(phonenumber.value)) {
        valid = false;
        phonenumber.classList.add("error-input");
        errorphone.innerText = "Wpisz poprawny numer telefonu";
    }
    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy"
    }
    return valid;

}