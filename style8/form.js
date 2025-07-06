document.addEventListener('DOMContentLoaded', function() {
    // Initialize remove buttons for existing items
    document.querySelectorAll('.item-card').forEach(card => {
        addRemoveListener(card);
    });

    // Initialize range sliders for existing skills
    document.querySelectorAll('.range-slider').forEach(slider => {
        slider.addEventListener('input', function() {
            this.nextElementSibling.textContent = this.value;
        });
    });

    // Helper function to add form items
    function addFormItem(containerId, itemType, html) {
        const container = document.getElementById(containerId);
        const index = container.querySelectorAll('.item-card').length;
        
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = html + '<button type="button" class="remove-btn">Remove</button>';
        
        container.appendChild(div);
        addRemoveListener(div);

        // If this is a skill item, add range slider listener
        if (containerId === 'skillsContainer') {
            const slider = div.querySelector('input[type="range"]');
            const valueSpan = div.querySelector('.range-value');
            if (slider && valueSpan) {
                slider.addEventListener('input', function() {
                    valueSpan.textContent = this.value;
                });
            }
        }
    }

    // Remove item functionality
    function addRemoveListener(element) {
        const removeBtn = element.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', function() {
                element.remove();
            });
        }
    }

    // Add Experience
    document.getElementById('addExperience').addEventListener('click', function() {
        const container = document.getElementById('experienceContainer');
        const index = container.querySelectorAll('.item-card').length;
        addFormItem('experienceContainer', 'experience', `
            <div class="form-row">
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" name="experience[${index}][date]" placeholder="e.g. 2020 - Present" required>
                </div>
                <div class="form-group">
                    <label>Job Title</label>
                    <input type="text" name="experience[${index}][title]" placeholder="e.g. Senior Developer" required>
                </div>
            </div>
            <div class="form-group">
                <label>Company</label>
                <input type="text" name="experience[${index}][company]" placeholder="Company Name" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="experience[${index}][description]" required placeholder="Describe your responsibilities and achievements"></textarea>
            </div>
        `);
    });

    // Add Education
    document.getElementById('addEducation').addEventListener('click', function() {
        const container = document.getElementById('educationContainer');
        const index = container.querySelectorAll('.item-card').length;
        addFormItem('educationContainer', 'education', `
            <div class="form-row">
                <div class="form-group">
                    <label>Date</label>
                    <input type="text" name="education[${index}][date]" placeholder="e.g. 2016 - 2020" required>
                </div>
                <div class="form-group">
                    <label>Degree</label>
                    <input type="text" name="education[${index}][degree]" placeholder="e.g. Bachelor of Science" required>
                </div>
            </div>
            <div class="form-group">
                <label>Institution</label>
                <input type="text" name="education[${index}][institution]" placeholder="University Name" required>
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea name="education[${index}][description]" placeholder="Additional details about your education"></textarea>
            </div>
        `);
    });

    // Add Skill
    document.getElementById('addSkill').addEventListener('click', function() {
        const container = document.getElementById('skillsContainer');
        const index = container.querySelectorAll('.item-card').length;
        
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
            <div class="form-row">
                <div class="form-group">
                    <label>Skill Name</label>
                    <input type="text" name="skills[${index}][name]" placeholder="e.g. JavaScript" required>
                </div>
                <div class="form-group">
                    <label>Icon Class</label>
                    <input type="text" name="skills[${index}][icon]" placeholder="e.g. fab fa-js" required>
                </div>
            </div>
            <div class="form-group">
                <label>Skill Level (0-100)</label>
                <div class="range-container">
                    <input type="range" name="skills[${index}][level]" min="0" max="100" value="50" class="range-slider" required>
                    <span class="range-value">50</span>
                </div>
            </div>
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        container.appendChild(div);
        addRemoveListener(div);
        
        // Add range slider functionality
        const slider = div.querySelector('input[type="range"]');
        const valueSpan = div.querySelector('.range-value');
        slider.addEventListener('input', function() {
            valueSpan.textContent = this.value;
        });
    });

    // Add Reference
    document.getElementById('addReference').addEventListener('click', function() {
        const container = document.getElementById('referencesContainer');
        const index = container.querySelectorAll('.item-card').length;
        addFormItem('referencesContainer', 'references', `
            <div class="form-group">
                <label>Reference Photo URL</label>
                <input type="url" name="references[${index}][photo]" placeholder="https://example.com/photo.jpg" required>
                <p class="help-text">Use a square profile photo (e.g. from <a href="https://randomuser.me" target="_blank">randomuser.me</a>)</p>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label>Name</label>
                    <input type="text" name="references[${index}][name]" placeholder="Reference Name" required>
                </div>
                <div class="form-group">
                    <label>Position</label>
                    <input type="text" name="references[${index}][position]" placeholder="Position at Company" required>
                </div>
            </div>
            <div class="form-group">
                <label>Contact</label>
                <input type="text" name="references[${index}][contact]" placeholder="email@example.com" required>
            </div>
            <div class="form-group">
                <label>Reference Text</label>
                <textarea name="references[${index}][text]" required placeholder="Reference's testimonial about you"></textarea>
            </div>
        `);
    });

    // Add Language
    document.getElementById('addLanguage').addEventListener('click', function() {
        const container = document.getElementById('languagesContainer');
        const index = container.querySelectorAll('.item-card').length;
        addFormItem('languagesContainer', 'languages', `
            <div class="form-row">
                <div class="form-group">
                    <label>Language</label>
                    <input type="text" name="languages[${index}][name]" placeholder="e.g. Spanish" required>
                </div>
                <div class="form-group">
                    <label>Proficiency Level</label>
                    <select name="languages[${index}][level]" required>
                        <option value="Native">Native</option>
                        <option value="Fluent">Fluent</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Basic">Basic</option>
                    </select>
                </div>
            </div>
        `);
    });

    // Add Social Link
    document.getElementById('addSocialLink').addEventListener('click', function() {
        const container = document.getElementById('socialLinksContainer');
        const index = container.querySelectorAll('.item-card').length;
        addFormItem('socialLinksContainer', 'socialLinks', `
            <div class="form-row">
                <div class="form-group">
                    <label>Platform</label>
                    <select name="socialLinks[${index}][platform]" required>
                        <option value="github">GitHub</option>
                        <option value="linkedin">LinkedIn</option>
                        <option value="twitter">Twitter</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>URL</label>
                    <input type="url" name="socialLinks[${index}][url]" placeholder="https://example.com/yourprofile" required>
                </div>
            </div>
        `);
    });

    // Load Data Button functionality
    document.getElementById('loadDataBtn').addEventListener('click', function() {
        document.getElementById('fileInput').value = ''; // Clear previous file selection
        document.getElementById('fileInput').click();
    });

    document.getElementById('fileInput').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                populateForm(data);
            } catch (error) {
                console.error('JSON parsing error:', error);
                alert('Error parsing JSON file: ' + error.message);
            }
        };
        reader.readAsText(file);
    });

    function populateForm(data) {
        try {
            console.log('Populating form with data:', data);

            // Basic Information
            document.getElementById('pageTitle').value = data.pageTitle || '';
            document.getElementById('fullName').value = data.hero?.title || '';
            document.getElementById('professionalTitle').value = data.hero?.subtitle || '';
            document.getElementById('aboutText').value = data.hero?.description || data.about?.text || '';

            // Contact Information
            const emailItem = data.contact?.items?.find(item => item.icon === 'fas fa-envelope');
            const phoneItem = data.contact?.items?.find(item => item.icon === 'fas fa-phone');
            document.getElementById('contactEmail').value = emailItem?.text || '';
            document.getElementById('contactPhone').value = phoneItem?.text || '';
            document.getElementById('mapEmbedUrl').value = data.contact?.mapEmbedUrl || '';

            const locationItem = data.about?.personalInfo?.find(item => item.label === 'Location');
            document.getElementById('location').value = locationItem?.value || '';

            // Clear existing items
            ['experienceContainer', 'educationContainer', 'skillsContainer', 'referencesContainer', 'languagesContainer', 'socialLinksContainer'].forEach(id => {
                document.getElementById(id).innerHTML = '';
            });

            // Populate Experience
            if (Array.isArray(data.experience)) {
                data.experience.forEach(exp => {
                    document.getElementById('addExperience').click();
                });
                const container = document.getElementById('experienceContainer');
                data.experience.forEach((exp, index) => {
                    const card = container.children[index];
                    card.querySelector(`input[name="experience[${index}][date]"]`).value = exp.date || '';
                    card.querySelector(`input[name="experience[${index}][title]"]`).value = exp.title || '';
                    card.querySelector(`input[name="experience[${index}][company]"]`).value = exp.company || '';
                    card.querySelector(`textarea[name="experience[${index}][description]"]`).value = exp.description || '';
                });
            }

            // Populate Education
            if (Array.isArray(data.education)) {
                data.education.forEach(() => {
                    document.getElementById('addEducation').click();
                });
                const container = document.getElementById('educationContainer');
                data.education.forEach((edu, index) => {
                    const card = container.children[index];
                    card.querySelector(`input[name="education[${index}][date]"]`).value = edu.date || '';
                    card.querySelector(`input[name="education[${index}][degree]"]`).value = edu.degree || '';
                    card.querySelector(`input[name="education[${index}][institution]"]`).value = edu.institution || '';
                    card.querySelector(`textarea[name="education[${index}][description]"]`).value = edu.description || '';
                });
            }

            // Populate Skills
            if (Array.isArray(data.skills)) {
                data.skills.forEach(() => {
                    document.getElementById('addSkill').click();
                });
                const container = document.getElementById('skillsContainer');
                data.skills.forEach((skill, index) => {
                    const card = container.children[index];
                    card.querySelector(`input[name="skills[${index}][name]"]`).value = skill.name || '';
                    card.querySelector(`input[name="skills[${index}][icon]"]`).value = skill.icon || '';
                    card.querySelector(`input[name="skills[${index}][level]"]`).value = skill.level || '50';
                    card.querySelector('.range-value').textContent = skill.level || '50';
                });
            }

            // Populate References
            if (Array.isArray(data.references)) {
                data.references.forEach(() => {
                    document.getElementById('addReference').click();
                });
                const container = document.getElementById('referencesContainer');
                data.references.forEach((ref, index) => {
                    const card = container.children[index];
                    card.querySelector(`input[name="references[${index}][photo]"]`).value = ref.photo || '';
                    card.querySelector(`input[name="references[${index}][name]"]`).value = ref.name || '';
                    card.querySelector(`input[name="references[${index}][position]"]`).value = ref.position || '';
                    card.querySelector(`input[name="references[${index}][contact]"]`).value = ref.contact || '';
                    card.querySelector(`textarea[name="references[${index}][text]"]`).value = ref.text || '';
                });
            }

            // Populate Languages
            if (Array.isArray(data.languages)) {
                data.languages.forEach(() => {
                    document.getElementById('addLanguage').click();
                });
                const container = document.getElementById('languagesContainer');
                data.languages.forEach((lang, index) => {
                    const card = container.children[index];
                    card.querySelector(`input[name="languages[${index}][name]"]`).value = lang.name || '';
                    card.querySelector(`select[name="languages[${index}][level]"]`).value = lang.level || 'Native';
                });
            }

            // Populate Social Links
            if (Array.isArray(data.footer?.socialLinks)) {
                data.footer.socialLinks.forEach(() => {
                    document.getElementById('addSocialLink').click();
                });
                const container = document.getElementById('socialLinksContainer');
                data.footer.socialLinks.forEach((social, index) => {
                    const card = container.children[index];
                    // Map icon to platform value
                    let platform = 'other';
                    if (social.icon.includes('github')) platform = 'github';
                    else if (social.icon.includes('linkedin')) platform = 'linkedin';
                    else if (social.icon.includes('twitter')) platform = 'twitter';
                    else if (social.icon.includes('instagram')) platform = 'instagram';
                    else if (social.icon.includes('facebook')) platform = 'facebook';

                    card.querySelector(`select[name="socialLinks[${index}][platform]"]`).value = platform;
                    card.querySelector(`input[name="socialLinks[${index}][url]"]`).value = social.url || '';
                });
            }

            alert('Data loaded successfully!');
        } catch (error) {
            console.error('Error populating form:', error);
            alert('Error populating form: ' + error.message);
        }
    }

    // Form submission
    document.getElementById('resumeForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Create data structure matching original data.json
        const resumeData = {
            "pageTitle": document.getElementById('pageTitle').value,
            "logoText": document.getElementById('fullName').value.substring(0, 2).toUpperCase(),
            "navigation": [
                {"text": "Home", "link": "#home"},
                {"text": "About", "link": "#about"},
                {"text": "Experience", "link": "#experience"},
                {"text": "Education", "link": "#education"},
                {"text": "Skills", "link": "#skills"}
            ],
            "hero": {
                "title": document.getElementById('fullName').value,
                "subtitle": document.getElementById('professionalTitle').value,
                "description": document.getElementById('aboutText').value,
                "profilePhoto": "assets/profile.jpg"
            },
            "downloadCvLink": "#",
            "about": {
                "text": document.getElementById('aboutText').value,
                "personalInfo": [
                    {"label": "Name", "value": document.getElementById('fullName').value},
                    {"label": "Title", "value": document.getElementById('professionalTitle').value},
                    {"label": "Email", "value": document.getElementById('contactEmail').value},
                    {"label": "Location", "value": document.getElementById('location').value}
                ]
            },
            "experience": [],
            "education": [],
            "skills": [],
            "references": [],
            "languages": [],
            "contact": {
                "items": [
                    {
                        "icon": "fas fa-envelope",
                        "text": document.getElementById('contactEmail').value,
                        "link": "mailto:" + document.getElementById('contactEmail').value
                    },
                    {
                        "icon": "fas fa-phone",
                        "text": document.getElementById('contactPhone').value,
                        "link": "tel:" + document.getElementById('contactPhone').value.replace(/[^0-9+]/g, '')
                    }
                ],
                "mapEmbedUrl": document.getElementById('mapEmbedUrl').value
            },
            "footer": {
                "socialLinks": [],
                "copyright": `© ${new Date().getFullYear()} ${document.getElementById('fullName').value}`
            }
        };

        // Process experience items
        document.querySelectorAll('#experienceContainer .item-card').forEach((card, index) => {
            resumeData.experience.push({
                "date": card.querySelector(`input[name="experience[${index}][date]"]`).value,
                "title": card.querySelector(`input[name="experience[${index}][title]"]`).value,
                "company": card.querySelector(`input[name="experience[${index}][company]"]`).value,
                "description": card.querySelector(`textarea[name="experience[${index}][description]"]`).value
            });
        });

        // Process education items
        document.querySelectorAll('#educationContainer .item-card').forEach((card, index) => {
            resumeData.education.push({
                "date": card.querySelector(`input[name="education[${index}][date]"]`).value,
                "degree": card.querySelector(`input[name="education[${index}][degree]"]`).value,
                "institution": card.querySelector(`input[name="education[${index}][institution]"]`).value,
                "description": card.querySelector(`textarea[name="education[${index}][description]"]`).value
            });
        });

        // Process skills
        document.querySelectorAll('#skillsContainer .item-card').forEach((card, index) => {
            resumeData.skills.push({
                "name": card.querySelector(`input[name="skills[${index}][name]"]`).value,
                "icon": card.querySelector(`input[name="skills[${index}][icon]"]`).value,
                "level": card.querySelector(`input[name="skills[${index}][level]"]`).value
            });
        });

        // Process references
        document.querySelectorAll('#referencesContainer .item-card').forEach((card, index) => {
            resumeData.references.push({
                "photo": card.querySelector(`input[name="references[${index}][photo]"]`).value,
                "name": card.querySelector(`input[name="references[${index}][name]"]`).value,
                "position": card.querySelector(`input[name="references[${index}][position]"]`).value,
                "contact": card.querySelector(`input[name="references[${index}][contact]"]`).value,
                "text": card.querySelector(`textarea[name="references[${index}][text]"]`).value
            });
        });

        // Process languages
        document.querySelectorAll('#languagesContainer .item-card').forEach((card, index) => {
            resumeData.languages.push({
                "name": card.querySelector(`input[name="languages[${index}][name]"]`).value,
                "level": card.querySelector(`select[name="languages[${index}][level]"]`).value
            });
        });

        // Process social links
        document.querySelectorAll('#socialLinksContainer .item-card').forEach((card, index) => {
            const platform = card.querySelector(`select[name="socialLinks[${index}][platform]"]`).value;
            const url = card.querySelector(`input[name="socialLinks[${index}][url]"]`).value;
            
            const iconMap = {
                'github': 'fab fa-github',
                'linkedin': 'fab fa-linkedin-in',
                'twitter': 'fab fa-twitter',
                'instagram': 'fab fa-instagram',
                'facebook': 'fab fa-facebook-f',
                'other': 'fas fa-link'
            };
            
            resumeData.footer.socialLinks.push({
                "icon": iconMap[platform] || 'fas fa-link',
                "url": url
            });
        });

        // Create download link
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "data.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        
        alert('Resume data saved as data.json!');
    });
});
