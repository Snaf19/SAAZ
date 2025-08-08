document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('loginSignupModal');
    const openLoginBtn = document.getElementById('openLoginModal');
    const closeBtn = document.querySelector('.close-button');
    const authForm = document.getElementById('authForm');
    const loggedInPanel = document.getElementById('loggedInPanel');
    const signupBtn = document.getElementById('signupBtnModal');
    const loginBtn = document.getElementById('loginBtnModal');
    const logoutBtn = document.getElementById('logoutBtnModal');

    const userLoggedInDiv = document.getElementById('userLoggedIn');
    const loggedInNameSpan = document.getElementById('loggedInName');
    const signOutButton = document.getElementById('signOutButton');

    const majorFieldGroup = document.getElementById('majorFieldGroup');
    const userOccupationSelect = document.getElementById('userOccupationModal');
    const userMajorSelect = document.getElementById('userMajorModal');

    const majorOptions = {
        matric: ['Science (Bio)', 'Science (Chem)', 'Arts', 'General'],
        intermediate: ['Pre-Engineering', 'Pre-Medical', 'ICS', 'Commerce', 'Arts'],
        undergraduate: ['Computer Science', 'Electrical Engineering', 'Business Administration', 'Biochemistry', 'Fine Arts'],
        graduate: ['Computer Science', 'Electrical Engineering', 'Business Administration', 'Biochemistry', 'Fine Arts', 'Other'],
        phd: ['Computer Science', 'Electrical Engineering', 'Business Administration', 'Biochemistry', 'Fine Arts', 'Other']
    };

    userOccupationSelect.addEventListener('change', (e) => {
        const occupation = e.target.value;
        userMajorSelect.innerHTML = '<option value="">-- Select Major / Field --</option>';
        majorFieldGroup.style.display = 'none';

        if (majorOptions[occupation]) {
            majorOptions[occupation].forEach(major => {
                const option = document.createElement('option');
                option.value = major;
                option.textContent = major;
                userMajorSelect.appendChild(option);
            });
            majorFieldGroup.style.display = 'block';
        }
    });

    const storeUserProfile = (profile) => {
        localStorage.setItem('userProfile', JSON.stringify(profile));
    };

    const getUserProfile = () => {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : null;
    };

    const showNavLoggedInState = (profile) => {
        openLoginBtn.style.display = 'none';
        userLoggedInDiv.style.display = 'flex';
        loggedInNameSpan.textContent = `Signed in as ${profile.name}`;
    };

    const showNavLoggedOutState = () => {
        openLoginBtn.style.display = 'block';
        userLoggedInDiv.style.display = 'none';
    };

    const showModalLoggedInState = (profile) => {
        authForm.style.display = 'none';
        loggedInPanel.style.display = 'block';
        document.getElementById('loggedInUserName').textContent = profile.name;
        document.getElementById('loggedInUserOccupation').textContent = profile.occupation;
        document.getElementById('loggedInUserCity').textContent = profile.city;
        document.getElementById('loggedInUserEmail').textContent = profile.email;
        document.getElementById('loggedInUserMajor').textContent = profile.major || 'N/A';
    };

    const showModalLoggedOutState = () => {
        authForm.style.display = 'block';
        loggedInPanel.style.display = 'none';
    };

    signupBtn.addEventListener('click', () => {
        const name = document.getElementById('userNameModal').value;
        const email = document.getElementById('userEmailModal').value;
        const city = document.getElementById('userCityModal').value;
        const occupation = userOccupationSelect.value;
        const major = userMajorSelect.value;

        if (name && email && city && occupation) {
            const profile = { name, email, city, occupation, major };
            storeUserProfile(profile);
            showModalLoggedInState(profile);
            showNavLoggedInState(profile);
            alert('Signup successful!');
            window.location.reload(); 
        } else {
            alert('Please fill out all fields.');
        }
    });

    loginBtn.addEventListener('click', () => {
        const profile = getUserProfile();
        if (profile) {
            showModalLoggedInState(profile);
            showNavLoggedInState(profile);
            alert('Login successful!');
            window.location.reload();
        } else {
            alert('No profile found. Please sign up first.');
        }
    });

    signOutButton.addEventListener('click', () => {
        localStorage.removeItem('userProfile');
        showNavLoggedOutState();
        showModalLoggedOutState();
        alert('You have been signed out.');
        window.location.reload();
    });
    
    // Initial check on page load to show the correct state
    const userProfile = getUserProfile();
    if (userProfile) {
        showNavLoggedInState(userProfile);
    } else {
        showNavLoggedOutState();
        if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
            openLoginBtn.click();
        }
    }

    // Event listeners to handle the modal opening and closing
    openLoginBtn.addEventListener('click', () => {
        modal.style.display = 'flex';
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});
