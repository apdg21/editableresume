// Initialize with empty fields when page loads
document.addEventListener('DOMContentLoaded', function() {
  addSkillField();
  addExperienceField();
  addEducationField();
  addLanguageField();
  addProjectField();
  addSocialField();
});

// ===== SKILLS =====
function addSkillField(skill = { name: '', level: 50 }) {
  const container = document.getElementById('skills-container');
  const id = Date.now();
  
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-section" id="skill-${id}">
      <div class="two-column">
        <div>
          <label>Skill Name</label>
          <input type="text" class="skill-name" value="${skill.name}" placeholder="e.g., JavaScript" required>
        </div>
        <div>
          <label>Proficiency Level</label>
          <div class="skill-level">
            <input type="range" class="skill-level-input" min="0" max="100" value="${skill.level}">
            <span class="skill-level-value">${skill.level}</span>%
          </div>
        </div>
      </div>
      <button type="button" onclick="document.getElementById('skill-${id}').remove()" class="remove-btn">
        <i class="fas fa-trash"></i> Remove Skill
      </button>
    </div>
  `);
  
  // Add event listener for the range input
  const levelInput = container.querySelector(`#skill-${id} .skill-level-input`);
  const levelValue = container.querySelector(`#skill-${id} .skill-level-value`);
  
  levelInput.addEventListener('input', function() {
    levelValue.textContent = this.value;
  });
}

// ===== EXPERIENCE =====
function addExperienceField(exp = {
  position: '',
  company: '',
  startDate: '',
  endDate: '',
  description: '',
  details: ['']
}) {
  const container = document.getElementById('experience-container');
  const id = Date.now();
  
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-section" id="exp-${id}">
      <h3>Work Experience</h3>
      <div class="two-column">
        <div>
          <label>Position</label>
          <input type="text" class="exp-position" value="${exp.position}" placeholder="e.g., Senior Developer" required>
        </div>
        <div>
          <label>Company</label>
          <input type="text" class="exp-company" value="${exp.company}" required>
        </div>
      </div>
      
      <div class="two-column">
        <div>
          <label>Start Date</label>
          <input type="text" class="exp-start" value="${exp.startDate}" placeholder="e.g., Jan 2020" required>
        </div>
        <div>
          <label>End Date</label>
          <input type="text" class="exp-end" value="${exp.endDate}" placeholder="e.g., Present">
        </div>
      </div>
      
      <label>Brief Description</label>
      <input type="text" class="exp-description" value="${exp.description}">
      
      <label>Key Responsibilities/Achievements (one per line)</label>
      <textarea class="exp-details" placeholder="Enter each detail on a new line">${exp.details.join('\n')}</textarea>
      
      <button type="button" onclick="document.getElementById('exp-${id}').remove()" class="remove-btn">
        <i class="fas fa-trash"></i> Remove Experience
      </button>
    </div>
  `);
}

// ===== EDUCATION =====
function addEducationField(edu = {
  degree: '',
  institution: '',
  location: '',
  year: ''
}) {
  const container = document.getElementById('education-container');
  const id = Date.now();
  
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-section" id="edu-${id}">
      <h3>Education</h3>
      <label>Degree/Certification</label>
      <input type="text" class="edu-degree" value="${edu.degree}" placeholder="e.g., Bachelor of Science" required>
      
      <label>Institution</label>
      <input type="text" class="edu-institution" value="${edu.institution}" required>
      
      <div class="two-column">
        <div>
          <label>Location</label>
          <input type="text" class="edu-location" value="${edu.location}">
        </div>
        <div>
          <label>Year/Duration</label>
          <input type="text" class="edu-year" value="${edu.year}" placeholder="e.g., 2015-2019" required>
        </div>
      </div>
      
      <button type="button" onclick="document.getElementById('edu-${id}').remove()" class="remove-btn">
        <i class="fas fa-trash"></i> Remove Education
      </button>
    </div>
  `);
}

// ===== LANGUAGES =====
function addLanguageField(lang = { name: '', level: 50 }) {
  const container = document.getElementById('languages-container');
  const id = Date.now();
  
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-section" id="lang-${id}">
      <div class="two-column">
        <div>
          <label>Language</label>
          <input type="text" class="lang-name" value="${lang.name}" placeholder="e.g., Spanish" required>
        </div>
        <div>
          <label>Proficiency Level</label>
          <div class="skill-level">
            <input type="range" class="lang-level-input" min="0" max="100" value="${lang.level}">
            <span class="lang-level-value">${lang.level}</span>%
          </div>
        </div>
      </div>
      <button type="button" onclick="document.getElementById('lang-${id}').remove()" class="remove-btn">
        <i class="fas fa-trash"></i> Remove Language
      </button>
    </div>
  `);
  
  // Add event listener for the range input
  const levelInput = container.querySelector(`#lang-${id} .lang-level-input`);
  const levelValue = container.querySelector(`#lang-${id} .lang-level-value`);
  
  levelInput.addEventListener('input', function() {
    levelValue.textContent = this.value;
  });
}

// ===== PROJECTS =====
function addProjectField(project = {
  name: '',
  description: '',
  liveUrl: '',
  codeUrl: ''
}) {
  const container = document.getElementById('projects-container');
  const id = Date.now();
  
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-section" id="project-${id}">
      <h3>Project</h3>
      <label>Project Name</label>
      <input type="text" class="project-name" value="${project.name}" required>
      
      <label>Description</label>
      <textarea class="project-description">${project.description}</textarea>
      
      <div class="two-column">
        <div>
          <label>Live URL (optional)</label>
          <input type="url" class="project-live-url" value="${project.liveUrl}" placeholder="https://">
        </div>
        <div>
          <label>Code URL (optional)</label>
          <input type="url" class="project-code-url" value="${project.codeUrl}" placeholder="https://github.com/">
        </div>
      </div>
      
      <button type="button" onclick="document.getElementById('project-${id}').remove()" class="remove-btn">
        <i class="fas fa-trash"></i> Remove Project
      </button>
    </div>
  `);
}

// ===== SOCIAL LINKS =====
function addSocialField(social = { name: '', url: '' }) {
  const container = document.getElementById('social-container');
  const id = Date.now();
  
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-section" id="social-${id}">
      <div class="two-column">
        <div>
          <label>Platform</label>
          <select class="social-name">
            <option value="GitHub" ${social.name === 'GitHub' ? 'selected' : ''}>GitHub</option>
            <option value="LinkedIn" ${social.name === 'LinkedIn' ? 'selected' : ''}>LinkedIn</option>
            <option value="Twitter" ${social.name === 'Twitter' ? 'selected' : ''}>Twitter</option>
            <option value="Portfolio" ${social.name === 'Portfolio' ? 'selected' : ''}>Portfolio</option>
            <option value="Other" ${!['GitHub','LinkedIn','Twitter','Portfolio'].includes(social.name) ? 'selected' : ''}>Other</option>
          </select>
        </div>
        <div>
          <label>Profile URL</label>
          <input type="url" class="social-url" value="${social.url}" placeholder="https://" required>
        </div>
      </div>
      <button type="button" onclick="document.getElementById('social-${id}').remove()" class="remove-btn">
        <i class="fas fa-trash"></i> Remove Social Link
      </button>
    </div>
  `);
}

// ===== GENERATE RESUME =====
function generateResume() {
  // Basic validation
  const requiredFields = ['firstName', 'lastName', 'jobTitle', 'email', 'phone', 'location', 'about'];
  for (const field of requiredFields) {
    const element = document.getElementById(field);
    if (!element.value.trim()) {
      alert(`Please fill in the ${field.replace(/([A-Z])/g, ' $1').toLowerCase()} field`);
      element.focus();
      return;
    }
  }

  // Check if at least one skill is added
  if (document.querySelectorAll('.dynamic-section[id^="skill-"]').length === 0) {
    alert('Please add at least one skill');
    return;
  }

  // Compile all data
  const resumeData = {
    personalInfo: {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      jobTitle: document.getElementById('jobTitle').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      location: document.getElementById('location').value
    },
    about: document.getElementById('about').value,
    skills: [],
    experience: [],
    education: [],
    languages: [],
    projects: [],
    socialLinks: []
  };

  // Process Skills
  document.querySelectorAll('.dynamic-section[id^="skill-"]').forEach(section => {
    const skillName = section.querySelector('.skill-name').value.trim();
    const skillLevel = parseInt(section.querySelector('.skill-level-input').value);
    
    if (skillName) {
      resumeData.skills.push({
        name: skillName,
        level: skillLevel
      });
    }
  });

  // Process Experience
  document.querySelectorAll('.dynamic-section[id^="exp-"]').forEach(section => {
    const position = section.querySelector('.exp-position').value.trim();
    const company = section.querySelector('.exp-company').value.trim();
    
    if (position && company) {
      const details = section.querySelector('.exp-details').value
        .split('\n')
        .filter(detail => detail.trim() !== '');
      
      resumeData.experience.push({
        position: position,
        company: company,
        startDate: section.querySelector('.exp-start').value.trim(),
        endDate: section.querySelector('.exp-end').value.trim(),
        description: section.querySelector('.exp-description').value.trim(),
        details: details
      });
    }
  });

  // Process Education
  document.querySelectorAll('.dynamic-section[id^="edu-"]').forEach(section => {
    const degree = section.querySelector('.edu-degree').value.trim();
    const institution = section.querySelector('.edu-institution').value.trim();
    
    if (degree && institution) {
      resumeData.education.push({
        degree: degree,
        institution: institution,
        location: section.querySelector('.edu-location').value.trim(),
        year: section.querySelector('.edu-year').value.trim()
      });
    }
  });

  // Process Languages
  document.querySelectorAll('.dynamic-section[id^="lang-"]').forEach(section => {
    const langName = section.querySelector('.lang-name').value.trim();
    
    if (langName) {
      resumeData.languages.push({
        name: langName,
        level: parseInt(section.querySelector('.lang-level-input').value)
      });
    }
  });

  // Process Projects
  document.querySelectorAll('.dynamic-section[id^="project-"]').forEach(section => {
    const projectName = section.querySelector('.project-name').value.trim();
    
    if (projectName) {
      resumeData.projects.push({
        name: projectName,
        description: section.querySelector('.project-description').value.trim(),
        liveUrl: section.querySelector('.project-live-url').value.trim(),
        codeUrl: section.querySelector('.project-code-url').value.trim()
      });
    }
  });

  // Process Social Links
  document.querySelectorAll('.dynamic-section[id^="social-"]').forEach(section => {
    const socialUrl = section.querySelector('.social-url').value.trim();
    
    if (socialUrl) {
      resumeData.socialLinks.push({
        name: section.querySelector('.social-name').value,
        url: socialUrl
      });
    }
  });

  // Download JSON file
  downloadJSON(resumeData);
}

function downloadJSON(data) {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'resume-data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  alert('Resume data saved as resume-data.json! You can now use this with your resume template.');
}