document.addEventListener('DOMContentLoaded', function() {
  addExperienceField();
  addEducationField();
  addSkillField();
  addLanguageField();
  addReferenceField();
  addSocialField();
});

// === File Input for Loading JSON ===
function addFileInput() {
  const generateButton = document.querySelector('button[onclick="generateJSON()"]');
  const fileInputDiv = document.createElement('div');
  fileInputDiv.style.marginTop = '20px';
  fileInputDiv.innerHTML = `
    <input type="file" id="load-json" accept=".json" style="margin-right: 10px;">
    <button onclick="loadJSON()">Load Resume Data</button>
  `;
  generateButton.parentNode.insertBefore(fileInputDiv, generateButton);
}

// Call addFileInput when DOM is loaded
document.addEventListener('DOMContentLoaded', addFileInput);

function loadJSON() {
  const fileInput = document.getElementById('load-json');
  const file = fileInput.files[0];
  if (!file) {
    alert('Please select a JSON file to load.');
    return;
  }

  const reader = new FileReader();
  reader.onload = function(event) {
    try {
      const resumeData = JSON.parse(event.target.result);

      // Clear existing dynamic fields
      document.getElementById('experience-fields').innerHTML = '';
      document.getElementById('education-fields').innerHTML = '';
      document.getElementById('skills-fields').innerHTML = '';
      document.getElementById('languages-fields').innerHTML = '';
      document.getElementById('references-fields').innerHTML = '';
      document.getElementById('socials-fields').innerHTML = '';

      // Populate static fields
      document.getElementById('name').value = resumeData.name || '';
      document.getElementById('title').value = resumeData.title || '';
      document.getElementById('about').value = resumeData.about || '';
      document.getElementById('phone').value = resumeData.contact?.phone || '';
      document.getElementById('email').value = resumeData.contact?.email || '';
      document.getElementById('address').value = resumeData.contact?.address || '';
      document.getElementById('footer-text').value = resumeData.footer?.text || '';

      // Populate dynamic fields
      (resumeData.experience || []).forEach(exp => addExperienceField(exp));
      (resumeData.education || []).forEach(edu => addEducationField(edu));
      (resumeData.skills || []).forEach(skill => addSkillField(skill));
      (resumeData.languages || []).forEach(lang => addLanguageField(lang));
      (resumeData.references || []).forEach(ref => addReferenceField(ref));
      (resumeData.footer?.socials || []).forEach(social => addSocialField(social));

      alert('Resume data loaded successfully!');
    } catch (error) {
      alert('Error loading JSON file: ' + error.message);
    }
  };
  reader.readAsText(file);
}

// === Field Generators ===
function addExperienceField(data = {}) {
  const container = document.getElementById('experience-fields');
  const id = Date.now();
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-field" id="exp-${id}">
      <h3>Work Experience</h3>
      <label>Company:</label>
      <input type="text" class="exp-company" value="${data.company || ''}">
      
      <label>Job Title:</label>
      <input type="text" class="exp-role" value="${data.role || ''}">
      
      <label>Start Year:</label>
      <input type="text" class="exp-start" value="${data.start || ''}">
      
      <label>End Year:</label>
      <input type="text" class="exp-end" value="${data.end || 'Present'}">
      
      <label>Job Details (one per line):</label>
      <textarea class="exp-details" rows="4">${(data.details || []).join('\n')}</textarea>
      
      <button onclick="document.getElementById('exp-${id}').remove()" class="remove-btn">Remove</button>
    </div>
  `);
}

function addEducationField(data = {}) {
  const container = document.getElementById('education-fields');
  const id = Date.now();
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-field" id="edu-${id}">
      <h3>Education</h3>
      <label>Degree:</label>
      <input type="text" class="edu-degree" value="${data.degree || ''}">
      
      <label>Institution:</label>
      <input type="text" class="edu-institution" value="${data.institution || ''}">
      
      <label>Start Year:</label>
      <input type="text" class="edu-start" value="${data.start || ''}">
      
      <label>End Year:</label>
      <input type="text" class="edu-end" value="${data.end || ''}">
      
      <button onclick="document.getElementById('edu-${id}').remove()" class="remove-btn">Remove</button>
    </div>
  `);
}

function addSkillField(skill = "") {
  const container = document.getElementById('skills-fields');
  const id = Date.now();
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-field" id="skill-${id}" style="display: flex; align-items: center; gap: 10px;">
      <input type="text" class="skill-value" value="${skill}" style="flex: 1;">
      <button onclick="document.getElementById('skill-${id}').remove()" class="remove-btn">Remove</button>
    </div>
  `);
}

function addLanguageField(language = "") {
  const container = document.getElementById('languages-fields');
  const id = Date.now();
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-field" id="lang-${id}" style="display: flex; align-items: center; gap: 10px;">
      <input type="text" class="lang-value" value="${language}" style="flex: 1;">
      <button onclick="document.getElementById('lang-${id}').remove()" class="remove-btn">Remove</button>
    </div>
  `);
}

function addReferenceField(data = {}) {
  const container = document.getElementById('references-fields');
  const id = Date.now();
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-field" id="ref-${id}">
      <h3>Reference</h3>
      <label>Name:</label>
      <input type="text" class="ref-name" value="${data.name || ''}">
      
      <label>Role:</label>
      <input type="text" class="ref-role" value="${data.role || ''}">
      
      <label>Phone:</label>
      <input type="text" class="ref-phone" value="${data.phone || ''}">
      
      <label>Email:</label>
      <input type="email" class="ref-email" value="${data.email || ''}">
      
      <button onclick="document.getElementById('ref-${id}').remove()" class="remove-btn">Remove</button>
    </div>
  `);
}

function addSocialField(data = {}) {
  const container = document.getElementById('socials-fields');
  const id = Date.now();
  container.insertAdjacentHTML('beforeend', `
    <div class="dynamic-field" id="social-${id}">
      <label>Platform:</label>
      <select class="social-name">
        <option value="LinkedIn" ${data.name === 'LinkedIn' ? 'selected' : ''}>LinkedIn</option>
        <option value="Twitter" ${data.name === 'Twitter' ? 'selected' : ''}>Twitter</option>
        <option value="Facebook" ${data.name === 'Facebook' ? 'selected' : ''}>Facebook</option>
        <option value="Instagram" ${data.name === 'Instagram' ? 'selected' : ''}>Instagram</option>
        <option value="GitHub" ${data.name === 'GitHub' ? 'selected' : ''}>GitHub</option>
      </select>
      
      <label>Profile URL:</label>
      <input type="url" class="social-url" value="${data.url || ''}">
      
      <button onclick="document.getElementById('social-${id}').remove()" class="remove-btn">Remove</button>
    </div>
  `);
}

// === Data Generation ===
function generateJSON() {
  const resumeData = {
    name: document.getElementById('name').value,
    title: document.getElementById('title').value,
    about: document.getElementById('about').value,
    contact: {
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      address: document.getElementById('address').value
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
    references: [],
    footer: {
      text: document.getElementById('footer-text').value,
      socials: []
    }
  };

  // Process Experience
  document.querySelectorAll('.dynamic-field[id^="exp-"]').forEach(field => {
    resumeData.experience.push({
      company: field.querySelector('.exp-company').value,
      role: field.querySelector('.exp-role').value,
      start: field.querySelector('.exp-start').value,
      end: field.querySelector('.exp-end').value,
      details: field.querySelector('.exp-details').value.split('\n').filter(d => d.trim() !== '')
    });
  });

  // Process Education
  document.querySelectorAll('.dynamic-field[id^="edu-"]').forEach(field => {
    resumeData.education.push({
      degree: field.querySelector('.edu-degree').value,
      institution: field.querySelector('.edu-institution').value,
      start: field.querySelector('.edu-start').value,
      end: field.querySelector('.edu-end').value
    });
  });

  // Process Skills
  document.querySelectorAll('.skill-value').forEach(field => {
    if (field.value.trim() !== '') resumeData.skills.push(field.value.trim());
  });

  // Process Languages
  document.querySelectorAll('.lang-value').forEach(field => {
    if (field.value.trim() !== '') resumeData.languages.push(field.value.trim());
  });

  // Process References
  document.querySelectorAll('.dynamic-field[id^="ref-"]').forEach(field => {
    resumeData.references.push({
      name: field.querySelector('.ref-name').value,
      role: field.querySelector('.ref-role').value,
      phone: field.querySelector('.ref-phone').value,
      email: field.querySelector('.ref-email').value
    });
  });

  // Process Socials
  document.querySelectorAll('.dynamic-field[id^="social-"]').forEach(field => {
    resumeData.footer.socials.push({
      name: field.querySelector('.social-name').value,
      url: field.querySelector('.social-url').value,
      icon: `${field.querySelector('.social-name').value.toLowerCase()}.svg`
    });
  });

  // Download JSON
  downloadJSON(resumeData);
}

function downloadJSON(data) {
  const dataStr = JSON.stringify(data, null, 2);
  const blob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'data.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  
  alert('Resume data saved as data.json! Open index.html to view your resume.');
}