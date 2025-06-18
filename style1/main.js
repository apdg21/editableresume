document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Load resume data from JSON
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateResume(data);
            setupEditModal(data);
        })
        .catch(error => console.error('Error loading resume data:', error));

    // Modal functionality
    const modal = document.getElementById('editModal');
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function populateResume(data) {
    // Personal Info
    document.getElementById('fullName').textContent = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;
    document.getElementById('jobTitle').textContent = data.personalInfo.jobTitle;
    document.getElementById('email').innerHTML = `<i class="fas fa-envelope"></i> ${data.personalInfo.email}`;
    document.getElementById('phone').innerHTML = `<i class="fas fa-phone"></i> ${data.personalInfo.phone}`;
    document.getElementById('location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.personalInfo.location}`;
    document.getElementById('footerName').textContent = `${data.personalInfo.firstName} ${data.personalInfo.lastName}`;
    
    // About
    document.getElementById('aboutText').textContent = data.about;
    
    // Skills
    const skillsList = document.getElementById('skillsList');
    data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.className = 'skill-item';
        li.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <div class="skill-bar">
                <div class="skill-progress" style="width: ${skill.level}%"></div>
            </div>
        `;
        skillsList.appendChild(li);
    });
    
    // Experience
    const experienceList = document.getElementById('experienceList');
    data.experience.forEach(exp => {
        const div = document.createElement('div');
        div.className = 'experience-item';
        div.innerHTML = `
            <h4 class="experience-title">${exp.position}</h4>
            <p class="experience-company">${exp.company}</p>
            <p class="experience-dates">${exp.startDate} - ${exp.endDate}</p>
            <p class="experience-description">${exp.description}</p>
        `;
        experienceList.appendChild(div);
    });
    
    // Education
    const educationList = document.getElementById('educationList');
    data.education.forEach(edu => {
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <p class="education-degree">${edu.degree}</p>
            <p class="education-school">${edu.institution}</p>
            <p class="education-dates">${edu.year}</p>
        `;
        educationList.appendChild(div);
    });
    
    // Languages
    const languagesList = document.getElementById('languagesList');
    data.languages.forEach(lang => {
        const li = document.createElement('li');
        li.className = 'language-item';
        li.innerHTML = `
            <span>${lang.name}</span>
            <span>${lang.level}</span>
        `;
        languagesList.appendChild(li);
    });
    
    // Projects
    const projectsList = document.getElementById('projectsList');
    data.projects.forEach(project => {
        const div = document.createElement('div');
        div.className = 'project-card';
        div.innerHTML = `
            <h4 class="project-title">${project.name}</h4>
            <p class="project-description">${project.description}</p>
            <div class="project-links">
                ${project.liveUrl ? `<a href="${project.liveUrl}" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>` : ''}
                ${project.codeUrl ? `<a href="${project.codeUrl}" target="_blank"><i class="fab fa-github"></i> View Code</a>` : ''}
            </div>
        `;
        projectsList.appendChild(div);
    });
    
    // Social Links
    const socialLinks = document.getElementById('socialLinks');
    data.socialLinks.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url;
        a.target = '_blank';
        a.innerHTML = `<i class="fab fa-${link.name.toLowerCase()}"></i>`;
        socialLinks.appendChild(a);
    });
}

function setupEditModal(data) {
    const editImageBtn = document.getElementById('editImageBtn');
    const editModal = document.getElementById('editModal');
    const editFieldSelect = document.getElementById('editField');
    const editForm = document.getElementById('editForm');
    
    // Populate edit field options
    const fields = [
        { id: 'firstName', label: 'First Name', value: data.personalInfo.firstName },
        { id: 'lastName', label: 'Last Name', value: data.personalInfo.lastName },
        { id: 'jobTitle', label: 'Job Title', value: data.personalInfo.jobTitle },
        { id: 'email', label: 'Email', value: data.personalInfo.email },
        { id: 'phone', label: 'Phone', value: data.personalInfo.phone },
        { id: 'location', label: 'Location', value: data.personalInfo.location },
        { id: 'about', label: 'About Me', value: data.about }
    ];
    
    fields.forEach(field => {
        const option = document.createElement('option');
        option.value = field.id;
        option.textContent = field.label;
        editFieldSelect.appendChild(option);
    });
    
    // Handle field selection change
    editFieldSelect.addEventListener('change', () => {
        const selectedField = editFieldSelect.value;
        const field = fields.find(f => f.id === selectedField);
        document.getElementById('editValue').value = field ? field.value : '';
    });
    
    // Handle edit image button
    editImageBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('In a real implementation, this would allow you to upload a new profile image.');
    });
    
    // Handle form submission
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fieldId = editFieldSelect.value;
        const newValue = document.getElementById('editValue').value;
        
        // In a real implementation, you would save this to the JSON file or database
        alert(`Field "${fieldId}" would be updated to: ${newValue}`);
        editModal.style.display = 'none';
    });
    
    // For demo purposes, show edit button on hover
    const profileImageContainer = document.querySelector('.profile-image-container');
    profileImageContainer.addEventListener('mouseenter', () => {
        editImageBtn.style.display = 'flex';
    });
    
    profileImageContainer.addEventListener('mouseleave', () => {
        editImageBtn.style.display = 'none';
    });
}