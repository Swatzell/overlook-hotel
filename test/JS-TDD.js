const customers = require("./mock-customer-data.js");
const rooms = require("./mock-room-data.js");
const bookings = require("./mock-booking-data.js");


function getBookingsForCustomer(customerId, bookings) {
  return bookings.filter(booking => booking.userID === customerId);
}


function calculateTotalSpent(userId, bookings) {
  let totalSpent = 0;

  const userBookings = bookings.filter(booking => booking.userID === userId);

  userBookings.forEach(booking => {
    const room = rooms.find(room => room.number === booking.roomNumber);
    if (room) {
      totalSpent += room.costPerNight;
    }
  });

  return totalSpent;
}
function filterRoomsByType(roomType, rooms) {
  return rooms.filter(room => room.roomType === roomType);
}


function displayBookingsAndTotalAmount(userBookings, totalAmountSpent) {
  let bookingsHTML = '<div>Your Past/Present Bookings:</div>';
  let totalMoneySpentHTML = `<div>Your Total Money Spent With Us: $${totalAmountSpent.toFixed(2)}</div>`;

  userBookings.forEach(booking => {
    const room = rooms.find(room => room.number === booking.roomNumber);
    if (room) {
      bookingsHTML += `<div>Room Number: ${booking.roomNumber}, Date: ${booking.date}, Room Type: ${room.roomType}</div>`;
    }
  });

  return { bookingsHTML, totalMoneySpentHTML };
}

function handleLogin(username, password, userId, bookings, rooms) {
  if (username === `customer${userId}` && password === 'overlook2021') {
      const userBookings = bookings.filter(booking => booking.userID === userId);
      const totalAmountSpent = userBookings.reduce((total, booking) => {
          const room = rooms.find(room => room.number === booking.roomNumber);
          return total + room.costPerNight;
      }, 0);
      
      const { bookingsHTML, totalMoneySpentHTML } = displayBookingsAndTotalAmount(userBookings, totalAmountSpent);
      
      return { loginStatus: 'success', bookingsHTML, totalMoneySpentHTML };
  } else {
      return { loginStatus: 'failure', errorMessage: 'Invalid username or password' };
  }
}
module.exports = {
  getBookingsForCustomer,
  calculateTotalSpent,
  filterRoomsByType,
  displayBookingsAndTotalAmount,
  handleLogin
};