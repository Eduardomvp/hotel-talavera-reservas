import { assertEquals, assert } from "https://deno.land/std@0.106.0/testing/asserts.ts";

// Mock reservation functions for testing
class ReservationManager {
    constructor() {
        this.reservations = [];
    }

    createReservation(data) {
        if (!data.id || !data.guestName || !data.checkInDate) {
            return false;
        }
        this.reservations.push(data);
        return true;
    }

    getReservation(id) {
        return this.reservations.find(r => r.id === id) || null;
    }

    updateReservation(id, updatedData) {
        const reservation = this.getReservation(id);
        if (!reservation) return false;
        Object.assign(reservation, updatedData);
        return true;
    }

    deleteReservation(id) {
        const index = this.reservations.findIndex(r => r.id === id);
        if (index === -1) return false;
        this.reservations.splice(index, 1);
        return true;
    }

    getAllReservations() {
        return this.reservations;
    }
}

// Tests for Reservation Manager
Deno.test("should create a valid reservation", () => {
    const manager = new ReservationManager();
    const reservation = {
        id: 1,
        guestName: "Eduardo",
        checkInDate: "2025-12-01",
        checkOutDate: "2025-12-05"
    };
    const result = manager.createReservation(reservation);
    assertEquals(result, true);
});

Deno.test("should not create reservation with missing data", () => {
    const manager = new ReservationManager();
    const reservation = {
        id: 1,
        guestName: "",
        checkInDate: ""
    };
    const result = manager.createReservation(reservation);
    assertEquals(result, false);
});

Deno.test("should retrieve a reservation by id", () => {
    const manager = new ReservationManager();
    const reservation = {
        id: 1,
        guestName: "Eduardo",
        checkInDate: "2025-12-01"
    };
    manager.createReservation(reservation);
    const result = manager.getReservation(1);
    assertEquals(result?.guestName, "Eduardo");
});

Deno.test("should update a reservation", () => {
    const manager = new ReservationManager();
    const reservation = {
        id: 1,
        guestName: "Eduardo",
        checkInDate: "2025-12-01"
    };
    manager.createReservation(reservation);
    const updated = manager.updateReservation(1, { guestName: "Juan" });
    assertEquals(updated, true);
    assertEquals(manager.getReservation(1)?.guestName, "Juan");
});

Deno.test("should delete a reservation", () => {
    const manager = new ReservationManager();
    const reservation = {
        id: 1,
        guestName: "Eduardo",
        checkInDate: "2025-12-01"
    };
    manager.createReservation(reservation);
    const deleted = manager.deleteReservation(1);
    assertEquals(deleted, true);
    assertEquals(manager.getReservation(1), null);
});

Deno.test("should get all reservations", () => {
    const manager = new ReservationManager();
    manager.createReservation({ id: 1, guestName: "Eduardo", checkInDate: "2025-12-01" });
    manager.createReservation({ id: 2, guestName: "Juan", checkInDate: "2025-12-02" });
    const all = manager.getAllReservations();
    assertEquals(all.length, 2);
});
