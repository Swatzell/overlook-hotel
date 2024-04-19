
function getBookingsForCustomer(customerId, bookings) {
  return bookings.filter(booking => booking.userID === customerId);
}


function calculateTotalSpent(userId, rooms, bookings) {
  const userBookings = bookings.filter(booking => booking.userID === userId);

  const roomNumbers = userBookings.map(booking => booking.roomNumber);

  const userRooms = rooms.filter(room => roomNumbers.includes(room.number));

  const totalSpent = userRooms.reduce((total, room) => {
    userBookings.find(booking => booking.roomNumber === room.number);
    return total + room.costPerNight;
  }, 0);

  return totalSpent;
}


function filterRoomsByType(roomType, rooms) {
  return rooms.filter(room => room.roomType === roomType);
}

module.exports = {
  getBookingsForCustomer,
  calculateTotalSpent,
  filterRoomsByType,
  
};