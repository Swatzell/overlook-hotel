import chai from "chai";
const expect = chai.expect;

const { getBookingsForCustomer, calculateTotalSpent,filterRoomsByType,displayBookingsAndTotalAmount,handleLogin } = require("./JS-TDD.js");

const customers = require("./mock-customer-data.js");
const rooms = require("./mock-room-data.js");
const bookings = require("./mock-booking-data.js");



describe('filterRoomsByType', () => {
  it('should filter rooms by roomType', () => {
    const availableRooms = [rooms[0], rooms[1], rooms[2]];
    const filteredRooms = filterRoomsByType('suite', availableRooms);
    expect(filteredRooms).to.be.an('array').that.includes(rooms[1]);
    expect(filteredRooms).to.not.include(rooms[0]);
    expect(filteredRooms).to.not.include(rooms[2]);
  });
});


describe('user bookings and displayBookingsAndTotalAmount', () => {
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

    const totalSpent = calculateTotalSpent(userId, bookings);
    expect(totalSpent).to.equal(expectedTotal);
  });

  it('should return bookings and total amount HTML strings', () => {
    const userId = 1;
    const userBookings = getBookingsForCustomer(userId, bookings);
    const totalAmountSpent = calculateTotalSpent(userId, bookings);

    const { bookingsHTML, totalMoneySpentHTML } = displayBookingsAndTotalAmount(userBookings, totalAmountSpent);

    expect(bookingsHTML).to.include('Your Past/Present Bookings');
    expect(bookingsHTML).to.include('Room Number: 12, Date: 2022/02/05, Room Type: residential suite');
    expect(bookingsHTML).to.include('Room Number: 15, Date: 2022/04/22, Room Type: single room');

    expect(totalMoneySpentHTML).to.include('Your Total Money Spent With Us');
    expect(totalMoneySpentHTML).to.include('$849.54');
  });
});

  describe('handleLogin', () => {
    it('should log in with correct credentials', () => {
      const userId = 1;
      const username = 'customer1';
      const password = 'overlook2021';

      const { loginStatus, bookingsHTML, totalMoneySpentHTML } = handleLogin(username, password, userId, bookings, rooms);

      expect(loginStatus).to.equal('success');
      expect(bookingsHTML).to.include('Your Past/Present Bookings');
      expect(totalMoneySpentHTML).to.include('Your Total Money Spent With Us');
    });

    it('should reject invalid credentials', () => {
      const userId = 1;
      const username = 'customer1';
      const password = 'wrongpassword';

      const { loginStatus, errorMessage } = handleLogin(username, password, userId, bookings, rooms);

      expect(loginStatus).to.equal('failure');
      expect(errorMessage).to.equal('Invalid username or password');
    });
  });
