document.addEventListener('DOMContentLoaded', function() {
    // Add Experience
    document.getElementById('addExperience').addEventListener('click', function() {
        const container = document.getElementById('experienceContainer');
        const index = container.querySelectorAll('.item-card').length;
        
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
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
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        container.appendChild(div);
        addRemoveListener(div);
    });

    // Add Education
    document.getElementById('addEducation').addEventListener('click', function() {
        const container = document.getElementById('educationContainer');
        const index = container.querySelectorAll('.item-card').length;
        
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
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
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        container.appendChild(div);
        addRemoveListener(div);
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
        
        const div = document.createElement('div');
        div.className = 'item-card';
        div.innerHTML = `
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
            <button type="button" class="remove-btn">Remove</button>
        `;
        
        container.appendChild(div);
        addRemoveListener(div);
    });

    // Remove item functionality
    function addRemoveListener(element) {
        element.querySelector('.remove-btn').addEventListener('click', function() {
            element.remove();
        });
    }

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
                    {"label": "Email", "value": "your.email@example.com"},
                    {"label": "Location", "value": "City, Country"}
                ]
            },
            "experience": [],
            "education": [],
            "skills": [],
            "references": [],
            "languages": [
                {"name": "English", "level": "Fluent"}
            ],
            "contact": {
                "items": [
                    {
                        "icon": "fas fa-envelope",
                        "text": "your.email@example.com",
                        "link": "mailto:your.email@example.com"
                    },
                    {
                        "icon": "fas fa-phone",
                        "text": "+1 (123) 456-7890",
                        "link": "tel:+11234567890"
                    }
                ],
                "mapEmbedUrl": "https://maps.google.com"
            },
            "footer": {
                "socialLinks": [
                    {
                        "icon": "fab fa-linkedin-in",
                        "url": "https://linkedin.com"
                    },
                    {
                        "icon": "fab fa-github",
                        "url": "https://github.com"
                    }
                ],
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