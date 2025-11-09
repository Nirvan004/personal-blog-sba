let posts = [];

const postForm = document.getElementById('postForm');
const postTitle = document.getElementById('postTitle');
const postContent = document.getElementById('postContent');
const titleError = document.getElementById('titleError');
const contentError = document.getElementById('contentError');
const postsList = document.getElementById('postsList');


document.addEventListener('DOMContentLoaded', () => {
  const storedPosts = localStorage.getItem('blogPosts');

  if (storedPosts) {
    posts = JSON.parse(storedPosts);
    renderPosts();
  }
});