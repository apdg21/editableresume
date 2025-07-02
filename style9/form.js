document.addEventListener('DOMContentLoaded', () => {
    const resumeForm = document.getElementById('resume-form');

    // Containers for dynamic lists
    const experienceList = document.getElementById('experience-form-list');
    const educationList = document.getElementById('education-form-list');
    const skillsList = document.getElementById('skills-form-list');
    const languagesList = document.getElementById('languages-form-list');
    const referencesList = document.getElementById('references-form-list');
    const socialLinksList = document.getElementById('social-links-form-list');

    // Add Item Buttons
    document.getElementById('add-experience-btn').addEventListener('click', () => addExperienceItem());
    document.getElementById('add-education-btn').addEventListener('click', () => addEducationItem());
    document.getElementById('add-skill-btn').addEventListener('click', () => addSkillItem());
    document.getElementById('add-language-btn').addEventListener('click', () => addLanguageItem());
    document.getElementById('add-reference-btn').addEventListener('click', () => addReferenceItem());
    document.getElementById('add-social-link-btn').addEventListener('click', () => addSocialLinkItem());

    // Load existing data
    loadResumeData();

    // --- Data Loading and Form Population ---
    function loadResumeData() {
        fetch('data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => populateForm(data))
            .catch(error => {
                console.error('Error loading resume data:', error);
                alert('Failed to load data.json. Starting with an empty form.');
                // Optionally populate with a few empty items to start
                populateForm({});
            });
    }

    function populateForm(data) {
        // Basic Info
        document.getElementById('htmlTitle').value = data.htmlTitle || '';
        document.getElementById('header').value = data.header || '';
        document.getElementById('about').value = data.about || '';
        document.getElementById('profilePhoto').value = data.profilePhoto || '';
        document.getElementById('contact').value = data.contact || '';
        document.getElementById('footer').value = data.footer || '';

        // Clear existing dynamic lists
        experienceList.innerHTML = '';
        educationList.innerHTML = '';
        skillsList.innerHTML = '';
        languagesList.innerHTML = '';
        referencesList.innerHTML = '';
        socialLinksList.innerHTML = '';

        // Populate dynamic lists
        (data.experience || []).forEach(addExperienceItem);
        (data.education || []).forEach(addEducationItem);
        (data.skills || []).forEach(addSkillItem);
        (data.languages || []).forEach(addLanguageItem);
        (data.references || []).forEach(addReferenceItem);
        (data.socialLinks || []).forEach(addSocialLinkItem);
    }

    // --- Dynamic Item Generation Functions ---

    function createRemoveButton() {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'remove-item-btn';
        button.innerHTML = '<i class="fas fa-trash"></i> Remove';
        button.addEventListener('click', (event) => {
            event.target.closest('.dynamic-list-item').remove();
        });
        return button;
    }

    function addExperienceItem(exp = {}) {
        const div = document.createElement('div');
        div.className = 'dynamic-list-item';
        div.innerHTML = `
            <div class="form-group">
                <label>Position</label>
                <input type="text" class="exp-position" value="${exp.position || ''}" placeholder="e.g., Senior Developer">
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" class="exp-company" value="${exp.company || ''}" placeholder="e.g., Tech Solutions">
            </div>
            <div class="form-group">
                <label>Duration</label>
                <input type="text" class="exp-duration" value="${exp.duration || ''}" placeholder="e.g., 2019 - Present">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea class="exp-description" placeholder="Key responsibilities and achievements">${exp.description || ''}</textarea>
            </div>
            <div class="item-actions"></div>
        `;
        div.querySelector('.item-actions').appendChild(createRemoveButton());
        experienceList.appendChild(div);
    }

    function addEducationItem(edu = {}) {
        const div = document.createElement('div');
        div.className = 'dynamic-list-item';
        div.innerHTML = `
            <div class="form-group">
                <label>Degree</label>
                <input type="text" class="edu-degree" value="${edu.degree || ''}" placeholder="e.g., B.Sc. Computer Science">
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" class="edu-institution" value="${edu.institution || ''}" placeholder="e.g., State University">
            </div>
            <div class="form-group">
                <label>Year</label>
                <input type="text" class="edu-year" value="${edu.year || ''}" placeholder="e.g., 2016">
            </div>
            <div class="item-actions"></div>
        `;
        div.querySelector('.item-actions').appendChild(createRemoveButton());
        educationList.appendChild(div);
    }

    function addSkillItem(skill = '') {
        const div = document.createElement('div');
        div.className = 'dynamic-list-item';
        div.innerHTML = `
            <div class="form-group">
                <label>Skill</label>
                <input type="text" class="skill-name" value="${skill || ''}" placeholder="e.g., JavaScript">
            </div>
            <div class="item-actions"></div>
        `;
        div.querySelector('.item-actions').appendChild(createRemoveButton());
        skillsList.appendChild(div);
    }

    function addLanguageItem(lang = '') {
        const div = document.createElement('div');
        div.className = 'dynamic-list-item';
        div.innerHTML = `
            <div class="form-group">
                <label>Language</label>
                <input type="text" class="lang-name" value="${lang || ''}" placeholder="e.g., English">
            </div>
            <div class="item-actions"></div>
        `;
        div.querySelector('.item-actions').appendChild(createRemoveButton());
        languagesList.appendChild(div);
    }

    function addReferenceItem(ref = {}) {
        const div = document.createElement('div');
        div.className = 'dynamic-list-item';
        div.innerHTML = `
            <div class="form-group">
                <label>Name</label>
                <input type="text" class="ref-name" value="${ref.name || ''}" placeholder="e.g., Jane Smith">
            </div>
            <div class="form-group">
                <label>Contact</label>
                <input type="text" class="ref-contact" value="${ref.contact || ''}" placeholder="e.g., jane.smith@example.com">
            </div>
            <div class="form-group">
                <label>Relationship (Optional)</label>
                <input type="text" class="ref-relationship" value="${ref.relationship || ''}" placeholder="e.g., Former Manager">
            </div>
            <div class="item-actions"></div>
        `;
        div.querySelector('.item-actions').appendChild(createRemoveButton());
        referencesList.appendChild(div);
    }

    function addSocialLinkItem(link = {}) {
        const div = document.createElement('div');
        div.className = 'dynamic-list-item';
        div.innerHTML = `
            <div class="form-group">
                <label>Platform Name</label>
                <input type="text" class="social-name" value="${link.name || ''}" placeholder="e.g., Facebook, Twitter, LinkedIn">
            </div>
            <div class="form-group">
                <label>URL</label>
                <input type="url" class="social-url" value="${link.url || ''}" placeholder="e.g., https://facebook.com/yourprofile">
            </div>
            <div class="item-actions"></div>
        `;
        div.querySelector('.item-actions').appendChild(createRemoveButton());
        socialLinksList.appendChild(div);
    }

    // --- Form Submission and Data Collection ---
    resumeForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const formData = collectFormData();
        saveFormData(formData);
    });

    function collectFormData() {
        const data = {};

        // Basic Info
        data.htmlTitle = document.getElementById('htmlTitle').value;
        data.header = document.getElementById('header').value;
        data.about = document.getElementById('about').value;
        data.profilePhoto = document.getElementById('profilePhoto').value;
        data.contact = document.getElementById('contact').value;
        data.footer = document.getElementById('footer').value;

        // Experience
        data.experience = Array.from(experienceList.children).map(item => ({
            position: item.querySelector('.exp-position').value,
            company: item.querySelector('.exp-company').value,
            duration: item.querySelector('.exp-duration').value,
            description: item.querySelector('.exp-description').value
        }));

        // Education
        data.education = Array.from(educationList.children).map(item => ({
            degree: item.querySelector('.edu-degree').value,
            institution: item.querySelector('.edu-institution').value,
            year: item.querySelector('.edu-year').value
        }));

        // Skills
        data.skills = Array.from(skillsList.children).map(item =>
            item.querySelector('.skill-name').value
        ).filter(skill => skill.trim() !== ''); // Filter out empty skills

        // Languages
        data.languages = Array.from(languagesList.children).map(item =>
            item.querySelector('.lang-name').value
        ).filter(lang => lang.trim() !== ''); // Filter out empty languages

        // References
        data.references = Array.from(referencesList.children).map(item => ({
            name: item.querySelector('.ref-name').value,
            contact: item.querySelector('.ref-contact').value,
            relationship: item.querySelector('.ref-relationship').value
        }));

        // Social Links (Note: The 'icon' property is derived in main.js, not stored here)
        data.socialLinks = Array.from(socialLinksList.children).map(item => ({
            name: item.querySelector('.social-name').value,
            url: item.querySelector('.social-url').value
        })).filter(link => link.name.trim() !== '' && link.url.trim() !== ''); // Filter out empty links

        return data;
    }

    function saveFormData(data) {
        const jsonString = JSON.stringify(data, null, 2); // Pretty print JSON

        // Create a Blob containing the JSON data
        const blob = new Blob([jsonString], { type: 'application/json' });

        // Create a download link
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'data.json'; // Suggest filename
        document.body.appendChild(a); // Append to body (required for Firefox)
        a.click(); // Programmatically click the link to trigger download
        document.body.removeChild(a); // Clean up
        URL.revokeObjectURL(a.href); // Release object URL

        alert('Resume data saved as data.json! You can replace your existing data.json file with this one.');
    }
});
