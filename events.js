document.addEventListener('DOMContentLoaded', () => {
    const contentWrapper = document.getElementById('content-wrapper');
    const eventSearchInput = document.getElementById('eventSearchInput');
    const searchEventBtn = document.getElementById('searchEventBtn');
    const eventListings = document.getElementById('event-listings');

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

    // Dummy data for events
    const allEvents = [
        {
            name: 'Tree Planting Drive',
            location: 'Model Town Park, Lahore',
            type: 'environmental',
            date: 'August 15, 2025',
            description: 'Join us to plant trees and help our city breathe better.',
        },
        {
            name: 'Science Workshop for Kids',
            location: 'Bahria Town, Islamabad',
            type: 'educational',
            date: 'September 1, 2025',
            description: 'A fun and interactive workshop on basic science concepts for young students.',
        },
        {
            name: 'Beach Cleanup Day',
            location: 'Clifton Beach, Karachi',
            type: 'environmental',
            date: 'September 10, 2025',
            description: 'Help us keep our beaches clean and beautiful.',
        },
        {
            name: 'Coding Bootcamp',
            location: 'DHA Phase 6, Lahore',
            type: 'educational',
            date: 'August 25, 2025',
            description: 'Learn the fundamentals of web development in this one-day intensive bootcamp.',
        }
    ];

    const createEventCard = (event) => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <h3>${event.name}</h3>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${event.location}</p>
            <p class="date"><i class="fas fa-calendar-alt"></i> ${event.date}</p>
            <p>${event.description}</p>
        `;
        return card;
    };

    const displayEvents = (events) => {
        eventListings.innerHTML = '';
        if (events.length === 0) {
            eventListings.innerHTML = '<p class="placeholder-text">No events found for your search criteria.</p>';
        } else {
            events.forEach(event => {
                eventListings.appendChild(createEventCard(event));
            });
        }
    };

    const filterEvents = () => {
        const searchTerm = eventSearchInput.value.toLowerCase();
        const filtered = allEvents.filter(event => {
            return event.name.toLowerCase().includes(searchTerm) ||
                   event.location.toLowerCase().includes(searchTerm) ||
                   event.type.toLowerCase().includes(searchTerm);
        });
        displayEvents(filtered);
    };

    displayEvents(allEvents);

    searchEventBtn.addEventListener('click', filterEvents);
    eventSearchInput.addEventListener('input', filterEvents);
});
