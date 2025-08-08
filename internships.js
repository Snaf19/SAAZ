document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('internshipSearchInput');
    const searchButton = document.getElementById('searchButton');
    const filterField = document.getElementById('filterField');
    const filterLocation = document.getElementById('filterLocation');
    const listingsContainer = document.getElementById('internshipListings');
    const postInternshipBtn = document.getElementById('postInternshipBtn');

    // Helper function to load user data from localStorage
    const getUserProfile = () => {
        const profile = localStorage.getItem('userProfile');
        return profile ? JSON.parse(profile) : null;
    };
    
    // Determine the user's major for filtering
    const currentUser = getUserProfile();
    const userMajor = currentUser ? currentUser.major.toLowerCase().replace(/\s/g, '') : null;

    // Dummy data for internships
    const allInternships = [
        {
            company: 'Tech Innovators Inc.',
            role: 'Junior Software Engineer',
            field: 'computerscience',
            location: 'lahore',
            duration: '3 months',
            description: 'Work on cutting-edge web applications and learn from experienced engineers.',
            link: '#'
        },
        {
            company: 'Creative Solutions',
            role: 'Graphic Design Intern',
            field: 'finearts',
            location: 'karachi',
            duration: '2 months',
            description: 'Assist the creative team in designing marketing materials and digital content.',
            link: '#'
        },
        {
            company: 'Financial Powerhouse',
            role: 'Financial Analyst Intern',
            field: 'businessadministration',
            location: 'islamabad',
            duration: '6 months',
            description: 'Gain hands-on experience in market research and financial reporting.',
            link: '#'
        },
        {
            company: 'Digital Marketing Pros',
            role: 'Social Media Intern',
            field: 'businessadministration',
            location: 'lahore',
            duration: '4 months',
            description: 'Manage social media campaigns and analyze performance metrics.',
            link: '#'
        },
        {
            company: 'Future Builders',
            role: 'Civil Engineering Intern',
            field: 'civilengineering',
            location: 'karachi',
            duration: '6 months',
            description: 'Join a team working on major infrastructure projects.',
            link: '#'
        }
    ];

    const createInternshipCard = (internship) => {
        const card = document.createElement('div');
        card.className = 'internship-card';
        card.innerHTML = `
            <h3>${internship.role}</h3>
            <h4>${internship.company}</h4>
            <p>${internship.description}</p>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${internship.location}</p>
            <p class="duration"><i class="fas fa-clock"></i> ${internship.duration}</p>
            ${currentUser ? `<a href="${internship.link}" class="apply-link" target="_blank">Apply Now &rarr;</a>` : '<p class="login-prompt">Log in to view application link.</p>'}
        `;
        return card;
    };

    const displayInternships = (internships) => {
        listingsContainer.innerHTML = '';
        if (internships.length === 0) {
            listingsContainer.innerHTML = '<p class="placeholder-text">No internships found for your search criteria.</p>';
        } else {
            internships.forEach(internship => {
                listingsContainer.appendChild(createInternshipCard(internship));
            });
        }
    };

    const filterAndSearch = () => {
        const searchTerm = searchInput.value.toLowerCase();
        const field = filterField.value;
        const location = filterLocation.value;

        const filteredInternships = allInternships.filter(internship => {
            const matchesSearch = internship.company.toLowerCase().includes(searchTerm) ||
                                  internship.role.toLowerCase().includes(searchTerm) ||
                                  internship.field.toLowerCase().includes(searchTerm);
            const matchesField = field === 'all' || internship.field === field;
            const matchesLocation = location === 'all' || internship.location === location;
            
            // Only show internships matching the user's major if logged in
            const matchesMajor = !currentUser || internship.field === userMajor || userMajor === null;

            return matchesSearch && matchesField && matchesLocation && matchesMajor;
        });

        displayInternships(filteredInternships);
    };

    // Initial display
    filterAndSearch();

    // Event listeners
    searchButton.addEventListener('click', filterAndSearch);
    searchInput.addEventListener('input', filterAndSearch);
    filterField.addEventListener('change', filterAndSearch);
    filterLocation.addEventListener('change', filterAndSearch);

    // Check if user is logged in to show "Post Internship" button
    if (currentUser) {
        postInternshipBtn.style.display = 'block';
    }
});