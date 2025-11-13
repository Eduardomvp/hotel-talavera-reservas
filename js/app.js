// Main application logic for Hotel Talavera Reservation System

const ReservationApp = {
    currentEditId: null,

    /**
     * Initialize the reservation system
     */
    init: function() {
        console.log('Initializing Hotel Talavera Reservation System...');
        this.displayReservations();
        this.setupEventListeners();
    },

    /**
     * Setup event listeners
     */
    setupEventListeners: function() {
        // Search functionality
        const searchInput = document.getElementById('searchReservations');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterReservations(e.target.value);
            });
        }

        // Clear all button
        const clearAllBtn = document.getElementById('clearAllReservations');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete all reservations?')) {
                    window.Storage.clearReservations();
                    this.displayReservations();
                }
            });
        }
    },

    /**
     * Display all reservations
     */
    displayReservations: function() {
        const container = document.getElementById('reservationsList');
        if (!container) return;

        const reservations = window.Storage.getReservations();
        
        if (reservations.length === 0) {
            container.innerHTML = '<p class="no-reservations">No reservations found. Create your first reservation above!</p>';
            return;
        }

        container.innerHTML = reservations.map(reservation => 
            this.createReservationCard(reservation)
        ).join('');

        // Attach event listeners to buttons
        this.attachCardEventListeners();
    },

    /**
     * Create HTML for a reservation card
     */
    createReservationCard: function(reservation) {
        const roomTypeLabels = {
            single: 'Single Room',
            double: 'Double Room',
            suite: 'Suite',
            deluxe: 'Deluxe Suite'
        };

        return `
            <div class="reservation-card" data-id="${reservation.id}">
                <div class="reservation-header">
                    <h3>${this.escapeHtml(reservation.name)}</h3>
                    <div class="reservation-actions">
                        <button class="btn btn-edit" data-id="${reservation.id}">Edit</button>
                        <button class="btn btn-delete" data-id="${reservation.id}">Delete</button>
                    </div>
                </div>
                <div class="reservation-details">
                    <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span class="detail-value">${this.escapeHtml(reservation.email)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span class="detail-value">${this.escapeHtml(reservation.phone)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-in:</span>
                        <span class="detail-value">${this.formatDate(reservation.checkIn)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Check-out:</span>
                        <span class="detail-value">${this.formatDate(reservation.checkOut)}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Room Type:</span>
                        <span class="detail-value">${roomTypeLabels[reservation.roomType] || reservation.roomType}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Guests:</span>
                        <span class="detail-value">${reservation.guests}</span>
                    </div>
                    <div class="detail-row">
                        <span class="detail-label">Created:</span>
                        <span class="detail-value detail-date">${this.formatDateTime(reservation.createdAt)}</span>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * Attach event listeners to card buttons
     */
    attachCardEventListeners: function() {
        // Edit buttons
        document.querySelectorAll('.btn-edit').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.editReservation(id);
            });
        });

        // Delete buttons
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                this.deleteReservation(id);
            });
        });
    },

    /**
     * Edit a reservation
     */
    editReservation: function(id) {
        const reservation = window.Storage.getReservation(id);
        if (!reservation) {
            alert('Reservation not found');
            return;
        }

        // Populate form with reservation data
        document.getElementById('name').value = reservation.name;
        document.getElementById('email').value = reservation.email;
        document.getElementById('phone').value = reservation.phone;
        document.getElementById('checkIn').value = reservation.checkIn;
        document.getElementById('checkOut').value = reservation.checkOut;
        document.getElementById('roomType').value = reservation.roomType;
        document.getElementById('guests').value = reservation.guests;

        this.currentEditId = id;

        // Update form to show we're editing
        const submitBtn = document.querySelector('#reservationForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Update Reservation';
        }

        // Add cancel button if not exists
        let cancelBtn = document.getElementById('cancelEdit');
        if (!cancelBtn) {
            cancelBtn = document.createElement('button');
            cancelBtn.id = 'cancelEdit';
            cancelBtn.type = 'button';
            cancelBtn.className = 'btn btn-secondary';
            cancelBtn.textContent = 'Cancel';
            cancelBtn.addEventListener('click', () => this.cancelEdit());
            submitBtn.parentNode.insertBefore(cancelBtn, submitBtn.nextSibling);
        }

        // Scroll to form
        document.getElementById('reservationForm').scrollIntoView({ behavior: 'smooth' });

        // Override form submission
        const form = document.getElementById('reservationForm');
        form.onsubmit = (e) => this.handleEditSubmit(e);
    },

    /**
     * Handle edit form submission
     */
    handleEditSubmit: function(event) {
        event.preventDefault();
        
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            checkIn: document.getElementById('checkIn').value,
            checkOut: document.getElementById('checkOut').value,
            roomType: document.getElementById('roomType').value,
            guests: document.getElementById('guests').value
        };

        const validation = window.Validation.validateFormData(formData);
        
        if (!validation.isValid) {
            alert('Please fix the errors in the form');
            return;
        }

        const updated = window.Storage.updateReservation(this.currentEditId, formData);
        
        if (updated) {
            alert('Reservation updated successfully!');
            this.cancelEdit();
            this.displayReservations();
        } else {
            alert('Error updating reservation. Please try again.');
        }
    },

    /**
     * Cancel edit mode
     */
    cancelEdit: function() {
        this.currentEditId = null;
        document.getElementById('reservationForm').reset();
        
        const submitBtn = document.querySelector('#reservationForm button[type="submit"]');
        if (submitBtn) {
            submitBtn.textContent = 'Create Reservation';
        }

        const cancelBtn = document.getElementById('cancelEdit');
        if (cancelBtn) {
            cancelBtn.remove();
        }

        // Restore original form handler
        const form = document.getElementById('reservationForm');
        form.onsubmit = null;
    },

    /**
     * Delete a reservation
     */
    deleteReservation: function(id) {
        if (!confirm('Are you sure you want to delete this reservation?')) {
            return;
        }

        const deleted = window.Storage.deleteReservation(id);
        
        if (deleted) {
            this.displayReservations();
        } else {
            alert('Error deleting reservation. Please try again.');
        }
    },

    /**
     * Filter reservations by search term
     */
    filterReservations: function(searchTerm) {
        const term = searchTerm.toLowerCase();
        const cards = document.querySelectorAll('.reservation-card');
        
        cards.forEach(card => {
            const text = card.textContent.toLowerCase();
            if (text.includes(term)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    },

    /**
     * Format date for display
     */
    formatDate: function(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    },

    /**
     * Format date and time for display
     */
    formatDateTime: function(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    },

    /**
     * Escape HTML to prevent XSS
     */
    escapeHtml: function(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
};

// Export to window for browser usage
if (typeof window !== 'undefined') {
    window.ReservationApp = ReservationApp;
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => ReservationApp.init());
} else {
    ReservationApp.init();
}