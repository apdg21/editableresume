document.addEventListener('DOMContentLoaded', function() {
    // Load existing data from data.json if it exists
    let profileData = {};
    try {
        const data = localStorage.getItem('profileData');
        if (data) {
            profileData = JSON.parse(data);
        } else {
            // Default data if nothing is saved
            profileData = {
                "profile_image": "assets/profile.jpg",
                "name": "John Doe",
                "title": "Web Developer & Designer",
                "about": "Passionate web developer with 5+ years of experience creating responsive and user-friendly websites. Specialized in JavaScript frameworks and UI/UX design.",
                "phone": "+1 (555) 123-4567",
                "email": "john.doe@example.com",
                "location": "San Francisco, CA",
                "languages": [
                    "English (Fluent)",
                    "Spanish (Intermediate)",
                    "French (Basic)"
                ],
                "expertise": [
                    "Frontend Development",
                    "UI/UX Design",
                    "Responsive Design",
                    "Web Accessibility",
                    "Performance Optimization",
                    "Cross-Browser Compatibility"
                ],
                "summary": "Creative problem-solver with a strong eye for design and attention to detail. Proven track record of delivering high-quality web applications that meet both user needs and business objectives.",
                "experience": [
                    {
                        "role": "Senior Frontend Developer",
                        "company": "Tech Solutions Inc. - San Francisco, CA",
                        "period": "2020 - Present",
                        "description": "Lead a team of 5 developers to build responsive web applications using React.js. Improved page load performance by 40% through code optimization and lazy loading techniques."
                    },
                    {
                        "role": "Web Developer",
                        "company": "Digital Creations LLC - New York, NY",
                        "period": "2018 - 2020",
                        "description": "Developed and maintained 15+ client websites using WordPress and custom HTML/CSS. Implemented ADA compliance standards across all projects."
                    }
                ],
                "education": [
                    {
                        "institution": "Stanford University",
                        "degree": "Master of Computer Science",
                        "year": "2016 - 2018"
                    },
                    {
                        "institution": "University of California",
                        "degree": "Bachelor of Arts in Design",
                        "year": "2012 - 2016"
                    }
                ],
                "skills": [
                    {
                        "name": "HTML/CSS",
                        "level": 95
                    },
                    {
                        "name": "JavaScript",
                        "level": 90
                    },
                    {
                        "name": "React",
                        "level": 85
                    },
                    {
                        "name": "UI/UX Design",
                        "level": 80
                    },
                    {
                        "name": "Node.js",
                        "level": 75
                    }
                ],
                "footer": {
                    "copyright": "© [year] [name]. All rights reserved.",
                    "social_links": [
                        {
                            "name": "LinkedIn",
                            "url": "https://linkedin.com/in/johndoe",
                            "icon": "fab fa-linkedin"
                        },
                        {
                            "name": "GitHub",
                            "url": "https://github.com/johndoe",
                            "icon": "fab fa-github"
                        },
                        {
                            "name": "Twitter",
                            "url": "https://twitter.com/johndoe",
                            "icon": "fab fa-twitter"
                        },
                        {
                            "name": "Email",
                            "url": "mailto:john.doe@example.com",
                            "icon": "fas fa-envelope"
                        }
                    ]
                }
            };
        }
    } catch (e) {
        console.error('Error loading profile data:', e);
    }

    // Populate form with existing data
    function populateForm() {
        document.getElementById('name').value = profileData.name || '';
        document.getElementById('title').value = profileData.title || '';
        document.getElementById('about').value = profileData.about || '';
        document.getElementById('summary').value = profileData.summary || '';
        document.getElementById('phone').value = profileData.phone || '';
        document.getElementById('email').value = profileData.email || '';
        document.getElementById('location').value = profileData.location || '';

        // Populate languages
        const languagesContainer = document.getElementById('languagesContainer');
        languagesContainer.innerHTML = '';
        (profileData.languages || []).forEach((language, index) => {
            addLanguageField(language, index);
        });

        // Populate expertise
        const expertiseContainer = document.getElementById('expertiseContainer');
        expertiseContainer.innerHTML = '';
        (profileData.expertise || []).forEach((expertise, index) => {
            addExpertiseField(expertise, index);
        });

        // Populate experience
        const experienceContainer = document.getElementById('experienceContainer');
        experienceContainer.innerHTML = '';
        (profileData.experience || []).forEach((exp, index) => {
            addExperienceField(exp, index);
        });

        // Populate education
        const educationContainer = document.getElementById('educationContainer');
        educationContainer.innerHTML = '';
        (profileData.education || []).forEach((edu, index) => {
            addEducationField(edu, index);
        });

        // Populate skills
        const skillsContainer = document.getElementById('skillsContainer');
        skillsContainer.innerHTML = '';
        (profileData.skills || []).forEach((skill, index) => {
            addSkillField(skill, index);
        });

        // Populate social links
        const socialLinksContainer = document.getElementById('socialLinksContainer');
        socialLinksContainer.innerHTML = '';
        ((profileData.footer || {}).social_links || []).forEach((link, index) => {
            addSocialLinkField(link, index);
        });
    }

    // [Keep all the existing addField functions unchanged...]
    // Add language field
    function addLanguageField(value = '', index) {
        const container = document.getElementById('languagesContainer');
        const div = document.createElement('div');
        div.className = 'language-item';
        div.innerHTML = `
            <label>Language ${index + 1}</label>
            <input type="text" name="languages[${index}]" value="${value}" required>
            <button type="button" class="remove-btn" data-index="${index}">Remove</button>
        `;
        container.appendChild(div);
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(div);
        });
    }

    // Add expertise field
    function addExpertiseField(value = '', index) {
        const container = document.getElementById('expertiseContainer');
        const div = document.createElement('div');
        div.className = 'expertise-item';
        div.innerHTML = `
            <label>Expertise ${index + 1}</label>
            <input type="text" name="expertise[${index}]" value="${value}" required>
            <button type="button" class="remove-btn" data-index="${index}">Remove</button>
        `;
        container.appendChild(div);
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(div);
        });
    }

    // Add experience field
    function addExperienceField(exp = {}, index) {
        const container = document.getElementById('experienceContainer');
        const div = document.createElement('div');
        div.className = 'experience-item';
        div.innerHTML = `
            <label>Experience ${index + 1}</label>
            <div class="form-group">
                <label for="exp_role_${index}">Role</label>
                <input type="text" id="exp_role_${index}" name="experience[${index}][role]" value="${exp.role || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp_company_${index}">Company</label>
                <input type="text" id="exp_company_${index}" name="experience[${index}][company]" value="${exp.company || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp_period_${index}">Period</label>
                <input type="text" id="exp_period_${index}" name="experience[${index}][period]" value="${exp.period || ''}" required>
            </div>
            <div class="form-group">
                <label for="exp_description_${index}">Description</label>
                <textarea id="exp_description_${index}" name="experience[${index}][description]" required>${exp.description || ''}</textarea>
            </div>
            <button type="button" class="remove-btn" data-index="${index}">Remove</button>
        `;
        container.appendChild(div);
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(div);
        });
    }

    // Add education field
    function addEducationField(edu = {}, index) {
        const container = document.getElementById('educationContainer');
        const div = document.createElement('div');
        div.className = 'education-item';
        div.innerHTML = `
            <label>Education ${index + 1}</label>
            <div class="form-group">
                <label for="edu_institution_${index}">Institution</label>
                <input type="text" id="edu_institution_${index}" name="education[${index}][institution]" value="${edu.institution || ''}" required>
            </div>
            <div class="form-group">
                <label for="edu_degree_${index}">Degree</label>
                <input type="text" id="edu_degree_${index}" name="education[${index}][degree]" value="${edu.degree || ''}" required>
            </div>
            <div class="form-group">
                <label for="edu_year_${index}">Year</label>
                <input type="text" id="edu_year_${index}" name="education[${index}][year]" value="${edu.year || ''}" required>
            </div>
            <button type="button" class="remove-btn" data-index="${index}">Remove</button>
        `;
        container.appendChild(div);
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(div);
        });
    }

    // Add skill field
    function addSkillField(skill = {}, index) {
        const container = document.getElementById('skillsContainer');
        const div = document.createElement('div');
        div.className = 'skill-item';
        div.innerHTML = `
            <label>Skill ${index + 1}</label>
            <div class="form-group">
                <label for="skill_name_${index}">Skill Name</label>
                <input type="text" id="skill_name_${index}" name="skills[${index}][name]" value="${skill.name || ''}" required>
            </div>
            <div class="form-group">
                <label for="skill_level_${index}">Skill Level (0-100)</label>
                <input type="range" id="skill_level_${index}" name="skills[${index}][level]" min="0" max="100" value="${skill.level || 50}" class="range-slider" required>
                <span>${skill.level || 50}%</span>
            </div>
            <button type="button" class="remove-btn" data-index="${index}">Remove</button>
        `;
        container.appendChild(div);
        
        const slider = div.querySelector('input[type="range"]');
        const valueSpan = div.querySelector('span');
        slider.addEventListener('input', function() {
            valueSpan.textContent = this.value + '%';
        });
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(div);
        });
    }

    // Add social link field
    function addSocialLinkField(link = {}, index) {
        const container = document.getElementById('socialLinksContainer');
        const div = document.createElement('div');
        div.className = 'social-link-item';
        
        const socialOptions = [
            {value: 'LinkedIn', text: 'LinkedIn', icon: 'fab fa-linkedin'},
            {value: 'GitHub', text: 'GitHub', icon: 'fab fa-github'},
            {value: 'Twitter', text: 'Twitter', icon: 'fab fa-twitter'},
            {value: 'Facebook', text: 'Facebook', icon: 'fab fa-facebook'},
            {value: 'Instagram', text: 'Instagram', icon: 'fab fa-instagram'},
            {value: 'Email', text: 'Email', icon: 'fas fa-envelope'},
            {value: 'Website', text: 'Website', icon: 'fas fa-globe'},
            {value: 'Other', text: 'Other', icon: 'fas fa-link'}
        ];
        
        let optionsHtml = '';
        socialOptions.forEach(option => {
            const selected = link.name === option.value ? 'selected' : '';
            optionsHtml += `<option value="${option.value}" data-icon="${option.icon}" ${selected}>${option.text}</option>`;
        });
        
        div.innerHTML = `
            <select name="social_links[${index}][name]" required>
                ${optionsHtml}
            </select>
            <input type="url" name="social_links[${index}][url]" value="${link.url || ''}" placeholder="URL" required>
            <input type="hidden" name="social_links[${index}][icon]" value="${link.icon || ''}">
            <button type="button" class="remove-btn" data-index="${index}">Remove</button>
        `;
        container.appendChild(div);
        
        const select = div.querySelector('select');
        const iconInput = div.querySelector('input[type="hidden"]');
        select.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            iconInput.value = selectedOption.getAttribute('data-icon');
        });
        
        div.querySelector('.remove-btn').addEventListener('click', function() {
            container.removeChild(div);
        });
    }

    // Add event listeners for "Add" buttons
    document.getElementById('addLanguage').addEventListener('click', function() {
        const index = document.querySelectorAll('.language-item').length;
        addLanguageField('', index);
    });

    document.getElementById('addExpertise').addEventListener('click', function() {
        const index = document.querySelectorAll('.expertise-item').length;
        addExpertiseField('', index);
    });

    document.getElementById('addExperience').addEventListener('click', function() {
        const index = document.querySelectorAll('.experience-item').length;
        addExperienceField({}, index);
    });

    document.getElementById('addEducation').addEventListener('click', function() {
        const index = document.querySelectorAll('.education-item').length;
        addEducationField({}, index);
    });

    document.getElementById('addSkill').addEventListener('click', function() {
        const index = document.querySelectorAll('.skill-item').length;
        addSkillField({}, index);
    });

    document.getElementById('addSocialLink').addEventListener('click', function() {
        const index = document.querySelectorAll('.social-link-item').length;
        addSocialLinkField({}, index);
    });

    // Form submission handler
    document.getElementById('profileForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            title: document.getElementById('title').value,
            about: document.getElementById('about').value,
            summary: document.getElementById('summary').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('email').value,
            location: document.getElementById('location').value,
            languages: [],
            expertise: [],
            experience: [],
            education: [],
            skills: [],
            footer: {
                social_links: []
            }
        };
        
        // Collect languages
        document.querySelectorAll('input[name^="languages["]').forEach(input => {
            formData.languages.push(input.value);
        });
        
        // Collect expertise
        document.querySelectorAll('input[name^="expertise["]').forEach(input => {
            formData.expertise.push(input.value);
        });
        
        // Collect experience
        document.querySelectorAll('.experience-item').forEach((item, index) => {
            formData.experience.push({
                role: item.querySelector(`input[name="experience[${index}][role]"]`).value,
                company: item.querySelector(`input[name="experience[${index}][company]"]`).value,
                period: item.querySelector(`input[name="experience[${index}][period]"]`).value,
                description: item.querySelector(`textarea[name="experience[${index}][description]"]`).value
            });
        });
        
        // Collect education
        document.querySelectorAll('.education-item').forEach((item, index) => {
            formData.education.push({
                institution: item.querySelector(`input[name="education[${index}][institution]"]`).value,
                degree: item.querySelector(`input[name="education[${index}][degree]"]`).value,
                year: item.querySelector(`input[name="education[${index}][year]"]`).value
            });
        });
        
        // Collect skills
        document.querySelectorAll('.skill-item').forEach((item, index) => {
            formData.skills.push({
                name: item.querySelector(`input[name="skills[${index}][name]"]`).value,
                level: parseInt(item.querySelector(`input[name="skills[${index}][level]"]`).value)
            });
        });
        
        // Collect social links
        document.querySelectorAll('.social-link-item').forEach((item, index) => {
            formData.footer.social_links.push({
                name: item.querySelector(`select[name="social_links[${index}][name]"]`).value,
                url: item.querySelector(`input[name="social_links[${index}][url]"]`).value,
                icon: item.querySelector(`input[name="social_links[${index}][icon]"]`).value
            });
        });
        
        // Add copyright (assuming current year)
        const currentYear = new Date().getFullYear();
        formData.footer.copyright = `© ${currentYear} ${formData.name}. All rights reserved.`;

        // Save to localStorage
        localStorage.setItem('profileData', JSON.stringify(formData, null, 2));
        
        // Create download link for data.json
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(formData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "data.json");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        
        alert('Profile saved successfully! data.json file downloaded.');
    });

    // Initialize the form with existing data
    populateForm();
});