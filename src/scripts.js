// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';

import {
    getAllCustomers,
    getCustomerById,
    getAllRooms,
    getAllBookings,
    addBooking,
    deleteBookingById,
  } from './apiCalls.js';
  

console.log('This is the JavaScript entry file - your code begins here.');
const loginPage = document.querySelector('.login-page');
const userBookingPage = document.querySelector('.user-booking-page');
const loginButton = document.querySelector('.login-button');
const submitBookingButton = document.querySelector('.booking-submit')
const availableRoomsPage = document.querySelector('.available-rooms')






let customers = [];
let bookings = [];
let rooms = [];
let userBookings = [];
let totalAmountSpent = 0;

function initialize() {
Promise.all([
    getAllCustomers(),
    getAllRooms(),
    getAllBookings(),
  ])
  .then(([allCustomers, allRooms, allBookings]) => {
    customers = allCustomers;
    rooms = allRooms;
    bookings = allBookings;
  
    console.log('All customers:', customers);
    console.log('All rooms:', rooms);
    console.log('All bookings:', bookings);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
}

addEventListener("load", function () {
    setTimeout(() => {
      initialize();
    }, 1500);
  });

loginButton.addEventListener("click", function() {
    loginPage.classList.add('hidden'),
    userBookingPage.classList.remove('hidden'),
    handleLogin()
})


submitBookingButton.addEventListener("click", function() {
    userBookingPage.classList.add('hidden'),
    availableRoomsPage.classList.remove('hidden')
})

document.querySelector('.overlook').addEventListener('click', function() {
    loginPage.classList.remove('hidden'),
    userBookingPage.classList.add('hidden')
 });
 
 document.querySelector('.overlook-booking').addEventListener('click', function() {
    availableRoomsPage.classList.add('hidden'),
    userBookingPage.classList.remove('hidden')
 });


 function displayBookingsAndTotalAmount() {
    const bookingsContainer = document.querySelector('.all-bookings');
    const totalMoneySpentContainer = document.querySelector('.total-money-spent');
  
    bookingsContainer.innerHTML = `<h1>Your Past/Present Bookings:</h1><ul>${userBookings.map(booking => `<li>${booking.date}: Room ${booking.roomNumber}</li>`).join('')}</ul>`;
    totalMoneySpentContainer.innerHTML = `<h1>Your Total Money Spent With Us: $${totalAmountSpent.toFixed(2)}</h1>`;
  }

  function handleLogin() {
    const username = document.querySelector('input[name="uname"]').value;
    const password = document.querySelector('input[name="psw"]').value;
  
    if (username === 'customer50' && password === 'overlook2021') {
      document.querySelector('.login-page').classList.add('hidden');
      document.querySelector('.user-booking-page').classList.remove('hidden');

      userBookings = bookings.filter(booking => booking.userID === 1);
  
      totalAmountSpent = userBookings.reduce((total, booking) => {
        const room = rooms.find(room => room.number === booking.roomNumber);
        return total + room.costPerNight;
      }, 0);
  
    
      displayBookingsAndTotalAmount();
    } else {
      alert('Invalid username or password');
    }
  }
  