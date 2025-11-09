let posts = [];
let editIndex = null;
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

function renderPosts() {
  postsList.innerHTML = '';

  posts.forEach((post, index) => {
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');

    const postTitleEl = document.createElement('h3');
    postTitleEl.textContent = post.title;

    const postContentEl = document.createElement('p');
    postContentEl.textContent = post.content;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.classList.add('edit');
    editBtn.addEventListener('click', () => {
      postTitle.value = post.title;
      postContent.value = post.content;
      editIndex = index;
      postForm.querySelector('button[type="submit"]').textContent = 'Update Post';
    });

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.classList.add('delete');
    deleteBtn.addEventListener('click', () => {
      posts.splice(index, 1);
      localStorage.setItem('blogPosts', JSON.stringify(posts));
      renderPosts();
    });

    postDiv.appendChild(postTitleEl);
    postDiv.appendChild(postContentEl);
    postDiv.appendChild(editBtn);
    postDiv.appendChild(deleteBtn);

    postsList.appendChild(postDiv);
  });
}

postForm.addEventListener('submit', function(event) {
    event.preventDefault();

    titleError.textContent = '';
    contentError.textContent = '';

    let isValid = true;

    if (postTitle.value.trim() === '') {
        titleError.textContent = 'Title is required.';
        isValid = false;
    }

    if (postContent.value.trim() === '') {
        contentError.textContent = 'Content is required.';
        isValid = false;
    }

    if (!isValid) return;

    if (editIndex !== null) {
        posts[editIndex].title = postTitle.value.trim();
        posts[editIndex].content = postContent.value.trim();

        editIndex = null;
        postForm.querySelector('button[type="submit"]').textContent = 'Add Post';
    } 
    else {
        const newPost = {title: postTitle.value.trim(),content: postContent.value.trim()};
        posts.push(newPost);
    }

    localStorage.setItem('blogPosts', JSON.stringify(posts));

    renderPosts();

    postForm.reset();
});
