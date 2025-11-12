// calculator.js

/**
 * Calculates the total price of a hotel stay.
 * @param {number} nightlyRate - The rate per night.
 * @param {number} numberOfNights - The number of nights the guest will stay.
 * @returns {number} - The total cost for the stay.
 */
function calculateTotalPrice(nightlyRate, numberOfNights) {
    return nightlyRate * numberOfNights;
}

/**
 * Applies a discount to the total price.
 * @param {number} totalPrice - The total price before discount.
 * @param {number} discountPercent - Discount percentage to apply.
 * @returns {number} - The total price after discount.
 */
function applyDiscount(totalPrice, discountPercent) {
    return totalPrice * (1 - (discountPercent / 100));
}

/**
 * Calculates the tax on the total price.
 * @param {number} totalPrice - The total price before tax.
 * @param {number} taxPercent - Tax percentage to apply.
 * @returns {number} - The total price after tax.
 */
function calculateTax(totalPrice, taxPercent) {
    return totalPrice * (taxPercent / 100);
}

/**
 * Final calculation including total price, discount, and tax.
 * @param {number} nightlyRate - The rate per night.
 * @param {number} numberOfNights - The number of nights the guest will stay.
 * @param {number} discountPercent - Discount percentage to apply.
 * @param {number} taxPercent - Tax percentage to apply.
 * @returns {number} - The final total after applying discounts and adding tax.
 */
function calculateFinalAmount(nightlyRate, numberOfNights, discountPercent, taxPercent) {
    const totalPrice = calculateTotalPrice(nightlyRate, numberOfNights);
    const discountedPrice = applyDiscount(totalPrice, discountPercent);
    const tax = calculateTax(discountedPrice, taxPercent);
    return discountedPrice + tax;
}

// Exporting functions for external usage
module.exports = {
    calculateTotalPrice,
    applyDiscount,
    calculateTax,
    calculateFinalAmount
};