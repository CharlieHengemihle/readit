import '../auth/user.js';
import { getPost } from '../fetch-utils.js';



const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postBody = document.getElementById('post-body');

let error = null;
let post = null;

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    
    const response = await getPost(id);
    error = response.error;
    post = response.data;
    
    if (error) {
        displayError();
    } else {
        displayPost();
    }
})

function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        // console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPost() {
    postTitle.textContent = post.title;
    postBody.textContent= post.body;
    postImage.src = post.image;
    postImage.alt = `${post.title} image`;
}