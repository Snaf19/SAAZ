document.addEventListener('DOMContentLoaded', () => {
    const contentWrapper = document.getElementById('content-wrapper');
    const forumPosts = document.getElementById('forumPosts');
    const forumInput = document.getElementById('forumInput');
    const forumForm = document.getElementById('forumForm');

    const getUserProfile = () => {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : null;
    };
    
    const checkLoginStatus = () => {
        const currentUser = getUserProfile();
        if (currentUser) {
            contentWrapper.style.display = 'block';
        } else {
            contentWrapper.innerHTML = `
                <div class="not-logged-in-message" style="text-align: center; margin-top: 5rem;">
                    <p>You must be logged in to view this content.</p>
                    <button class="nav-button" id="loginRedirect">Login / Signup</button>
                </div>
            `;
            document.getElementById('loginRedirect').addEventListener('click', () => {
                document.getElementById('openLoginModal').click();
            });
        }
    };
    checkLoginStatus();

    const postToForum = (post, user) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'forum-post';
        postDiv.innerHTML = `
            <div class="post-header">
                <span class="post-author">${user || 'Anonymous'}</span>
            </div>
            <p>${post}</p>
        `;
        if (forumPosts.querySelector('.placeholder-text')) {
            forumPosts.innerHTML = '';
        }
        forumPosts.appendChild(postDiv);
        forumPosts.scrollTop = forumPosts.scrollHeight;
    };

    forumForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const postContent = forumInput.value.trim();
        if (!postContent) return;
        
        const currentUser = getUserProfile();
        const userName = currentUser ? currentUser.name : 'Anonymous';

        postToForum(postContent, userName);
        forumInput.value = '';
    });
});
