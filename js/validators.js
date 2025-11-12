// js/validators.js

function validateName(name) {
    const regex = /^[a-zA-Z\s]{1,50}$/;
    return regex.test(name);
}

function validateEmail(email) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^\+?[1-9]\d{1,14}$/;
    return regex.test(phone);
}

function validateDate(date) {
    const regex = /^(19|20)\d\d-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/;
    return regex.test(date);
}

function validateReservation(reservation) {
    return validateName(reservation.name) &&
           validateEmail(reservation.email) &&
           validatePhone(reservation.phone) &&
           validateDate(reservation.checkin) &&
           validateDate(reservation.checkout);
}

// Export the validation functions
module.exports = { validateName, validateEmail, validatePhone, validateDate, validateReservation };