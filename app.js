// Part 1: Fetch user details and build profile page
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json())
  .then(user => {
    const profilePicture = document.getElementById('profilePicture');
    const userName = document.getElementById('userName');

    profilePicture.src = 'path_to_profile_image'; // Set the profile picture image source here
    userName.textContent = user.name;
  })
  .catch(error => console.log(error));

// Part 2: Fetch user's posts/tweets
fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
  .then(response => response.json())
  .then(posts => {
    const postsContainer = document.getElementById('posts');

    posts.forEach(post => {
      const postElement = document.createElement('div');
      postElement.classList.add('post');

      const postTitle = document.createElement('h3');
      postTitle.classList.add('post-title');
      postTitle.textContent = post.title;

      const postBody = document.createElement('p');
      postBody.classList.add('post-body');
      postBody.textContent = post.body;

      const commentButton = document.createElement('button');
      commentButton.textContent = 'Show Comments';
      commentButton.addEventListener('click', () => showComments(post.id));

      const commentContainer = document.createElement('div');
      commentContainer.classList.add('comment-container');
      commentContainer.id = `comments-${post.id}`;

      postElement.appendChild(postTitle);
      postElement.appendChild(postBody);
      postElement.appendChild(commentButton);
      postElement.appendChild(commentContainer);

      postsContainer.appendChild(postElement);
    });
  })
  .catch(error => console.log(error));

// Part 3: Show comments for a post
function showComments(postId) {
  const commentContainer = document.getElementById(`comments-${postId}`);

  fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
    .then(response => response.json())
    .then(comments => {
      commentContainer.innerHTML = ''; // Clear existing comments

      comments.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');

        const commentName = document.createElement('h4');
        commentName.textContent = comment.name;

        const commentBody = document.createElement('p');
        commentBody.textContent = comment.body;

        commentElement.appendChild(commentName);
        commentElement.appendChild(commentBody);

        commentContainer.appendChild(commentElement);
      });
    })
    .catch(error => console.log(error));
}
