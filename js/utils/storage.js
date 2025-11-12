// js/utils/storage.js

/**
 * Storage Module for handling reservations in localStorage.
 */
const Storage = {
    /**
     * Save a reservation to localStorage.
     * @param {Object} reservation - The reservation object to save.
     * @param {string} key - The key under which to store the reservation.
     */
    saveReservation: function(reservation, key) {
        const reservations = this.getReservations(key) || [];
        reservations.push(reservation);
        localStorage.setItem(key, JSON.stringify(reservations));
    },

    /**
     * Retrieve reservations from localStorage.
     * @param {string} key - The key under which the reservations are stored.
     * @returns {Array} - An array of retrieved reservations.
     */
    getReservations: function(key) {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    }
};

export default Storage;