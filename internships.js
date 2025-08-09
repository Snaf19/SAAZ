document.addEventListener('DOMContentLoaded', () => {
    const contentWrapper = document.getElementById('content-wrapper');
    const searchInput = document.getElementById('internshipSearchInput');
    const searchButton = document.getElementById('searchButton');
    const filterField = document.getElementById('filterField');
    const filterLocation = document.getElementById('filterLocation');
    const listingsContainer = document.getElementById('internshipListings');
    const postInternshipBtn = document.getElementById('postInternshipBtn');

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
                <div class="not-logged-in-message">
                    <p>You must be logged in to access this content.</p>
                    <button class="nav-button" id="loginRedirect">Login / Signup</button>
                </div>
            `;
            document.getElementById('loginRedirect').addEventListener('click', () => {
                document.getElementById('openLoginModal').click();
            });
        }
    };
    checkLoginStatus();

    const currentUser = getUserProfile();
    const userMajor = currentUser ? currentUser.major.toLowerCase().replace(/\s/g, '') : null;
    
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
        },
        {
            company: 'CodeCrafters',
            role: 'Data Analyst Intern',
            field: 'computerscience',
            location: 'islamabad',
            duration: '3 months',
            description: 'Analyze large datasets to provide business insights.',
            link: '#'
        },
        {
            company: 'Design House',
            role: 'UX/UI Intern',
            field: 'finearts',
            location: 'lahore',
            duration: '4 months',
            description: 'Work on user interface and experience design for mobile apps.',
            link: '#'
        },
        {
            company: 'Market Makers',
            role: 'Market Research Intern',
            field: 'businessadministration',
            location: 'karachi',
            duration: '3 months',
            description: 'Conduct market research and prepare reports for our clients.',
            link: '#'
        },
        {
            company: 'Structural Innovators',
            role: 'Junior Structural Engineer',
            field: 'civilengineering',
            location: 'lahore',
            duration: '6 months',
            description: 'Assist in designing and analyzing building structures.',
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
            
            const matchesMajor = !currentUser || internship.field === userMajor || userMajor === null;

            return matchesSearch && matchesField && matchesLocation && matchesMajor;
        });

        displayInternships(filteredInternships);
    };

    filterAndSearch();

    searchButton.addEventListener('click', filterAndSearch);
    searchInput.addEventListener('input', filterAndSearch);
    filterField.addEventListener('change', filterAndSearch);
    filterLocation.addEventListener('change', filterAndSearch);

    if (currentUser) {
        // We removed the Post Internship button from the HTML, so this is no longer needed
        // postInternshipBtn.style.display = 'block';
    }
});
