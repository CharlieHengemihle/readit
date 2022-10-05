import '../auth/user.js';
import { createPost, uploadImage } from '../fetch-utils.js';

const postForm = document.getElementById('post-form');
const errorDispaly = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');

let error = null;

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
    } else {
        preview.src = '../assets/placeholder.jpg';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(postForm);

    const imageFile = formData.get('image');
    const randomFolder = Math.floor(Date.now() * Math.random());
    const imagePath = `readit/${randomFolder}/${imageFile.name}`;
    const url = await uploadImage('bucket1', imagePath, imageFile);

    const post = {
        title: formData.get('title'),
        body: formData.get('body'),
        image: url,
    };

    const response = await createPost(post);
    error = response.error;

    if (error) {
        displayError();
    } else {
        location.assign('/');
    }
});


function displayError() {
    if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}