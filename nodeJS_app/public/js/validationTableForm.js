
function validateForm() {

    const tableID = document.getElementById('tableId');
    const tableSeats = document.getElementById('tableSeats');
    const localization = document.getElementById('localization');

    const roof = document.getElementById('roof');
    const music = document.getElementById('music');
    const special = document.getElementById('special');

    const addons = "";
    if (roof.checked) addons.concat('zadaszenie')
    if (music.checked) addons.concat('muzyka')
    if (special.checked) addons.concat('wysoki standard')



    /*document.getElementById("addonsId").value = addons;
    console.log("debug")
    console.log(addons)
    console.log("______addons:__________________")
    console.log(cb.checked);
*/


    const errorTable = document.getElementById('errorTableId');
    const errorSeats = document.getElementById('errorTableSeats');
    const errorLocalization = document.getElementById('errorLocalization');
    const errorsSummary = document.getElementById('errorsSummary');


    resetErrors([tableID, tableSeats, localization], [errorTable, errorSeats, errorLocalization], errorsSummary);

    let valid = true;

    if (!checkRequired(tableID.value)) {
        valid = false;
        tableID.classList.add("error-input");
        errorTable.innerText = "Pole jest wymagae";
    }
    else if (!checkTextLengthRange(tableID.value, 2, 3)) {
        valid = false;
        tableID.classList.add("error-input");
        errorTable.innerText = "Pole powinno zawierać od 2 do 3 znaków.";
    }

    if (!checkRequired(tableSeats.value)) {
        valid = false;
        tableSeats.classList.add("error-input");
        errorSeats.innerText = "Pole jest wymagane";
    }
    else if (!checkTextLengthRange(tableSeats.value, 1, 1)) {
        valid = false;
        tableSeats.classList.add("error-input");
        errorSeats.innerText = "Pole powinno zawierać jeden znak";
    }
    else if (!checkIsNumber(tableSeats.value)) {
        valid = false;
        tableSeats.classList.add("error-input");
        errorSeats.innerText = "Pole powinno zawierać liczbę";
    }


    if (!checkRequired(localization.value)) {
        valid = false;
        localization.classList.add("error-input");
        errorLocalization.innerText = "Pole jest wymagane";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy"
    }
    return valid;
}