document.addEventListener('DOMContentLoaded', function() {
    // Initial load attempt for data.json
    loadDataFromFile('data.json');

    function loadDataFromFile(filePath) {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                populateForm(data);
                setupEventListeners();
            })
            .catch(error => {
                console.error('Error loading data:', error);
                alert('Could not load existing data. Starting with a blank form. You can load a JSON file manually.');
                // Clear the form if data loading fails, except for initial setup.
                // For a truly blank form on initial error, you might want to call resetForm(true) here.
                setupEventListeners(); // Still setup listeners even if load fails
            });
    }

    function populateForm(data) {
        // Basic Info
        document.getElementById('name').value = data.name || '';
        document.getElementById('title').value = data.title || '';
        document.getElementById('about').value = data.about || '';

        // Clear existing dynamic sections before populating
        document.getElementById('skills-container').innerHTML = '';
        document.getElementById('education-container').innerHTML = '';
        document.getElementById('languages-container').innerHTML = '';
        document.getElementById('experience-container').innerHTML = '';
        document.getElementById('social-container').innerHTML = '';

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        if (data.skills && Array.isArray(data.skills)) {
            data.skills.forEach((skill, index) => {
                addSkillField(skillsContainer, skill, index);
            });
        }

        // Education (now dynamic to allow multiple entries)
        const educationContainer = document.getElementById('education-container');
        if (data.education && Array.isArray(data.education)) {
            data.education.forEach((edu, index) => {
                addEducationField(educationContainer, edu, index);
            });
        } else if (data.education) { // Handle single education object for backward compatibility
            addEducationField(educationContainer, data.education, 0);
        }


        // Languages
        const languagesContainer = document.getElementById('languages-container');
        if (data.languages && Array.isArray(data.languages)) {
            data.languages.forEach((language, index) => {
                addLanguageField(languagesContainer, language, index);
            });
        }

        // Experience
        const experienceContainer = document.getElementById('experience-container');
        if (data.experience && Array.isArray(data.experience)) {
            data.experience.forEach((exp, index) => {
                addExperienceField(experienceContainer, exp, index);
            });
        }

        // Contact
        document.getElementById('contact-phone').value = data.contact?.phone || '';
        document.getElementById('contact-email').value = data.contact?.email || '';
        document.getElementById('contact-website').value = data.contact?.website || '';
        document.getElementById('contact-address').value = data.contact?.address || '';

        // Social Media
        const socialContainer = document.getElementById('social-container');
        if (data.contact?.social && Array.isArray(data.contact.social)) {
            data.contact.social.forEach((social, index) => {
                addSocialField(socialContainer, social, index);
            });
        }
    }

    function setupEventListeners() {
        // Add Skill
        document.getElementById('add-skill').addEventListener('click', function() {
            const container = document.getElementById('skills-container');
            addSkillField(container, {}, container.children.length);
        });

        // Add Education
        document.getElementById('add-education').addEventListener('click', function() {
            const container = document.getElementById('education-container');
            addEducationField(container, {}, container.children.length);
        });

        // Add Language
        document.getElementById('add-language').addEventListener('click', function() {
            const container = document.getElementById('languages-container');
            addLanguageField(container, {}, container.children.length);
        });

        // Add Experience
        document.getElementById('add-experience').addEventListener('click', function() {
            const container = document.getElementById('experience-container');
            addExperienceField(container, {}, container.children.length);
        });

        // Add Social Media
        document.getElementById('add-social').addEventListener('click', function() {
            const container = document.getElementById('social-container');
            addSocialField(container, {}, container.children.length);
        });

        // Reset Form
        document.getElementById('reset-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to reset all form data to its initial loaded state?')) {
                // Re-load from data.json or clear if that fails
                loadDataFromFile('data.json');
            }
        });

        // Handle file upload for loading data
        document.getElementById('file-upload').addEventListener('change', function(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    try {
                        const parsedData = JSON.parse(e.target.result);
                        populateForm(parsedData);
                        alert('Data loaded successfully from ' + file.name);
                    } catch (error) {
                        console.error('Error parsing JSON file:', error);
                        alert('Invalid JSON file. Please upload a valid data.json.');
                    }
                };
                reader.readAsText(file);
            }
        });

        // Save Form
        document.getElementById('portfolio-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveData();
        });
    }

    // --- Dynamic Field Addition Functions ---

    function addSkillField(container, skill = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        // Use a unique ID for the div itself to reference it easily for removal
        div.setAttribute('data-item-id', `skill-${Date.now()}-${index}`);
        div.innerHTML = `
            <button type="button" class="remove-btn">×</button>
            <div class="form-group">
                <label for="skill-name-${index}">Skill Name</label>
                <input type="text" class="skill-name" value="${skill.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="skill-level-${index}">Skill Level (0-100)</label>
                <input type="number" class="skill-level" min="0" max="100" value="${skill.level || ''}" required>
            </div>
        `;
        container.appendChild(div);

        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this skill?')) {
                container.removeChild(div);
            }
        });
    }

    function addEducationField(container, education = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.setAttribute('data-item-id', `education-${Date.now()}-${index}`);
        div.innerHTML = `
            <button type="button" class="remove-btn">×</button>
            <div class="form-group">
                <label for="education-degree-${index}">Degree</label>
                <input type="text" class="education-degree" value="${education.degree || ''}" required>
            </div>
            <div class="form-group">
                <label for="education-university-${index}">University</label>
                <input type="text" class="education-university" value="${education.university || ''}" required>
            </div>
            <div class="form-group">
                <label for="education-address-${index}">Address</label>
                <input type="text" class="education-address" value="${education.address || ''}" required>
            </div>
            <div class="form-group">
                <label for="education-years-${index}">Years</label>
                <input type="text" class="education-years" value="${education.years || ''}" required>
            </div>
        `;
        container.appendChild(div);

        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this education entry?')) {
                container.removeChild(div);
            }
        });
    }

    function addLanguageField(container, language = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.setAttribute('data-item-id', `language-${Date.now()}-${index}`);
        div.innerHTML = `
            <button type="button" class="remove-btn">×</button>
            <div class="form-group">
                <label for="language-name-${index}">Language Name</label>
                <input type="text" class="language-name" value="${language.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="language-level-${index}">Proficiency Level (0-100)</label>
                <input type="number" class="language-level" min="0" max="100" value="${language.level || ''}" required>
            </div>
        `;
        container.appendChild(div);

        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this language?')) {
                container.removeChild(div);
            }
        });
    }

    function addExperienceField(container, experience = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.setAttribute('data-item-id', `experience-${Date.now()}-${index}`);
        div.innerHTML = `
            <button type="button" class="remove-btn">×</button>
            <div class="form-group">
                <label for="exp-title-${index}">Job Title</label>
                <input type="text" class="exp-title" value="${experience.title || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp-period-${index}">Period</label>
                <input type="text" class="exp-period" value="${experience.period || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp-company-${index}">Company</label>
                <input type="text" class="exp-company" value="${experience.company || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp-description-${index}">Description</label>
                <textarea class="exp-description" required>${experience.description || ''}</textarea>
            </div>
        `;
        container.appendChild(div);

        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this experience?')) {
                container.removeChild(div);
            }
        });
    }

    function addSocialField(container, social = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.setAttribute('data-item-id', `social-${Date.now()}-${index}`);
        div.innerHTML = `
            <button type="button" class="remove-btn">×</button>
            <div class="form-group">
                <label for="social-name-${index}">Platform Name</label>
                <input type="text" class="social-name" value="${social.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="social-url-${index}">Profile URL</label>
                <input type="url" class="social-url" value="${social.url || ''}" required>
            </div>
            <div class="form-group">
                <label for="social-icon-${index}">Font Awesome Icon Name</label>
                <input type="text" class="social-icon" value="${social.icon || ''}" required>
                <small>e.g. "linkedin", "twitter", "github" (without the "fa-" prefix)</small>
            </div>
        `;
        container.appendChild(div);

        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this social media?')) {
                container.removeChild(div);
            }
        });
    }

    function saveData() {
        const formData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            about: document.getElementById('about').value,
            skills: [],
            education: [], // Now an array
            languages: [],
            experience: [],
            contact: {
                phone: document.getElementById('contact-phone').value,
                email: document.getElementById('contact-email').value,
                website: document.getElementById('contact-website').value,
                address: document.getElementById('contact-address').value,
                social: []
            }
        };

        // Collect skills
        const skillItems = document.getElementById('skills-container').children;
        for (let i = 0; i < skillItems.length; i++) {
            formData.skills.push({
                name: skillItems[i].querySelector('.skill-name').value,
                level: parseInt(skillItems[i].querySelector('.skill-level').value)
            });
        }

        // Collect education
        const educationItems = document.getElementById('education-container').children;
        for (let i = 0; i < educationItems.length; i++) {
            formData.education.push({
                degree: educationItems[i].querySelector('.education-degree').value,
                university: educationItems[i].querySelector('.education-university').value,
                address: educationItems[i].querySelector('.education-address').value,
                years: educationItems[i].querySelector('.education-years').value
            });
        }

        // Collect languages
        const languageItems = document.getElementById('languages-container').children;
        for (let i = 0; i < languageItems.length; i++) {
            formData.languages.push({
                name: languageItems[i].querySelector('.language-name').value,
                level: parseInt(languageItems[i].querySelector('.language-level').value)
            });
        }

        // Collect experience
        const expItems = document.getElementById('experience-container').children;
        for (let i = 0; i < expItems.length; i++) {
            formData.experience.push({
                title: expItems[i].querySelector('.exp-title').value,
                period: expItems[i].querySelector('.exp-period').value,
                company: expItems[i].querySelector('.exp-company').value,
                description: expItems[i].querySelector('.exp-description').value
            });
        }

        // Collect social media
        const socialItems = document.getElementById('social-container').children;
        for (let i = 0; i < socialItems.length; i++) {
            formData.contact.social.push({
                name: socialItems[i].querySelector('.social-name').value,
                url: socialItems[i].querySelector('.social-url').value,
                icon: socialItems[i].querySelector('.social-icon').value
            });
        }

        // Convert to JSON and download
        const jsonData = JSON.stringify(formData, null, 2);
        downloadJSON(jsonData);
    }

    function downloadJSON(jsonData) {
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        alert('Data saved successfully! Downloading data.json file.');
    }
});