import chai from "chai";
const expect = chai.expect;

const { getBookingsForCustomer, calculateTotalSpent,filterRoomsByType, } = require("./JS-TDD.js");

const customers = require("./mock-customer-data.js");
const rooms = require("./mock-room-data.js");
const bookings = require("./mock-booking-data.js");

describe('user bookings', () => {
  it('should display any room bookings a customer has made (past or upcoming)', () => {
    const customerId = 1;
    const customerBookings = getBookingsForCustomer(customerId, bookings);
    
    expect(customerBookings).to.be.an('array');
    expect(customerBookings).to.have.lengthOf(2);
    expect(customerBookings[0].roomNumber).to.equal(12);
    expect(customerBookings[1].roomNumber).to.equal(15);
  });

  it('should calculate the total spent by a user', () => {
    const userId = 1;
    const expectedTotal = 849.54;

    const totalSpent = calculateTotalSpent(userId, rooms, bookings);
    expect(totalSpent).to.equal(expectedTotal);
  })
})


describe('filterRoomsByType', () => {
  it('should filter rooms by roomType', () => {
    const availableRooms = [rooms[0], rooms[1], rooms[2]];
    const filteredRooms = filterRoomsByType('suite', availableRooms);
    expect(filteredRooms).to.be.an('array').that.includes(rooms[1]);
    expect(filteredRooms).to.not.include(rooms[0]);
    expect(filteredRooms).to.not.include(rooms[2]);
  });
});
