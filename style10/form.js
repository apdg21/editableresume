document.addEventListener('DOMContentLoaded', () => {
  // Hamburger menu functionality
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (hamburger.classList.contains('active')) {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
        }
      });
    });
  } else {
    console.error('Hamburger or nav links not found:', { hamburger, navLinks });
  }

  // Containers for dynamic lists
  const experienceList = document.getElementById('experience-entries');
  const educationList = document.getElementById('education-entries');
  const skillsList = document.getElementById('skills-entries');
  const languagesList = document.getElementById('languages-entries');
  const referencesList = document.getElementById('references-entries');
  const socialsList = document.getElementById('socials-entries');

  // Add Item Buttons
  document.getElementById('add-experience').addEventListener('click', () => addExperienceItem());
  document.getElementById('add-education').addEventListener('click', () => addEducationItem());
  document.getElementById('add-skill').addEventListener('click', () => addSkillItem());
  document.getElementById('add-language').addEventListener('click', () => addLanguageItem());
  document.getElementById('add-reference').addEventListener('click', () => addReferenceItem());
  document.getElementById('add-social').addEventListener('click', () => addSocialItem());

  // Function to check if we're running locally
  function isLocalHost() {
    return (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.protocol === "file:"
    );
  }

  let fileSelectBtn; // Declare button variable in a higher scope

  // Set up file selector for local development
  if (isLocalHost()) {
    console.log('Running locally, setting up file selector');
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    fileInput.style.display = 'none';
    document.body.appendChild(fileInput);

    fileSelectBtn = document.createElement('button');
    fileSelectBtn.textContent = 'Load Resume Data';
    fileSelectBtn.className = 'file-select-btn';
    const fileIcon = document.createElement('i');
    fileIcon.className = 'fas fa-upload';
    fileSelectBtn.prepend(fileIcon);

    fileSelectBtn.addEventListener('click', () => {
      console.log('Load button clicked');
      fileInput.click();
    });

    // Add button to header
    const header = document.querySelector('header .header-content');
    if (header) {
      const navElement = header.querySelector('nav');
      if (navElement) {
        header.insertBefore(fileSelectBtn, navElement);
      } else {
        header.appendChild(fileSelectBtn);
      }
      console.log('File selector button added to header');
    } else {
      console.error('Header content not found');
    }

    fileInput.addEventListener('change', (event) => {
      console.log('File input changed');
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          console.log('File loaded, parsing JSON');
          const data = JSON.parse(e.target.result);
          populateForm(data);
          if (fileSelectBtn) {
            fileSelectBtn.style.display = 'none';
            console.log('File selector button hidden after loading');
          }
          fileInput.value = ''; // Reset file input
        } catch (error) {
          console.error('Error parsing JSON file:', error);
          alert('Invalid JSON file. Please select a valid resume data file.');
        }
      };
      reader.readAsText(file);
    });
  }

  // Load default data.json
  console.log('Attempting to load data.json');
  loadResumeData('data.json');

  function loadResumeData(url) {
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        console.log('Data loaded successfully:', data);
        populateForm(data);
        if (fileSelectBtn) {
          fileSelectBtn.style.display = 'none';
          console.log('File selector button hidden after default data load');
        }
      })
      .catch(error => {
        console.error('Error loading resume data:', error);
        if (isLocalHost()) {
          alert('Failed to load data.json. Starting with an empty form.');
          populateForm({});
          if (fileSelectBtn) {
            fileSelectBtn.style.display = 'inline-flex';
            console.log('File selector button shown due to fetch error');
          }
        }
      });
  }

  // Social platform icon mapping
  const socialIcons = {
    LinkedIn: 'fab fa-linkedin',
    GitHub: 'fab fa-github',
    Facebook: 'fab fa-facebook',
    Twitter: 'fab fa-twitter',
    Instagram: 'fab fa-instagram',
    // Add more platforms as needed
    default: 'fas fa-link' // Fallback icon
  };

  // Dynamic Item Generation Functions
  function createRemoveButton() {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'remove-btn';
    button.innerHTML = '<i class="fas fa-trash"></i> Remove';
    button.addEventListener('click', (event) => {
      event.target.closest('.entry').remove();
    });
    return button;
  }

  function addExperienceItem(exp = {}) {
    const div = document.createElement('div');
    div.className = 'entry';
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
        <label>Date</label>
        <input type="text" class="exp-date" value="${exp.date || ''}" placeholder="e.g., 2019 - Present">
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
    div.className = 'entry';
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
        <label>Date</label>
        <input type="text" class="edu-date" value="${edu.date || ''}" placeholder="e.g., 2013 - 2017">
      </div>
      <div class="item-actions"></div>
    `;
    div.querySelector('.item-actions').appendChild(createRemoveButton());
    educationList.appendChild(div);
  }

  function addSkillItem(skill = '') {
    const div = document.createElement('div');
    div.className = 'entry';
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
    div.className = 'entry';
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
    div.className = 'entry';
    div.innerHTML = `
      <div class="form-group">
        <label>Name</label>
        <input type="text" class="ref-name" value="${ref.name || ''}" placeholder="e.g., Jane Smith">
      </div>
      <div class="form-group">
        <label>Position</label>
        <input type="text" class="ref-position" value="${ref.position || ''}" placeholder="e.g., Engineering Manager">
      </div>
      <div class="form-group">
        <label>Company</label>
        <input type="text" class="ref-company" value="${ref.company || ''}" placeholder="e.g., Tech Corp">
      </div>
      <div class="form-group">
        <label>Contact</label>
        <input type="text" class="ref-contact" value="${ref.contact || ''}" placeholder="e.g., jane.smith@example.com">
      </div>
      <div class="item-actions"></div>
    `;
    div.querySelector('.item-actions').appendChild(createRemoveButton());
    referencesList.appendChild(div);
  }

  function addSocialItem(social = {}) {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `
      <div class="form-group">
        <label>Platform Name</label>
        <input type="text" class="social-name" value="${social.name || ''}" placeholder="e.g., LinkedIn">
      </div>
      <div class="form-group">
        <label>URL</label>
        <input type="url" class="social-url" value="${social.url || ''}" placeholder="e.g., linkedin.com/in/yourprofile">
      </div>
      <div class="item-actions"></div>
    `;
    div.querySelector('.item-actions').appendChild(createRemoveButton());
    socialsList.appendChild(div);
  }

  // Populate form with data
  function populateForm(data) {
    console.log('Populating form with data:', data);
    try {
      // Basic Info
      document.getElementById('title').value = data.title || '';
      document.getElementById('header-title').value = data.header?.title || '';
      document.getElementById('profile-name').value = data.profile?.name || '';
      document.getElementById('profile-title').value = data.profile?.title || '';
      document.getElementById('profile-photo').value = data.profile?.photo || 'assets/profile.jpg';
      document.getElementById('about-text').value = data.about || '';
      document.getElementById('contact-email').value = data.contact?.Email || '';
      document.getElementById('contact-phone').value = data.contact?.Phone || '';
      document.getElementById('footer-text').value = data.footer || '';

      // Clear existing dynamic lists
      experienceList.innerHTML = '';
      educationList.innerHTML = '';
      skillsList.innerHTML = '';
      languagesList.innerHTML = '';
      referencesList.innerHTML = '';
      socialsList.innerHTML = '';

      // Populate dynamic lists
      (data.experience || []).forEach(exp => addExperienceItem(exp));
      if (!data.experience || data.experience.length === 0) addExperienceItem();
      (data.education || []).forEach(edu => addEducationItem(edu));
      if (!data.education || data.education.length === 0) addEducationItem();
      (data.skills || []).forEach(skill => addSkillItem(skill));
      if (!data.skills || data.skills.length === 0) addSkillItem();
      (data.languages || []).forEach(lang => addLanguageItem(lang));
      if (!data.languages || data.languages.length === 0) addLanguageItem();
      (data.references || []).forEach(ref => addReferenceItem(ref));
      if (!data.references || data.references.length === 0) addReferenceItem();
      const socials = data.socials ? Object.entries(data.socials).map(([name, url]) => ({ name, url })) : [];
      socials.forEach(social => addSocialItem(social));
      if (!data.socials || Object.keys(data.socials).length === 0) addSocialItem();

      // Populate social icons in footer
      const socialsDiv = document.getElementById('social-icons');
      if (socialsDiv) {
        socialsDiv.innerHTML = '';
        if (data.socials) {
          Object.entries(data.socials).forEach(([platform, url]) => {
            const iconClass = socialIcons[platform] || socialIcons.default;
            const link = document.createElement('a');
            link.href = url.startsWith('http') ? url : `https://${url}`;
            link.innerHTML = `<i class="${iconClass}"></i>`;
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
            socialsDiv.appendChild(link);
          });
        }
      } else {
        console.error('Social icons element not found');
      }
    } catch (error) {
      console.error('Error populating form:', error);
      alert('Failed to populate form data. Starting with an empty form.');
      populateForm({});
    }
  }

  // Save form data as JSON
  document.getElementById('save-json').addEventListener('click', () => {
    console.log('Save JSON button clicked');
    try {
      const data = collectFormData();
      console.log('Collected form data:', data);

      const jsonString = JSON.stringify(data, null, 2);
      console.log('Generated JSON string:', jsonString);

      const blob = new Blob([jsonString], { type: 'application/json' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'data.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(a.href);
      console.log('JSON file download triggered');
      alert('Resume data saved as data.json! You can replace your existing data.json file with this one.');
    } catch (error) {
      console.error('Error saving JSON:', error);
      alert('Failed to save JSON file. Please check the console for errors and try again.');
    }
  });

  function collectFormData() {
    const data = {
      title: document.getElementById('title').value || '',
      header: { title: document.getElementById('header-title').value || '' },
      profile: {
        name: document.getElementById('profile-name').value || '',
        title: document.getElementById('profile-title').value || '',
        photo: document.getElementById('profile-photo').value || 'assets/profile.jpg'
      },
      socials: {},
      about: document.getElementById('about-text').value || '',
      experience: [],
      education: [],
      skills: [],
      languages: [],
      references: [],
      contact: {
        Email: document.getElementById('contact-email').value || '',
        Phone: document.getElementById('contact-phone').value || ''
      },
      footer: document.getElementById('footer-text').value || ''
    };

    // Experience
    data.experience = Array.from(experienceList.children).map(item => ({
      position: item.querySelector('.exp-position').value.trim(),
      company: item.querySelector('.exp-company').value.trim(),
      date: item.querySelector('.exp-date').value.trim(),
      description: item.querySelector('.exp-description').value.trim()
    })).filter(item => item.position || item.company || item.date || item.description);

    // Education
    data.education = Array.from(educationList.children).map(item => ({
      degree: item.querySelector('.edu-degree').value.trim(),
      institution: item.querySelector('.edu-institution').value.trim(),
      date: item.querySelector('.edu-date').value.trim()
    })).filter(item => item.degree || item.institution || item.date);

    // Skills
    data.skills = Array.from(skillsList.children).map(item =>
      item.querySelector('.skill-name').value.trim()
    ).filter(skill => skill);

    // Languages
    data.languages = Array.from(languagesList.children).map(item =>
      item.querySelector('.lang-name').value.trim()
    ).filter(lang => lang);

    // References
    data.references = Array.from(referencesList.children).map(item => ({
      name: item.querySelector('.ref-name').value.trim(),
      position: item.querySelector('.ref-position').value.trim(),
      company: item.querySelector('.ref-company').value.trim(),
      contact: item.querySelector('.ref-contact').value.trim()
    })).filter(item => item.name || item.position || item.company || item.contact);

    // Socials
    data.socials = Array.from(socialsList.children).reduce((acc, item) => {
      const name = item.querySelector('.social-name').value.trim();
      const url = item.querySelector('.social-url').value.trim();
      if (name && url) {
        acc[name] = url;
      }
      return acc;
    }, {});

    return data;
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});