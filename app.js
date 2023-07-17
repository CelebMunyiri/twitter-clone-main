// Part 1: Fetch user details and build profile page from the API provided,
fetch('https://jsonplaceholder.typicode.com/users/1')
  .then(response => response.json())
  .then(user => {
    const profileContainer = document.getElementById('user-profile');
    const profileHTML = `
      <div class="user-profile">
        <img class="user-avatar" src="https://media.istockphoto.com/id/1450268558/photo/summer-selfie.jpg?b=1&s=170667a&w=0&k=20&c=Vipvrhj292OQRhFkUTIqKnbtMlSn7EWlIbZRzWE66TU=" alt="User Avatar">
        <div>
          <h3>${user.name}</h3>
          <p> ${user.email}</p>
          <p>Website: ${user.website}</p>
          <iconify-icon icon="carbon:location" style="color: gray;"></iconify-icon> New york, USA
         
          <iconify-icon icon="solar:calendar-linear" style="color: gray;"></iconify-icon> Joined December 2020
          
        </div>
      </div>
    `;
    profileContainer.innerHTML = profileHTML;
  });


// Part 2: Fetch user posts from the given API
fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
  .then(response => response.json())
  .then(posts => {
    const postsContainer = document.getElementById('posts');
    let postsHTML = '';
    posts.forEach(post => {
      postsHTML += `
        <div class="post">
       
        <img src='https://cdn.pixabay.com/photo/2023/07/13/08/50/squirrel-8124227_640.jpg' alt='avatar image'>
        <h3> General Matejagwo</h3> @general_matejagwo
        <p></p>
          <h4>${post.title}</h4>
          <p>${post.body}</p>
          
          <button class="show-comments-btn" data-post-id="${post.id}"><iconify-icon icon="iconamoon:comment-light" style="color: blue;"></iconify-icon>6</button>
          <iconify-icon icon="system-uicons:retweet" style="color: blue;"></iconify-icon>9
          <iconify-icon icon="icon-park:like" style="color: blue;"></iconify-icon>182

          <iconify-icon icon="material-symbols:share-outline" style="color: gray;"></iconify-icon>
          
          <div class="comments" id="comments-${post.id}"></div>
          
        </div>
      `;
    });
    postsContainer.innerHTML = postsHTML;

    // Part 3: Show/hide comments on button click to show different comments of the given post
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
                  <p>${comment.name} ${comment.body}</p>
                `;
              });
              commentsContainer.innerHTML = commentsHTML;
              commentsContainer.style.display = 'block';
            //   button.textContent = `Hide Comments`;
            });
        } else {
          commentsContainer.style.display = 'none';
        //   button.textContent = 'Show Comments';
        }
      });
    });
  });