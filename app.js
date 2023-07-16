
// Part 1: Fetch user details and build profile page
fetch('https://jsonplaceholder.typicode.com/users/1')
.then(response => response.json())
.then(user => {
  const profileContainer = document.getElementById('user-profile');
  const profileHTML = `
    <div class="user-profile">
      <img class="user-avatar" src="your_avatar_url_here" alt="User Avatar">
      <div>
        <h3>${user.name}</h3>
        <p>Email: ${user.email}</p>
        <p>Website: ${user.website}</p>
      </div>
    </div>
  `;
  profileContainer.innerHTML = profileHTML;
});

// Part 2: Fetch user posts
fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
.then(response => response.json())
.then(posts => {
  const postsContainer = document.getElementById('posts');
  let postsHTML = '';
  posts.forEach(post => {
    postsHTML += `
      <div class="post">
        <h4>${post.title}</h4>
        <p>${post.body}</p>
        <button class="show-comments-btn" data-post-id="${post.id}">Show Comments</button>
        <div class="comments" id="comments-${post.id}"></div>
      </div>
    `;
  });
  postsContainer.innerHTML = postsHTML;

  // Part 3: Show/hide comments on button click
  const showCommentsButtons = document.getElementsByClassName('show-comments-btn');
  Array.from(showCommentsButtons).forEach(button => {
    button.addEventListener('click', () => {
      const postId = button.getAttribute('data-post-id');
      const commentsContainer = document.getElementById(`comments-${postId}`);
      const commentsDisplay = commentsContainer.style.display;

      if (commentsDisplay === 'none') {
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
          .then(response => response.json())
          .then(comments => {
            let commentsHTML = '';
            comments.forEach(comment => {
              commentsHTML += `
                <p><strong>${comment.name}</strong>: ${comment.body}</p>
              `;
            });
            commentsContainer.innerHTML = commentsHTML;
            commentsContainer.style.display = 'block';
            button.textContent = 'Hide Comments';
          });
      } else {
        commentsContainer.style.display = 'none';
        button.textContent = 'Show Comments';
      }
    });
  });
});