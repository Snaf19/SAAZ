document.addEventListener('DOMContentLoaded', () => {
    const contentWrapper = document.getElementById('content-wrapper');
    const universitySearchForm = document.getElementById('universitySearchForm');
    const resultsList = document.getElementById('resultsList');
    const universityResultsContainer = document.getElementById('universityResults');
    const admissionsUserName = document.getElementById('admissionsUserName');
    const desiredMajorSelect = document.getElementById('desiredMajor');

    // Remove the login check and always display the content
    contentWrapper.style.display = 'block';
    if (admissionsUserName) {
        admissionsUserName.textContent = 'Guest';
    }

    const allUniversities = [
        {
            name: 'Lahore University of Management Sciences (LUMS)',
            location: 'Lahore',
            majors: ['Computer Science', 'Business Administration', 'Electrical Engineering'],
            requirements: { matric: 935, inter: 880 },
            link: 'https://admissions.lums.edu.pk/'
        },
        {
            name: 'National University of Sciences & Technology (NUST)',
            location: 'Islamabad',
            majors: ['Computer Science', 'Electrical Engineering'],
            requirements: { matric: 880, inter: 858 },
            link: 'https://www.nust.edu.pk/admissions/'
        },
        {
            name: 'Institute of Business Administration (IBA)',
            location: 'Karachi',
            majors: ['Business Administration'],
            requirements: { matric: 750, inter: 750 },
            link: 'https://admissions.iba.edu.pk/'
        },
        {
            name: 'University of Engineering and Technology (UET)',
            location: 'Lahore',
            majors: ['Electrical Engineering'],
            requirements: { matric: 770, inter: 770 },
            link: 'https://admission.uet.edu.pk/'
        },
        {
            name: 'King Edward Medical University (KEMU)',
            location: 'Lahore',
            majors: ['Pre-Medical'],
            requirements: { matric: 968, inter: 935 },
            link: 'https://kemu.edu.pk/admission/'
        }
    ];

    const createUniversityCard = (university) => {
        const card = document.createElement('div');
        card.className = 'university-card';
        card.innerHTML = `
            <h4>${university.name}</h4>
            <p class="location"><i class="fas fa-map-marker-alt"></i> ${university.location}</p>
            <p><strong>Required Marks:</strong> Matric: ${university.requirements.matric}, Intermediate: ${university.requirements.inter}</p>
            <a href="${university.link}" class="apply-link" target="_blank">Admissions Page &rarr;</a>
        `;
        return card;
    };

    const displayResults = (results) => {
        resultsList.innerHTML = '';
        if (results.length === 0) {
            resultsList.innerHTML = '<p class="placeholder-text">No universities offered per this criteria.</p>';
        } else {
            results.forEach(university => {
                resultsList.appendChild(createUniversityCard(university));
            });
        }
        universityResultsContainer.style.display = 'block';
    };

    if (universitySearchForm) {
        universitySearchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const matricMarks = parseInt(document.getElementById('matricMarks').value);
            const interMarks = parseInt(document.getElementById('interMarks').value);
            const userMajor = desiredMajorSelect.value;

            if (!userMajor) {
                alert('Please select a desired major.');
                return;
            }
            
            const recommended = allUniversities.filter(uni => {
                const meetsMarks = matricMarks >= uni.requirements.matric && interMarks >= uni.requirements.inter;
                const meetsMajor = uni.majors.includes(userMajor);
                return meetsMarks && meetsMajor;
            });

            displayResults(recommended);
        });
    }
});