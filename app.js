let user_id=1
mySelect=document.querySelector('#mySelect')

mySelect.addEventListener('change',()=>{
  
  user_id=mySelect.value
  console.log(user_id)

// console.log(`this is ${user_id}`)
 



fetch(`https://jsonplaceholder.typicode.com/users/${user_id}`)
  .then(response => response.json())
  .then(user => {
 const profileContainer = document.getElementById('user-profile');
    const profileHTML = `
    <div class="profile">
    <h2 style="color: rgb(24, 4, 4);">Twitter Clone</h2>
      
  </div>
      <div class="user-profile">
        <img class="user-avatar" src="https://media.istockphoto.com/id/1450268558/photo/summer-selfie.jpg?b=1&s=170667a&w=0&k=20&c=Vipvrhj292OQRhFkUTIqKnbtMlSn7EWlIbZRzWE66TU=" alt="User Avatar">
        <div>
          <h3>${user.name}</h3>
          <p> ${user.email}</p>
          <p>Website: ${user.website}</p>
          <iconify-icon icon="carbon:location" style="color: gray;"></iconify-icon> Gwenborough
         
          <iconify-icon icon="solar:calendar-linear" style="color: gray;"></iconify-icon> Joined December 2020
          
        </div>
      </div>
    `;
    profileContainer.innerHTML = profileHTML;
   
  });



fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`)
  .then(response => response.json())
  .then(posts => {
    const postsContainer = document.getElementById('posts');
    let postsHTML = '';
    posts.forEach(post => {
      postsHTML += `
        <div class="post">
       <div>
        <img src='https://media.istockphoto.com/id/1450268558/photo/summer-selfie.jpg?b=1&s=170667a&w=0&k=20&c=Vipvrhj292OQRhFkUTIqKnbtMlSn7EWlIbZRzWE66TU=' alt="User image'>
       <div class="intro"
        <h3> ${post.name}<iconify-icon icon="ic:round-verified" style="color: blue;"></iconify-icon></h3><iconify-icon icon="skill-icons:twitter" style="color: gray;"></iconify-icon>
        </div>
        
        @general_matejagwo
        
          <h4>${post.title}</h4>
          <p>${post.body}</p>
          
          <div class="activities">
          <button class="show-comments-btn" data-post-id="${post.id}"><iconify-icon icon="iconamoon:comment-light" style="color: blue;"></iconify-icon>6</button>
          <div><iconify-icon icon="system-uicons:retweet" style="color: blue;"></iconify-icon>9</div>
         <div> <iconify-icon icon="icon-park:like" style="color: blue;"></iconify-icon>182</div>
         <div> <iconify-icon icon="mdi:analytics" style="color: gray;"></iconify-icon>203</div>
          <iconify-icon icon="material-symbols:share-outline" style="color: gray;"></iconify-icon>
          </div>
          <div class="comments" id="comments-${post.id}"></div>
          
        </div>
      `;
    });
    postsContainer.innerHTML = postsHTML;

    
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
            
            });
        } else {
          commentsContainer.style.display = 'none';
      
        }
      });
    });
  });
}
) 