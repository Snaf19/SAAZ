// A global function to load user data from localStorage
window.loadUser = () => {
    const profile = localStorage.getItem('userProfile');
    return profile ? JSON.parse(profile) : null;
};

// A global helper function to get the display name for an occupation
window.getOccupationDisplayName = (occupation) => {
    const occupationMap = {
        'matric': 'Matric Student',
        'intermediate': 'Intermediate Student',
        'undergraduate': 'Undergraduate Student',
        'graduate': 'Graduate',
        'phd': 'PhD Student',
        'professional': 'Professional'
    };
    return occupationMap[occupation] || occupation;
};


document.addEventListener('DOMContentLoaded', () => {
    const notLoggedInSection = document.getElementById('notLoggedIn');
    const roleSelection = document.getElementById('roleSelection');
    const mentorDashboard = document.getElementById('mentorDashboard');
    const studentDashboard = document.getElementById('studentDashboard');

    const teachBtn = document.getElementById('teachBtn');
    const learnBtn = document.getElementById('learnBtn');

    const displayUserName = document.getElementById('displayUserName');
    const displayUserCity = document.getElementById('displayUserCity');
    const displayUserOccupation = document.getElementById('displayUserOccupation');
    const displayUserEmail = document.getElementById('displayUserEmail'); 

    const contentWrapper = document.getElementById('content-wrapper');

    let currentUser = null; 

    // --- Core logic: Check login status on page load ---
    const checkLoginStatus = () => {
        currentUser = window.loadUser();
        if (currentUser) {
            contentWrapper.style.display = 'block';
            displayUserName.textContent = currentUser.name;
            displayUserCity.textContent = currentUser.city;
            displayUserOccupation.textContent = window.getOccupationDisplayName(currentUser.occupation);
            displayUserEmail.textContent = currentUser.email || 'N/A';

            notLoggedInSection.style.display = 'none';
            roleSelection.style.display = 'block';
        } else {
            contentWrapper.innerHTML = `
                <div class="not-logged-in-message">
                    <p>You need to be logged in to access the Teach or Learn platform.</p>
                    <button class="nav-button" id="loginRedirect">Login / Signup</button>
                </div>
            `;
            document.getElementById('loginRedirect').addEventListener('click', () => {
                document.getElementById('openLoginModal').click();
            });
        }
    };
    
    // Initial login check
    checkLoginStatus();

    // Populate mentor grade options based on occupation
    const populateMentorGrades = (occupation) => {
        const mentorGradeSelect = document.getElementById('mentorGrade');
        mentorGradeSelect.innerHTML = '<option value="">-- Select Grade --</option>'; 

        const gradesMap = {
            'intermediate': ['5th', '6th', '7th', '8th', '9th', '10th'],
            'undergraduate': ['9th', '10th', '11th', '12th'],
            'graduate': ['12th', '13th', '14th', '15th', '16th'],
            'phd': ['16th', '17th', '18th']
        };

        const gradesForOccupation = gradesMap[occupation] || [];
        gradesForOccupation.forEach(grade => {
            const option = document.createElement('option');
            option.value = grade;
            option.textContent = grade + ' Grade';
            mentorGradeSelect.appendChild(option);
        });
        mentorGradeSelect.disabled = (gradesForOccupation.length === 0);
    };

    // Handle Teach Button
    teachBtn.addEventListener('click', () => {
        roleSelection.style.display = 'none';
        mentorDashboard.style.display = 'block';
        if (currentUser) {
            populateMentorGrades(currentUser.occupation);
        }
    });

    // Handle Learn Button
    learnBtn.addEventListener('click', () => {
        roleSelection.style.display = 'none';
        studentDashboard.style.display = 'block';
        // Placeholder: Dynamically load lectures for current user's grade
        document.getElementById('lectureList').innerHTML = `<p class="placeholder-text">Loading lectures for your grade (${currentUser ? window.getOccupationDisplayName(currentUser.occupation) : 'student'})...</p>`;
        
        // For now, let's just show a dummy video
        const dummyVideoTopic = "Algebra Basics";
        const dummyVideoURL = "https://www.w3schools.com/html/mov_bbb.mp4"; 
        showLectureVideo(dummyVideoTopic, dummyVideoURL);
    });

    // Mentor Subject/Topic/Upload Logic
    document.getElementById('mentorGrade').addEventListener('change', function() {
        const mentorSubjectSelect = document.getElementById('mentorSubject');
        const mentorTopicSelect = document.getElementById('mentorTopic');
        const videoUploadInput = document.getElementById('videoUpload');
        const uploadAndLockBtn = document.getElementById('uploadAndLockBtn');

        mentorSubjectSelect.innerHTML = '<option value="">-- Select Subject --</option>';
        mentorTopicSelect.innerHTML = '<option value="">-- Select Topic --</option>';
        videoUploadInput.disabled = true;
        uploadAndLockBtn.disabled = true;

        if (this.value) {
            mentorSubjectSelect.disabled = false;
            mentorSubjectSelect.innerHTML += `
                <option value="math">Math</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="biology">Biology</option>
            `;
        } else {
            mentorSubjectSelect.disabled = true;
        }
    });

    document.getElementById('mentorSubject').addEventListener('change', function() {
        const mentorTopicSelect = document.getElementById('mentorTopic');
        const videoUploadInput = document.getElementById('videoUpload');
        const uploadAndLockBtn = document.getElementById('uploadAndLockBtn');

        mentorTopicSelect.innerHTML = '<option value="">-- Select Topic --</option>';
        videoUploadInput.disabled = true;
        uploadAndLockBtn.disabled = true;

        if (this.value) {
            mentorTopicSelect.disabled = false;
            if (this.value === 'math') {
                mentorTopicSelect.innerHTML += `
                    <option value="algebra">Algebra Basics</option>
                    <option value="geometry">Geometry Fundamentals</option>
                    <option value="calculus">Introduction to Calculus</option>
                `;
            } else if (this.value === 'physics') {
                mentorTopicSelect.innerHTML += `
                    <option value="mechanics">Newtonian Mechanics</option>
                    <option value="electricity">Basic Electricity</option>
                `;
            }
        } else {
            mentorTopicSelect.disabled = true;
        }
    });

    document.getElementById('mentorTopic').addEventListener('change', function() {
        const videoUploadInput = document.getElementById('videoUpload');
        const uploadAndLockBtn = document.getElementById('uploadAndLockBtn');

        if (this.value) {
            videoUploadInput.disabled = false;
            uploadAndLockBtn.disabled = false;
        } else {
            videoUploadInput.disabled = true;
            uploadAndLockBtn.disabled = true;
        }
    });

    document.getElementById('uploadAndLockBtn').addEventListener('click', function() {
        const topic = document.getElementById('mentorTopic').value;
        const videoFile = document.getElementById('videoUpload').files[0];
        const mentorGrade = document.getElementById('mentorGrade').value;
        const mentorSubject = document.getElementById('mentorSubject').value;

        if (topic && videoFile && mentorGrade && mentorSubject) {
            alert(`Mentor ${currentUser.name} uploaded video for: Grade ${mentorGrade}, Subject: ${mentorSubject}, Topic: ${topic}. This topic is now locked! (Simulated)`);
        } else {
            alert('Please select a grade, subject, topic, and upload a video.');
        }
    });

    // Placeholder for student lecture search
    document.getElementById('searchLectureBtn').addEventListener('click', function() {
        const searchTerm = document.getElementById('lectureSearch').value.trim();
        if (searchTerm) {
            alert(`Searching for lectures on: "${searchTerm}" (Simulated)`);
            const dummyVideoTopic = searchTerm || "Dummy Lecture";
            const dummyVideoURL = "https://www.w3schools.com/html/mov_bbb.mp4"; 
            showLectureVideo(dummyVideoTopic, dummyVideoURL);
        } else {
            alert('Please enter a search term.');
        }
    });

    // Video playback and feedback (Student side)
    const videoDisplaySection = document.getElementById('videoDisplay');
    const lectureTitle = document.getElementById('lectureTitle');
    const lectureVideo = document.getElementById('lectureVideo');
    const thumbsUpBtn = document.getElementById('thumbsUpBtn');
    const thumbsDownBtn = document.getElementById('thumbsDownBtn');
    const commentsList = document.getElementById('commentsList');
    const commentInput = document.getElementById('commentInput');
    const postCommentBtn = document.getElementById('postCommentBtn');

    const showLectureVideo = (title, videoUrl) => {
        lectureTitle.textContent = title;
        lectureVideo.src = videoUrl;
        videoDisplaySection.style.display = 'block';
        commentsList.innerHTML = '<p class="placeholder-text">No comments yet.</p>';
        commentInput.value = '';

        setTimeout(() => {
            if (commentsList.querySelector('.placeholder-text')) {
                commentsList.innerHTML = '';
            }
            const existingComment1 = document.createElement('p');
            existingComment1.innerHTML = `<strong>Student A:</strong> Great explanation!`;
            commentsList.appendChild(existingComment1);

            const existingComment2 = document.createElement('p');
            existingComment2.innerHTML = `<strong>Student B:</strong> Could you explain topic X next time?`;
            commentsList.appendChild(existingComment2);
        }, 1000);
    };

    thumbsUpBtn.addEventListener('click', () => {
        alert('Thumbs Up! (Rating simulated)');
    });

    thumbsDownBtn.addEventListener('click', () => {
        alert('Thumbs Down! (Rating simulated)');
    });

    postCommentBtn.addEventListener('click', () => {
        const commentText = commentInput.value.trim();
        if (commentText) {
            const userName = currentUser ? currentUser.name : 'Anonymous';
            const newComment = document.createElement('p');
            newComment.innerHTML = `<strong>${userName}:</strong> ${commentText}`;
            if (commentsList.querySelector('.placeholder-text')) {
                commentsList.innerHTML = '';
            }
            commentsList.appendChild(newComment);
            commentInput.value = '';
            commentsList.scrollTop = commentsList.scrollHeight;
            alert('Comment Posted! (Simulated)');
        } else {
            alert('Please enter a comment.');
        }
    });
}); 