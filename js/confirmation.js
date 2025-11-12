'use strict';

/**
 * Generate confirmation message for hotel reservations.
 *
 * @param {string} guestName - Name of the guest.
 * @param {string} bookingId - The booking ID.
 * @param {string} checkInDate - Check-in date as YYYY-MM-DD.
 * @param {string} checkOutDate - Check-out date as YYYY-MM-DD.
 * @returns {string} Confirmation message.
 */
function generateConfirmation(guestName, bookingId, checkInDate, checkOutDate) {
    return `Dear ${guestName},\nYour reservation is confirmed!\n\nBooking ID: ${bookingId}\nCheck-in Date: ${checkInDate}\nCheck-out Date: ${checkOutDate}\n\nThank you for choosing Hotel Talavera!`; 
}

module.exports = {
    generateConfirmation,
};