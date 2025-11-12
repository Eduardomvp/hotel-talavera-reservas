// Validation module for hotel-talavera-reservas

/**
 * Validate the provided email address.
 * @param {string} email - Email to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

/**
 * Validate if the provided date is valid.
 * @param {string} date - Date to validate in YYYY-MM-DD format.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateDate(date) {
    const datePattern = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (!datePattern.test(date)) return false;
    const [year, month, day] = date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    return dateObj.getFullYear() === year && dateObj.getMonth() === month - 1 && dateObj.getDate() === day;
}

/**
 * Validate the phone number.
 * @param {string} phone - Phone number to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validatePhoneNumber(phone) {
    const phonePattern = /^\+?[1-9]\d{1,14}$/;
    return phonePattern.test(phone);
}

/**
 * Validate all form data.
 * @param {object} data - Form data containing email, date, and phone number.
 * @returns {object} - An object containing validation results.
 */
function validateFormData(data) {
    return {
        isValidEmail: validateEmail(data.email),
        isValidDate: validateDate(data.date),
        isValidPhoneNumber: validatePhoneNumber(data.phone),
    };
}

module.exports = {
    validateEmail,
    validateDate,
    validatePhoneNumber,
    validateFormData,
};