document.addEventListener('DOMContentLoaded', function() {
    // Load data from data.json
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            populateForm(data);
            setupEventListeners();
        })
        .catch(error => {
            console.error('Error loading data:', error);
            setupEventListeners(); // Still setup listeners even if load fails
        });

    function populateForm(data) {
        // Basic Info
        document.getElementById('name').value = data.name || '';
        document.getElementById('title').value = data.title || '';
        document.getElementById('about').value = data.about || '';

        // Skills
        const skillsContainer = document.getElementById('skills-container');
        data.skills.forEach((skill, index) => {
            addSkillField(skillsContainer, skill, index);
        });

        // Education
        document.getElementById('education-degree').value = data.education.degree || '';
        document.getElementById('education-university').value = data.education.university || '';
        document.getElementById('education-address').value = data.education.address || '';
        document.getElementById('education-years').value = data.education.years || '';

        // Languages
        const languagesContainer = document.getElementById('languages-container');
        data.languages.forEach((language, index) => {
            addLanguageField(languagesContainer, language, index);
        });

        // Experience
        const experienceContainer = document.getElementById('experience-container');
        data.experience.forEach((exp, index) => {
            addExperienceField(experienceContainer, exp, index);
        });

        // Contact
        document.getElementById('contact-phone').value = data.contact.phone || '';
        document.getElementById('contact-email').value = data.contact.email || '';
        document.getElementById('contact-website').value = data.contact.website || '';
        document.getElementById('contact-address').value = data.contact.address || '';

        // Social Media
        const socialContainer = document.getElementById('social-container');
        data.contact.social.forEach((social, index) => {
            addSocialField(socialContainer, social, index);
        });
    }

    function setupEventListeners() {
        // Add Skill
        document.getElementById('add-skill').addEventListener('click', function() {
            const container = document.getElementById('skills-container');
            addSkillField(container, {}, container.children.length);
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
            if (confirm('Are you sure you want to reset all form data?')) {
                fetch('data.json')
                    .then(response => response.json())
                    .then(data => populateForm(data))
                    .catch(() => {
                        // If loading fails, just clear the form
                        document.getElementById('portfolio-form').reset();
                        ['skills-container', 'languages-container', 'experience-container', 'social-container']
                            .forEach(id => document.getElementById(id).innerHTML = '');
                    });
            }
        });

        // Save Form
        document.getElementById('portfolio-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveData();
        });
    }

    function addSkillField(container, skill = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <button type="button" class="remove-btn" data-index="${index}">×</button>
            <div class="form-group">
                <label for="skill-name-${index}">Skill Name</label>
                <input type="text" id="skill-name-${index}" value="${skill.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="skill-level-${index}">Skill Level (0-100)</label>
                <input type="number" id="skill-level-${index}" min="0" max="100" value="${skill.level || ''}" required>
            </div>
        `;
        container.appendChild(div);

        // Add remove event listener
        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this skill?')) {
                container.removeChild(div);
            }
        });
    }

    function addLanguageField(container, language = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <button type="button" class="remove-btn" data-index="${index}">×</button>
            <div class="form-group">
                <label for="language-name-${index}">Language Name</label>
                <input type="text" id="language-name-${index}" value="${language.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="language-level-${index}">Proficiency Level (0-100)</label>
                <input type="number" id="language-level-${index}" min="0" max="100" value="${language.level || ''}" required>
            </div>
        `;
        container.appendChild(div);

        // Add remove event listener
        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this language?')) {
                container.removeChild(div);
            }
        });
    }

    function addExperienceField(container, experience = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <button type="button" class="remove-btn" data-index="${index}">×</button>
            <div class="form-group">
                <label for="exp-title-${index}">Job Title</label>
                <input type="text" id="exp-title-${index}" value="${experience.title || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp-period-${index}">Period</label>
                <input type="text" id="exp-period-${index}" value="${experience.period || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp-company-${index}">Company</label>
                <input type="text" id="exp-company-${index}" value="${experience.company || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp-description-${index}">Description</label>
                <textarea id="exp-description-${index}" required>${experience.description || ''}</textarea>
            </div>
        `;
        container.appendChild(div);

        // Add remove event listener
        div.querySelector('.remove-btn').addEventListener('click', function() {
            if (confirm('Are you sure you want to remove this experience?')) {
                container.removeChild(div);
            }
        });
    }

    function addSocialField(container, social = {}, index) {
        const div = document.createElement('div');
        div.className = 'array-item';
        div.innerHTML = `
            <button type="button" class="remove-btn" data-index="${index}">×</button>
            <div class="form-group">
                <label for="social-name-${index}">Platform Name</label>
                <input type="text" id="social-name-${index}" value="${social.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="social-url-${index}">Profile URL</label>
                <input type="url" id="social-url-${index}" value="${social.url || ''}" required>
            </div>
            <div class="form-group">
                <label for="social-icon-${index}">Font Awesome Icon Name</label>
                <input type="text" id="social-icon-${index}" value="${social.icon || ''}" required>
                <small>e.g. "linkedin", "twitter", "github" (without the "fa-" prefix)</small>
            </div>
        `;
        container.appendChild(div);

        // Add remove event listener
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
            education: {
                degree: document.getElementById('education-degree').value,
                university: document.getElementById('education-university').value,
                address: document.getElementById('education-address').value,
                years: document.getElementById('education-years').value
            },
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
                name: document.getElementById(`skill-name-${i}`).value,
                level: parseInt(document.getElementById(`skill-level-${i}`).value)
            });
        }

        // Collect languages
        const languageItems = document.getElementById('languages-container').children;
        for (let i = 0; i < languageItems.length; i++) {
            formData.languages.push({
                name: document.getElementById(`language-name-${i}`).value,
                level: parseInt(document.getElementById(`language-level-${i}`).value)
            });
        }

        // Collect experience
        const expItems = document.getElementById('experience-container').children;
        for (let i = 0; i < expItems.length; i++) {
            formData.experience.push({
                title: document.getElementById(`exp-title-${i}`).value,
                period: document.getElementById(`exp-period-${i}`).value,
                company: document.getElementById(`exp-company-${i}`).value,
                description: document.getElementById(`exp-description-${i}`).value
            });
        }

        // Collect social media
        const socialItems = document.getElementById('social-container').children;
        for (let i = 0; i < socialItems.length; i++) {
            formData.contact.social.push({
                name: document.getElementById(`social-name-${i}`).value,
                url: document.getElementById(`social-url-${i}`).value,
                icon: document.getElementById(`social-icon-${i}`).value
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