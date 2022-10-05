/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';

/* Get DOM Elements */
const postList = document.getElementById('posts');
const errorDisplay = document.getElementById('error-display');
/* State */
let error = null;
let posts = [];
/* Events */
window.addEventListener('load', async () => {

})



/* Display Functions */

function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}