import '../auth/user.js';
import { createComment, getPost } from '../fetch-utils.js';
import { renderComment } from '../render-utils.js';


const errorDisplay = document.getElementById('error-display');
const postTitle = document.getElementById('post-title');
const postImage = document.getElementById('post-image');
const postBody = document.getElementById('post-body');
const commentList = document.getElementById('comment-list');
const addCommentForm = document.getElementById('add-comment-form');

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
    }
    if (!post) {
        location.assign('../');
    } else {
        displayPost();
        displayComments();
    }
});

addCommentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(addCommentForm);
    const commentAdd = {
        post_id: post.id,
        text: formData.get('text'),
    };

    const response = await createComment(commentAdd);
    error = response.error;
    const comment = response.data;

    if (error) {
        displayError();
    } else {
        addCommentForm.reset();
        post.comments.unshift(comment);
        displayComments();
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

function displayPost() {
    postTitle.textContent = post.title;
    postBody.textContent = post.body;
    postImage.src = post.image;
    postImage.alt = `${post.title} image`;
}

function displayComments() {
    commentList.innerHTML = '';

    for (const comment of post.comments) {
        const commentEl = renderComment(comment);
        commentList.append(commentEl);
    }
}