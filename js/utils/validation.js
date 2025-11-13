// Validation module for hotel-talavera-reservas

/**
 * Validate the provided name.
 * @param {string} name - Name to validate.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateName(name) {
    return name && name.trim().length >= 2;
}

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
 * Validate check-in and check-out dates.
 * @param {string} checkIn - Check-in date.
 * @param {string} checkOut - Check-out date.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateDateRange(checkIn, checkOut) {
    if (!validateDate(checkIn) || !validateDate(checkOut)) return false;
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return checkInDate >= today && checkOutDate > checkInDate;
}

/**
 * Validate number of guests.
 * @param {number} guests - Number of guests.
 * @returns {boolean} - True if valid, false otherwise.
 */
function validateGuests(guests) {
    const guestCount = parseInt(guests);
    return !isNaN(guestCount) && guestCount >= 1 && guestCount <= 10;
}

/**
 * Validate all form data.
 * @param {object} data - Form data containing all reservation fields.
 * @returns {object} - An object containing validation results and error messages.
 */
function validateFormData(data) {
    const errors = {};
    
    if (!validateName(data.name)) {
        errors.name = 'Name must be at least 2 characters long';
    }
    
    if (!validateEmail(data.email)) {
        errors.email = 'Please enter a valid email address';
    }
    
    if (!validatePhoneNumber(data.phone)) {
        errors.phone = 'Please enter a valid phone number';
    }
    
    if (!validateDateRange(data.checkIn, data.checkOut)) {
        errors.dates = 'Check-out date must be after check-in date and both must be in the future';
    }
    
    if (!validateGuests(data.guests)) {
        errors.guests = 'Number of guests must be between 1 and 10';
    }
    
    if (!data.roomType) {
        errors.roomType = 'Please select a room type';
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

// Browser-compatible export
if (typeof window !== 'undefined') {
    window.Validation = {
        validateName,
        validateEmail,
        validateDate,
        validatePhoneNumber,
        validateDateRange,
        validateGuests,
        validateFormData,
    };
}