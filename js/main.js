// main.js
// Entry point for the Hotel Talavera Reservas application

function init() {
    console.log('Initializing Hotel Talavera Reservas application...');
    
    const form = document.getElementById('reservationForm');
    if (!form) {
        console.error('Reservation form not found');
        return;
    }

    // Set minimum date to today for date inputs
    const today = new Date().toISOString().split('T')[0];
    const checkInInput = document.getElementById('checkIn');
    const checkOutInput = document.getElementById('checkOut');
    
    if (checkInInput) checkInInput.setAttribute('min', today);
    if (checkOutInput) checkOutInput.setAttribute('min', today);

    // Update check-out min date when check-in changes
    if (checkInInput && checkOutInput) {
        checkInInput.addEventListener('change', function() {
            const checkInDate = new Date(this.value);
            checkInDate.setDate(checkInDate.getDate() + 1);
            checkOutInput.setAttribute('min', checkInDate.toISOString().split('T')[0]);
        });
    }

    form.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Clear previous error messages
    clearErrorMessages();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        checkIn: document.getElementById('checkIn').value,
        checkOut: document.getElementById('checkOut').value,
        roomType: document.getElementById('roomType').value,
        guests: document.getElementById('guests').value
    };

    // Validate form data
    const validation = window.Validation.validateFormData(formData);
    
    if (!validation.isValid) {
        displayErrors(validation.errors);
        return;
    }

    // Save to localStorage
    const saved = window.Storage.saveReservation(formData);
    
    if (saved) {
        showMessage('Reservation created successfully!', 'success');
        document.getElementById('reservationForm').reset();
        
        // Trigger reservation list update if app.js is loaded
        if (typeof window.ReservationApp !== 'undefined' && window.ReservationApp.displayReservations) {
            window.ReservationApp.displayReservations();
        }
    } else {
        showMessage('Error saving reservation. Please try again.', 'error');
    }
}

function clearErrorMessages() {
    const errorElements = document.querySelectorAll('.error-message');
    errorElements.forEach(el => el.remove());
    
    const inputs = document.querySelectorAll('.error');
    inputs.forEach(input => input.classList.remove('error'));
}

function displayErrors(errors) {
    Object.keys(errors).forEach(field => {
        let inputElement;
        
        if (field === 'dates') {
            inputElement = document.getElementById('checkIn');
        } else {
            inputElement = document.getElementById(field);
        }
        
        if (inputElement) {
            inputElement.classList.add('error');
            
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = errors[field];
            
            inputElement.parentNode.insertBefore(errorDiv, inputElement.nextSibling);
        }
    });
    
    showMessage('Please fix the errors in the form', 'error');
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMsg = document.querySelector('.message');
    if (existingMsg) existingMsg.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message-${type}`;
    messageDiv.textContent = message;
    
    const form = document.getElementById('reservationForm');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove success messages after 3 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 3000);
    }
}

// Invoke the init function when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}