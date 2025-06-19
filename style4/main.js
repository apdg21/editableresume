document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateResume(data);
        })
        .catch(error => console.error('Error loading resume data:', error));
});

function populateResume(data) {
    // Personal Info
    document.getElementById('fullName').textContent = `${data.personalInfo.firstName.toUpperCase()} ${data.personalInfo.lastName.toUpperCase()}`;
    document.getElementById('jobTitle').textContent = data.personalInfo.jobTitle;
    document.getElementById('aboutText').textContent = data.about;
    
    // Contact Info
    document.getElementById('phone').innerHTML = `<i class="fas fa-phone"></i> ${data.personalInfo.phone}`;
    document.getElementById('email').innerHTML = `<i class="fas fa-envelope"></i> ${data.personalInfo.email}`;
    document.getElementById('website').innerHTML = `<i class="fas fa-globe"></i> ${data.personalInfo.website}`;
    document.getElementById('location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.personalInfo.location}`;
    
    // Skills
    const skillsList = document.getElementById('skillsList');
    data.skills.forEach(skill => {
        const nameDiv = document.createElement('div');
        nameDiv.className = 'skill-name';
        nameDiv.textContent = skill.name;
        
        const percentDiv = document.createElement('div');
        percentDiv.className = 'skill-percent';
        percentDiv.textContent = `${skill.level}%`;
        
        skillsList.appendChild(nameDiv);
        skillsList.appendChild(percentDiv);
    });
    
    // Education
    const educationList = document.getElementById('educationList');
    data.education.forEach(edu => {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <p class="education-degree">${edu.degree}</p>
            <p class="education-school">${edu.institution}</p>
            ${edu.location ? `<p class="education-location">${edu.location}</p>` : ''}
            <p class="education-dates">${edu.year}</p>
        `;
        educationList.appendChild(div);
    });
    
    // Languages
    const languagesList = document.getElementById('languagesList');
    data.languages.forEach(lang => {
        const div = document.createElement('div');
        div.className = 'language-item';
        div.innerHTML = `
            <span class="language-name">${lang.name}</span>
            <span class="language-percent">${lang.level}%</span>
        `;
        languagesList.appendChild(div);
    });
    
    // Experience
    const experienceList = document.getElementById('experienceList');
    data.experience.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'experience-item';
        
        const headerDiv = document.createElement('div');
        headerDiv.className = 'experience-header';
        headerDiv.innerHTML = `
            <div>
                <h4 class="experience-title">${exp.position}</h4>
                <p class="experience-company">${exp.company}</p>
            </div>
            <p class="experience-dates">${exp.startDate} - ${exp.endDate}</p>
        `;
        
        const descDiv = document.createElement('div');
        descDiv.className = 'experience-description';
        descDiv.textContent = exp.description;
        
        const detailsUl = document.createElement('ul');
        detailsUl.className = 'experience-details';
        exp.details.forEach(detail => {
            const li = document.createElement('li');
            li.textContent = detail;
            detailsUl.appendChild(li);
        });
        
        div.appendChild(headerDiv);
        div.appendChild(descDiv);
        div.appendChild(detailsUl);
        experienceList.appendChild(div);
    });
    
    // Awards
    if (data.awards && data.awards.length > 0) {
        const awardsList = document.getElementById('awardsList');
        data.awards.forEach(award => {
            const div = document.createElement('div');
            div.className = 'award-item';
            div.innerHTML = `
                <p class="award-name">${award.name}</p>
                <p class="award-org">${award.organization}</p>
                <p class="award-year">${award.year}</p>
            `;
            awardsList.appendChild(div);
        });
    } else {
        document.getElementById('awardsSection').style.display = 'none';
    }
}