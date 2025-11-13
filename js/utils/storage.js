// js/utils/storage.js

/**
 * Storage Module for handling reservations in localStorage.
 */
const Storage = {
    STORAGE_KEY: 'hotelTalaveraReservations',

    /**
     * Save a reservation to localStorage.
     * @param {Object} reservation - The reservation object to save.
     * @returns {boolean} - True if saved successfully.
     */
    saveReservation: function(reservation) {
        try {
            const reservations = this.getReservations() || [];
            reservation.id = Date.now().toString();
            reservation.createdAt = new Date().toISOString();
            reservations.push(reservation);
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservations));
            return true;
        } catch (error) {
            console.error('Error saving reservation:', error);
            return false;
        }
    },

    /**
     * Retrieve reservations from localStorage.
     * @returns {Array} - An array of retrieved reservations.
     */
    getReservations: function() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : [];
        } catch (error) {
            console.error('Error retrieving reservations:', error);
            return [];
        }
    },

    /**
     * Get a single reservation by ID.
     * @param {string} id - The reservation ID.
     * @returns {Object|null} - The reservation object or null if not found.
     */
    getReservation: function(id) {
        const reservations = this.getReservations();
        return reservations.find(r => r.id === id) || null;
    },

    /**
     * Update an existing reservation.
     * @param {string} id - The reservation ID.
     * @param {Object} updatedData - The updated reservation data.
     * @returns {boolean} - True if updated successfully.
     */
    updateReservation: function(id, updatedData) {
        try {
            const reservations = this.getReservations();
            const index = reservations.findIndex(r => r.id === id);
            if (index === -1) return false;
            
            reservations[index] = { ...reservations[index], ...updatedData, id };
            reservations[index].updatedAt = new Date().toISOString();
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(reservations));
            return true;
        } catch (error) {
            console.error('Error updating reservation:', error);
            return false;
        }
    },

    /**
     * Delete a reservation.
     * @param {string} id - The reservation ID.
     * @returns {boolean} - True if deleted successfully.
     */
    deleteReservation: function(id) {
        try {
            const reservations = this.getReservations();
            const filtered = reservations.filter(r => r.id !== id);
            if (filtered.length === reservations.length) return false;
            
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
            return true;
        } catch (error) {
            console.error('Error deleting reservation:', error);
            return false;
        }
    },

    /**
     * Clear all reservations.
     * @returns {boolean} - True if cleared successfully.
     */
    clearReservations: function() {
        try {
            localStorage.removeItem(this.STORAGE_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing reservations:', error);
            return false;
        }
    }
};

// Browser-compatible export
if (typeof window !== 'undefined') {
    window.Storage = Storage;
}