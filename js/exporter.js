// js/exporter.js

// Function to export reservation details to PDF
function exportToPDF(reservationData) {
    // Implement PDF export logic here
    console.log('Exporting to PDF', reservationData);
}

// Function to export reservation details to PNG
function exportToPNG(reservationData) {
    // Implement PNG export logic here
    console.log('Exporting to PNG', reservationData);
}

// Function to share reservation details via WhatsApp
function shareOnWhatsApp(reservationData) {
    const message = encodeURIComponent(`Check out my reservation: ${JSON.stringify(reservationData)}`);
    const url = `https://wa.me/?text=${message}`;
    window.open(url, '_blank');
}

module.exports = { exportToPDF, exportToPNG, shareOnWhatsApp };