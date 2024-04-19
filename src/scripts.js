// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.scss';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'


console.log('This is the JavaScript entry file - your code begins here.');
const loginPage = document.querySelector('.login-page');
const userBookingPage = document.querySelector('.user-booking-page');
const loginButton = document.querySelector('.login-button');
const submitBookingButton = document.querySelector('.booking-submit')
const availableRoomsPage = document.querySelector('.available-rooms')


loginButton.addEventListener("click", function() {
    loginPage.classList.add('hidden'),
    userBookingPage.classList.remove('hidden')
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