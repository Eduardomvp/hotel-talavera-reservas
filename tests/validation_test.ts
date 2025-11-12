import { assertEquals } from "https://deno.land/std@0.106.0/testing/asserts.ts";

// Sample validation function
function validateBooking(booking) {
    if (!booking.name || !booking.date) {
        return false;
    }
    return true;
}

Deno.test("valid booking should return true", () => {
    const booking = { name: "Eduardo", date: "2025-12-01" };
    const result = validateBooking(booking);
    assertEquals(result, true);
});

Deno.test("invalid booking should return false", () => {
    const booking = { name: "", date: "" };
    const result = validateBooking(booking);
    assertEquals(result, false);
});

Deno.test("booking with missing name should return false", () => {
    const booking = { name: "", date: "2025-12-01" };
    const result = validateBooking(booking);
    assertEquals(result, false);
});

Deno.test("booking with missing date should return false", () => {
    const booking = { name: "Eduardo", date: "" };
    const result = validateBooking(booking);
    assertEquals(result, false);
});
