// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });
  
  // Close menu when clicking on links
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.classList.remove('active');
    });
  });
}

// Create file input element for local loading
const createFileInput = () => {
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.id = 'json-upload';
  fileInput.accept = '.json';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);
  return fileInput;
};

// Render portfolio data
const renderPortfolio = (data) => {
  // Update page title
  document.title = `${data.name} - Portfolio`;
  
  // Header content
  document.getElementById('name').textContent = data.name;
  document.getElementById('title').textContent = data.title;
  document.getElementById('about-text').textContent = data.about;
  
  // Skills
  const skillsList = document.getElementById('skills-list');
  if (skillsList) {
    skillsList.innerHTML = data.skills.map(skill => 
      `<li>${skill.name} <span>${skill.level}%</span></li>`
    ).join('');
  }

  // Education
  const education = data.education;
  document.getElementById('education-text').textContent = 
    `${education.degree} ${education.university} ${education.address} ${education.years}`;

  // Languages
  const languagesList = document.getElementById('languages-list');
  if (languagesList) {
    languagesList.innerHTML = data.languages.map(lang => 
      `<li>${lang.name} <span>${lang.level}%</span></li>`
    ).join('');
  }

  // Experience
  const experienceList = document.getElementById('experience-list');
  if (experienceList) {
    experienceList.innerHTML = data.experience.map(exp => 
      `<li><strong>${exp.title}</strong> ${exp.period} | ${exp.company}<br>${exp.description}</li>`
    ).join('');
  }

  // Contact
  const contact = data.contact;
  const contactHTML = `
    <a href="tel:${contact.phone}">${contact.phone}</a><br>
    <a href="mailto:${contact.email}">${contact.email}</a><br>
    <a href="${contact.website.startsWith('http') ? '' : 'http://'}${contact.website}" target="_blank">${contact.website}</a><br>
    ${contact.address}
  `;
  document.getElementById('contact-text').innerHTML = contactHTML;

  // Social Media Links
  const socialContainer = document.getElementById('social-links');
  if (socialContainer && contact.social) {
    socialContainer.innerHTML = contact.social.map(social => 
      `<a href="${social.url}" target="_blank" title="${social.name}">
        <i class="fab fa-${social.icon}"></i>
      </a>`
    ).join('');
  }

  // Copyright
  document.getElementById('copyright').textContent = 
    `© ${new Date().getFullYear()} ${data.name}. All rights reserved.`;
};

// Try to load data.json automatically
fetch('data.json')
  .then(res => {
    if (!res.ok) throw new Error('Failed to fetch data.json');
    return res.json();
  })
  .then(data => {
    renderPortfolio(data);
  })
  .catch(err => {
    console.log('Falling back to local file selection:', err);
    
    // Create and show file input
    const fileInput = createFileInput();
    const uploadLabel = document.createElement('div');
    uploadLabel.className = 'file-upload-prompt';
    uploadLabel.innerHTML = `
      <div class="upload-container">
        <p>Please select your portfolio data file (data.json):</p>
        <button class="upload-button">Select File</button>
      </div>
    `;
    
    uploadLabel.querySelector('button').addEventListener('click', () => fileInput.click());
    document.body.insertBefore(uploadLabel, document.body.firstChild);
    
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = JSON.parse(event.target.result);
          uploadLabel.style.display = 'none';
          renderPortfolio(data);
        } catch (parseError) {
          alert('Error parsing JSON file. Please check the file format.');
          console.error(parseError);
        }
      };
      reader.onerror = () => {
        alert('Error reading file');
      };
      reader.readAsText(file);
    });
  });