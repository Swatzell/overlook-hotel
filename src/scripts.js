// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import "./css/styles.scss";

import {
  getAllCustomers,
//   getCustomerById,
  getAllRooms,
  getAllBookings,
  addBooking,
//   deleteBookingById,
} from "./apiCalls.js";

console.log("This is the JavaScript entry file - your code begins here.");
const loginPage = document.querySelector(".login-page");
const userBookingPage = document.querySelector(".user-booking-page");
const loginButton = document.querySelector(".login-button");
const submitBookingButton = document.querySelector(".booking-submit");
const availableRoomsPage = document.querySelector(".available-rooms");

let customers = [];
let bookings = [];
let rooms = [];
let userBookings = [];
let totalAmountSpent = 0;

function initialize() {
  Promise.all([getAllCustomers(), getAllRooms(), getAllBookings()])
    .then(([allCustomers, allRooms, allBookings]) => {
      console.log("Fetched customers:", allCustomers);
      console.log("Fetched rooms:", allRooms);
      console.log("Fetched bookings:", allBookings);

      customers = allCustomers;
      rooms = allRooms;
      bookings = allBookings;

      console.log("All customers:", customers);
      console.log("All rooms:", rooms);
      console.log("All bookings:", bookings);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

addEventListener("load", function () {
  setTimeout(() => {
    initialize();
  }, 1500);
});

document.getElementById("roomTypeFilter").addEventListener("change", function() {
    const selectedRoomType = this.value;
    const checkinDate = document.getElementById("checkin").value;
    handleBookingSubmission(checkinDate, selectedRoomType);
  });

loginButton.addEventListener("click", function () {
  const username = document.querySelector('input[name="uname"]').value;
  const userIdMatch = username.match(/^customer(\d+)$/);

  if (userIdMatch) {
    const userId = parseInt(userIdMatch[1], 10);
    handleLogin(userId);
  } else {
    alert('Invalid username format. Please use the format "customer<ID>".');
  }
});

document.querySelector(".available-rooms").addEventListener("click", function (event) {
    if (event.target.classList.contains("book-room")) {
      const roomNumber = parseInt(
        event.target.getAttribute("data-room-number")
      );
      const checkinDate = event.target.getAttribute("data-checkin-date");
      if (confirm(`Do you want to book Room ${roomNumber}?`)) {
        bookRoom(roomNumber, checkinDate);
      }
    }
  });

submitBookingButton.addEventListener("click", function () {
  console.log("Submit booking button clicked");

  userBookingPage.classList.add("hidden");
  availableRoomsPage.classList.remove("hidden");
const checkinDate = document.getElementById("checkin").value;
  handleBookingSubmission(checkinDate);
});

document.querySelector(".overlook").addEventListener("click", function () {
  loginPage.classList.remove("hidden"), userBookingPage.classList.add("hidden");
});


function displayBookingsAndTotalAmount() {
  const bookingsContainer = document.querySelector(".all-bookings");
  const totalMoneySpentContainer = document.querySelector(".total-money-spent");

  const username = document.querySelector('input[name="uname"]').value;
  const userIdMatch = username.match(/^customer(\d+)$/);

  if (userIdMatch) {
    const userId = parseInt(userIdMatch[1], 10);

    const filteredBookings = userBookings.filter(
      (booking) => booking.userID === userId
    );

    const totalAmountSpent = filteredBookings.reduce((total, booking) => {
      const room = rooms.find((room) => room.number === booking.roomNumber);
      return total + room.costPerNight;
    }, 0);

    bookingsContainer.innerHTML = `
            <h1>Your Past/Present Bookings:</h1>
            <ul>
                ${filteredBookings
                  .map(
                    (booking) =>
                      `<li>${booking.date}: Room ${booking.roomNumber}</li>`
                  )
                  .join("")}
            </ul>`;

    totalMoneySpentContainer.innerHTML = `<h1>Your Total Money Spent With Us: $${totalAmountSpent.toFixed(
      2
    )}</h1>`;
  } else {
    displayBookingInfo("Invalid username format. Please login again.");
  }
}

function handleLogin(userId) {
  const username = document.querySelector('input[name="uname"]').value;
  const password = document.querySelector('input[name="psw"]').value;

  if (username === `customer${userId}` && password === "overlook2021") {
    document.querySelector(".login-page").classList.add("hidden");
    document.querySelector(".user-booking-page").classList.remove("hidden");

    userBookings = bookings.filter((booking) => booking.userID === userId);

    totalAmountSpent = userBookings.reduce((total, booking) => {
      const room = rooms.find((room) => room.number === booking.roomNumber);
      return total + room.costPerNight;
    }, 0);

    displayBookingsAndTotalAmount();
  } else {
    displayBookingInfo("Invalid username or password");
  }
}


function displayAvailableRooms(availableRooms, checkinDate) {
    const availableRoomsContainer = document.querySelector(".available-rooms-list");
    const roomsList = availableRooms
      .map(
        (room) => `
          <li>
              Room ${room.number}: ${
          room.roomType
        } - $${room.costPerNight.toFixed(2)}
              <button class="book-room" data-room-number="${
                room.number
              }" data-checkin-date="${checkinDate}">Book</button>
          </li>
      `
      )
      .join("");
    availableRoomsContainer.innerHTML = roomsList;
  

    const backButton = document.querySelector(".back-to-booking");
    backButton.addEventListener("click", function () {
      availableRoomsContainer.parentElement.classList.add("hidden");
      userBookingPage.classList.remove("hidden");
    });
  }

  function handleBookingSubmission(checkinDate, selectedRoomType = "all") {
    
  
    const formattedCheckinDate = formatCheckinDate(checkinDate);
   
  
    const bookedRoomsOnCheckinDate = bookings
      .filter((booking) => booking.date === formattedCheckinDate)
      .map((booking) => booking.roomNumber);
    console.log("Booked Rooms on Checkin Date:", bookedRoomsOnCheckinDate);
  
   
    let availableRooms = [...rooms];
    console.log("All Rooms:", availableRooms);
  
   
    availableRooms = availableRooms.filter(
      (room) => !bookedRoomsOnCheckinDate.includes(room.number)
    );

  
    if (selectedRoomType !== "all") {
      availableRooms = availableRooms.filter(
        (room) => room.roomType === selectedRoomType
      );
      
    }
  
    displayAvailableRooms(availableRooms, checkinDate);
  }

 
function bookRoom(roomNumber) {
    console.log("Book room button clicked");
  
    const userInfo = getUserInfo();
    if (userInfo) {
      const { userId, formattedCheckinDate } = userInfo;
  
      addNewBooking({ userId, formattedCheckinDate, roomNumber })
        .then((response) => {
          console.log(response);
  
          if (
            response.message &&
            response.message.includes("successfully posted")
          ) {
            showBookingSuccess(roomNumber);
          } else {
            handleBookingError("Failed to book the room. Please try again.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          handleBookingError(
            "An error occurred while booking the room. Please try again."
          );
        });
    } else {
      displayBookingInfo("Invalid username format. Please login again.");
    }
  }


function addNewBooking({ userId, formattedCheckinDate, roomNumber }) {
  const newBooking = { userID: userId, date: formattedCheckinDate, roomNumber };
  userBookings.push(newBooking);
  return addBooking(newBooking);
}


function updateTotalAmountSpent() {
  totalAmountSpent = userBookings.reduce((total, booking) => {
    const room = rooms.find((room) => room.number === booking.roomNumber);
    return total + room.costPerNight;
  }, 0);
}


function showBookingSuccess(roomNumber) {
  displayBookingInfo(`Room ${roomNumber} booked successfully!`);
  updateTotalAmountSpent();
  displayBookingsAndTotalAmount();

  const availableRoomsPage = document.querySelector(".available-rooms");
  const userBookingPage = document.querySelector(".user-booking-page");
  availableRoomsPage.classList.add("hidden");
  userBookingPage.classList.remove("hidden");
}


function getUserInfo() {
  const username = document.querySelector('input[name="uname"]').value;
  const userIdMatch = username.match(/^customer(\d+)$/);

  if (userIdMatch) {
    const userId = parseInt(userIdMatch[1], 10);
    const checkinDate = document.getElementById("checkin").value;
    const formattedCheckinDate = formatCheckinDate(checkinDate);
    return { userId, formattedCheckinDate };
  } else {
    return null;
  }
}

function formatCheckinDate(checkinDate) {
    const dateObj = new Date(checkinDate);
    return `${dateObj.getFullYear()}/${String(dateObj.getMonth() + 1).padStart(2, "0")}/${String(dateObj.getDate()).padStart(2, "0")}`;
  }

function displayBookingInfo(message) {
  const bookingInfoSection = document.querySelector(".booking-info");
  const bookingMessage = bookingInfoSection.querySelector(".booking-message");
  bookingMessage.textContent = message;

  const backButton = bookingInfoSection.querySelector(".back-to-booking");
  if (backButton) {
    backButton.remove();
  }

  bookingInfoSection.classList.remove("hidden");
}
function handleBookingError(message) {
  displayBookingInfo(message);
}
