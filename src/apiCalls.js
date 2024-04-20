
export function getAllCustomers() {
    return fetch('http://localhost:3001/api/v1/customers')
      .then(response => response.json())
      .then(data => data.customers)
      .catch(error => {
        console.error('Error fetching all customers:', error);
        throw error;
      });
  }
  
 export function getCustomerById(id) {
    return fetch(`http://localhost:3001/api/v1/customers/${id}`)
      .then(response => response.json())
      .catch(error => {
        console.error(`Error fetching customer with ID ${id}:`, error);
        throw error;
      });
  }
  
 
  export function getAllRooms() {
    return fetch('http://localhost:3001/api/v1/rooms')
      .then(response => response.json())
      .then(data => data.rooms)
      .catch(error => {
        console.error('Error fetching all rooms:', error);
        throw error;
      });
  }
  

  export function getAllBookings() {
    return fetch('http://localhost:3001/api/v1/bookings')
      .then(response => response.json())
      .then(data => data.bookings)
      .catch(error => {
        console.error('Error fetching all bookings:', error);
        throw error;
      });
  }
  
 
  export function addBooking(bookingData) {
    return fetch('http://localhost:3001/api/v1/bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })
    .then(response => response.json())
    .catch(error => {
      console.error('Error adding new booking:', error);
      throw error;
    });
  }
  
 
  export function deleteBookingById(id) {
    return fetch(`http://localhost:3001/api/v1/bookings/${id}`, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .catch(error => {
      console.error(`Error deleting booking with ID ${id}:`, error);
      throw error;
    });
  }