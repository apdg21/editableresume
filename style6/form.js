document.addEventListener('DOMContentLoaded', () => {
  const portfolioForm = document.getElementById('portfolioForm');
  const jsonUpload = document.getElementById('json-upload');
  let socialIndex = 2; // Start after initial entries (0, 1)
  let skillIndex = 5; // Start after initial entries (0-4)
  let languageIndex = 2; // Start after initial entries (0, 1)
  let educationIndex = 2; // Start after initial entries (0, 1)
  let experienceIndex = 2; // Start after initial entries (0, 1)
  let responsibilityIndices = { 0: 2, 1: 2 }; // Track responsibilities per experience

  // Set current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();

  // Hamburger menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navList = document.querySelector('.nav-list');
  menuToggle.addEventListener('click', () => {
    navList.classList.toggle('active');
    menuToggle.classList.toggle('active');
  });

  // --- UPDATED: Social Link Platform Icons to include correct prefixes ---
  const platformIcons = {
    linkedin: 'fab fa-linkedin',
    twitter: 'fab fa-x-twitter', // 'fa-x-twitter' is a solid icon in FA6
    facebook: 'fab fa-facebook'
    // Add more social platforms here as needed, ensuring 'fab' for brands and 'fas' for solid/regular
    // Example:
    // instagram: 'fab fa-instagram',
    // youtube: 'fab fa-youtube',
    // github: 'fab fa-github',
    // globe: 'fas fa-globe' // Fallback for general or unknown links
  };
  // --- END UPDATED SECTION ---


  // Add Social Link
  document.getElementById('add-social').addEventListener('click', () => {
    const container = document.getElementById('social-links-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('social-entry', 'form-grid');
    newEntry.innerHTML = `
      <div class="form-social-select">
        <label for="social-platform-${socialIndex}" class="form-label">Social Platform</label>
        <select id="social-platform-${socialIndex}" name="social-platform-${socialIndex}" class="form-input">
          <option value="" disabled selected>Select a platform</option>
          <option value="linkedin">LinkedIn</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
        </select>
        <i class="icon-preview fas fa-globe" data-index="${socialIndex}"></i>
      </div>
      <div class="form-social-url">
        <label for="social-url-${socialIndex}" class="form-label">URL</label>
        <div class="form-input-with-button">
          <input type="url" id="social-url-${socialIndex}" name="social-url-${socialIndex}" class="form-input" placeholder="e.g., https://linkedin.com/in/yourprofile">
          <button type="button" class="remove-social form-remove-button" data-index="${socialIndex}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    container.appendChild(newEntry);

    const select = document.getElementById(`social-platform-${socialIndex}`);
    select.addEventListener('change', () => {
      const icon = container.querySelector(`.icon-preview[data-index="${socialIndex}"]`);
      // --- UPDATED: Use the full class from platformIcons ---
      icon.className = `icon-preview ${platformIcons[select.value] || 'fas fa-globe'}`;
      // --- END UPDATED SECTION ---
    });

    socialIndex++;
  });

  // Remove Social Link
  document.getElementById('social-links-container').addEventListener('click', (e) => {
    if (e.target.closest('.remove-social')) {
      const button = e.target.closest('.remove-social');
      const index = button.dataset.index;
      const entry = document.querySelector(`.social-entry:has(#social-platform-${index})`);
      if (entry) entry.remove();
    }
  });

  // Add Skill
  document.getElementById('add-skill').addEventListener('click', () => {
    const container = document.getElementById('skills-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('skills-entry', 'form-grid');
    newEntry.innerHTML = `
      <div>
        <label for="skill-${skillIndex}" class="form-label">Skill</label>
        <div class="form-input-with-button">
          <input type="text" id="skill-${skillIndex}" name="skill-${skillIndex}" class="form-input" placeholder="e.g., Web Design">
          <button type="button" class="remove-skill form-remove-button" data-index="${skillIndex}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    container.appendChild(newEntry);
    skillIndex++;
  });

  // Remove Skill
  document.getElementById('skills-container').addEventListener('click', (e) => {
    if (e.target.closest('.remove-skill')) {
      const button = e.target.closest('.remove-skill');
      const index = button.dataset.index;
      const entry = document.querySelector(`.skills-entry:has(#skill-${index})`);
      if (entry) entry.remove();
    }
  });

  // Add Language
  document.getElementById('add-language').addEventListener('click', () => {
    const container = document.getElementById('languages-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('languages-entry', 'form-grid');
    newEntry.innerHTML = `
      <div>
        <label for="language-${languageIndex}" class="form-label">Language</label>
        <div class="form-input-with-button">
          <input type="text" id="language-${languageIndex}" name="language-${languageIndex}" class="form-input" placeholder="e.g., English">
          <button type="button" class="remove-language form-remove-button" data-index="${languageIndex}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    container.appendChild(newEntry);
    languageIndex++;
  });

  // Remove Language
  document.getElementById('languages-container').addEventListener('click', (e) => {
    if (e.target.closest('.remove-language')) {
      const button = e.target.closest('.remove-language');
      const index = button.dataset.index;
      const entry = document.querySelector(`.languages-entry:has(#language-${index})`);
      if (entry) entry.remove();
    }
  });

  // Add Education
  document.getElementById('add-education').addEventListener('click', () => {
    const container = document.getElementById('education-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('education-entry', 'form-grid');
    newEntry.innerHTML = `
      <div>
        <label for="degree-${educationIndex}" class="form-label">Degree</label>
        <input type="text" id="degree-${educationIndex}" name="degree-${educationIndex}" class="form-input" placeholder="e.g., Bachelor of Arts">
      </div>
      <div>
        <label for="university-${educationIndex}" class="form-label">University</label>
        <input type="text" id="university-${educationIndex}" name="university-${educationIndex}" class="form-input" placeholder="e.g., Example University">
      </div>
      <div>
        <label for="years-${educationIndex}" class="form-label">Years</label>
        <input type="text" id="years-${educationIndex}" name="years-${educationIndex}" class="form-input" placeholder="e.g., 2015-2019">
      </div>
      <div>
        <label for="grade-${educationIndex}" class="form-label">Grade</label>
        <div class="form-input-with-button">
          <input type="text" id="grade-${educationIndex}" name="grade-${educationIndex}" class="form-input" placeholder="e.g., 3.8 GPA">
          <button type="button" class="remove-education form-remove-button" data-index="${educationIndex}"><i class="fas fa-trash"></i></button>
        </div>
      </div>
    `;
    container.appendChild(newEntry);
    educationIndex++;
  });

  // Remove Education
  document.getElementById('education-container').addEventListener('click', (e) => {
    if (e.target.closest('.remove-education')) {
      const button = e.target.closest('.remove-education');
      const index = button.dataset.index;
      const entry = document.querySelector(`.education-entry:has(#degree-${index})`);
      if (entry) entry.remove();
    }
  });

  // Add Experience
  document.getElementById('add-experience').addEventListener('click', () => {
    const container = document.getElementById('experience-container');
    const newEntry = document.createElement('div');
    newEntry.classList.add('experience-entry', 'form-grid');
    newEntry.innerHTML = `
      <div>
        <label for="exp-title-${experienceIndex}" class="form-label">Job Title</label>
        <input type="text" id="exp-title-${experienceIndex}" name="exp-title-${experienceIndex}" class="form-input" placeholder="e.g., Graphic Designer">
      </div>
      <div>
        <label for="company-${experienceIndex}" class="form-label">Company</label>
        <input type="text" id="company-${experienceIndex}" name="company-${experienceIndex}" class="form-input" placeholder="e.g., Creative Agency">
      </div>
      <div>
        <label for="exp-years-${experienceIndex}" class="form-label">Years</label>
        <input type="text" id="exp-years-${experienceIndex}" name="exp-years-${experienceIndex}" class="form-input" placeholder="e.g., 2019-2021">
      </div>
      <div>
        <label for="responsibility-${experienceIndex}-0" class="form-label">Responsibility</label>
        <div class="form-input-with-button">
          <input type="text" id="responsibility-${experienceIndex}-0" name="responsibility-${experienceIndex}-0" class="form-input" placeholder="e.g., Designed marketing materials">
          <button type="button" class="remove-responsibility form-remove-button" data-index="${experienceIndex}" data-subindex="0" style="visibility: hidden;"><i class="fas fa-trash"></i></button>
        </div>
      </div>
      <div class="form-grid-button">
        <button type="button" class="add-responsibility form-add-button" data-index="${experienceIndex}">Add Responsibility</button>
        <button type="button" class="remove-experience form-remove-button" data-index="${experienceIndex}"><i class="fas fa-trash"></i></button>
      </div>
    `;
    container.appendChild(newEntry);
    responsibilityIndices[experienceIndex] = 1;
    experienceIndex++;
  });

  // Add Responsibility
  document.getElementById('experience-container').addEventListener('click', (e) => {
    if (e.target.closest('.add-responsibility')) {
      const button = e.target.closest('.add-responsibility');
      const index = button.dataset.index;
      const container = document.querySelector(`.experience-entry:has(#exp-title-${index})`);
      const subIndex = responsibilityIndices[index] || 0;
      const newResponsibility = document.createElement('div');
      newResponsibility.innerHTML = `
        <label for="responsibility-${index}-${subIndex}" class="form-label">Responsibility</label>
        <div class="form-input-with-button">
          <input type="text" id="responsibility-${index}-${subIndex}" name="responsibility-${index}-${subIndex}" class="form-input" placeholder="e.g., Designed marketing materials">
          <button type="button" class="remove-responsibility form-remove-button" data-index="${index}" data-subindex="${subIndex}"><i class="fas fa-trash"></i></button>
        </div>
      `;
      container.insertBefore(newResponsibility, container.querySelector('.form-grid-button'));
      responsibilityIndices[index] = subIndex + 1;
    }
  });

  // Remove Responsibility
  document.getElementById('experience-container').addEventListener('click', (e) => {
    if (e.target.closest('.remove-responsibility')) {
      const button = e.target.closest('.remove-responsibility');
      const index = button.dataset.index;
      const subIndex = button.dataset.subindex;
      const entry = document.querySelector(`.experience-entry:has(#responsibility-${index}-${subIndex}) > div:has(#responsibility-${index}-${subIndex})`);
      if (entry) entry.remove();
    }
  });

  // Remove Experience
  document.getElementById('experience-container').addEventListener('click', (e) => {
    if (e.target.closest('.remove-experience')) {
      const button = e.target.closest('.remove-experience');
      const index = button.dataset.index;
      const entry = document.querySelector(`.experience-entry:has(#exp-title-${index})`);
      if (entry) entry.remove();
      delete responsibilityIndices[index];
    }
  });

  // Load JSON Data
  jsonUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);

        // Clear all dynamic entries
        document.querySelectorAll('.social-entry').forEach(entry => entry.remove());
        document.querySelectorAll('.skills-entry').forEach(entry => entry.remove());
        document.querySelectorAll('.languages-entry').forEach(entry => entry.remove());
        document.querySelectorAll('.education-entry').forEach((entry, i) => {
          if (i > 0) entry.remove();
        });
        document.querySelectorAll('.experience-entry').forEach((entry, i) => {
          if (i > 0) entry.remove();
        });
        socialIndex = 0;
        skillIndex = 0;
        languageIndex = 0;
        educationIndex = 0;
        experienceIndex = 0;
        responsibilityIndices = {};

        // Recreate first entries for Social Links, Skills, and Languages
        const socialContainer = document.getElementById('social-links-container');
        const skillsContainer = document.getElementById('skills-container');
        const languagesContainer = document.getElementById('languages-container');

        // First Social Link (index 0)
        socialContainer.innerHTML = `
          <div class="social-entry form-grid">
            <div class="form-social-select">
              <label for="social-platform-0" class="form-label">Social Platform</label>
              <select id="social-platform-0" name="social-platform-0" class="form-input">
                <option value="" disabled>Select a platform</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="facebook">Facebook</option>
              </select>
              <i class="icon-preview fas fa-globe" data-index="0"></i>
            </div>
            <div class="form-social-url">
              <label for="social-url-0" class="form-label">URL</label>
              <div class="form-input-with-button">
                <input type="url" id="social-url-0" name="social-url-0" class="form-input" placeholder="e.g., https://linkedin.com/in/yourprofile">
                <button type="button" class="remove-social form-remove-button" data-index="0" style="visibility: hidden;"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
        socialIndex = 1;

        // First Skill (index 0)
        skillsContainer.innerHTML = `
          <div class="skills-entry form-grid">
            <div>
              <label for="skill-0" class="form-label">Skill</label>
              <div class="form-input-with-button">
                <input type="text" id="skill-0" name="skill-0" class="form-input" placeholder="e.g., Web Design">
                <button type="button" class="remove-skill form-remove-button" data-index="0" style="visibility: hidden;"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
        skillIndex = 1;

        // First Language (index 0)
        languagesContainer.innerHTML = `
          <div class="languages-entry form-grid">
            <div>
              <label for="language-0" class="form-label">Language</label>
              <div class="form-input-with-button">
                <input type="text" id="language-0" name="language-0" class="form-input" placeholder="e.g., English">
                <button type="button" class="remove-language form-remove-button" data-index="0" style="visibility: hidden;"><i class="fas fa-trash"></i></button>
              </div>
            </div>
          </div>
        `;
        languageIndex = 1;

        // Populate Basic Info
        document.getElementById('name').value = data.name || '';
        document.getElementById('title').value = data.title || '';
        document.getElementById('aboutMe').value = data.aboutMe || '';

        // Populate Contact
        document.getElementById('contact-phone').value = data.contact?.phone || '';
        document.getElementById('contact-email').value = data.contact?.email || '';
        document.getElementById('contact-address').value = data.contact?.address || '';

        // Populate Social Links
        if (data.social_links && data.social_links.length > 0) {
          data.social_links.forEach((link, i) => {
            if (i === 0) {
              // Update existing first entry
              const select = document.getElementById('social-platform-0');
              select.value = link.platform || '';
              const icon = socialContainer.querySelector('.icon-preview[data-index="0"]');
              // --- UPDATED: Use the full class from platformIcons ---
              icon.className = `icon-preview ${platformIcons[link.platform] || 'fas fa-globe'}`;
              // --- END UPDATED SECTION ---
              document.getElementById('social-url-0').value = link.url || '';
            } else {
              // Append additional entries
              const entry = document.createElement('div');
              entry.classList.add('social-entry', 'form-grid');
              entry.innerHTML = `
                <div class="form-social-select">
                  <label for="social-platform-${i}" class="form-label">Social Platform</label>
                  <select id="social-platform-${i}" name="social-platform-${i}" class="form-input">
                    <option value="" disabled>Select a platform</option>
                    <option value="linkedin" ${link.platform === 'linkedin' ? 'selected' : ''}>LinkedIn</option>
                    <option value="twitter" ${link.platform === 'twitter' ? 'selected' : ''}>Twitter</option>
                    <option value="facebook" ${link.platform === 'facebook' ? 'selected' : ''}>Facebook</option>
                  </select>
                  <i class="icon-preview ${platformIcons[link.platform] || 'fas fa-globe'}" data-index="${i}"></i>
                  </div>
                <div class="form-social-url">
                  <label for="social-url-${i}" class="form-label">URL</label>
                  <div class="form-input-with-button">
                    <input type="url" id="social-url-${i}" name="social-url-${i}" value="${link.url || ''}" class="form-input" placeholder="e.g., https://linkedin.com/in/yourprofile">
                    <button type="button" class="remove-social form-remove-button" data-index="${i}"><i class="fas fa-trash"></i></button>
                  </div>
                </div>
              `;
              socialContainer.appendChild(entry);
            }
            const select = document.getElementById(`social-platform-${i}`);
            select.addEventListener('change', () => {
              const icon = socialContainer.querySelector(`.icon-preview[data-index="${i}"]`);
              // --- UPDATED: Use the full class from platformIcons ---
              icon.className = `icon-preview ${platformIcons[select.value] || 'fas fa-globe'}`;
              // --- END UPDATED SECTION ---
            });
            socialIndex = i + 1;
          });
        }

        // Populate Skills
        if (data.skills && data.skills.length > 0) {
          data.skills.forEach((skill, i) => {
            if (i === 0) {
              // Update existing first entry
              document.getElementById('skill-0').value = skill || '';
            } else {
              // Append additional entries
              const entry = document.createElement('div');
              entry.classList.add('skills-entry', 'form-grid');
              entry.innerHTML = `
                <div>
                  <label for="skill-${i}" class="form-label">Skill</label>
                  <div class="form-input-with-button">
                    <input type="text" id="skill-${i}" name="skill-${i}" value="${skill || ''}" class="form-input" placeholder="e.g., Web Design">
                    <button type="button" class="remove-skill form-remove-button" data-index="${i}"><i class="fas fa-trash"></i></button>
                  </div>
                </div>
              `;
              skillsContainer.appendChild(entry);
            }
            skillIndex = i + 1;
          });
        }

        // Populate Languages
        if (data.languages && data.languages.length > 0) {
          data.languages.forEach((language, i) => {
            if (i === 0) {
              // Update existing first entry
              document.getElementById('language-0').value = language || '';
            } else {
              // Append additional entries
              const entry = document.createElement('div');
              entry.classList.add('languages-entry', 'form-grid');
              entry.innerHTML = `
                <div>
                  <label for="language-${i}" class="form-label">Language</label>
                  <div class="form-input-with-button">
                    <input type="text" id="language-${i}" name="language-${i}" value="${language || ''}" class="form-input" placeholder="e.g., English">
                    <button type="button" class="remove-language form-remove-button" data-index="${i}"><i class="fas fa-trash"></i></button>
                  </div>
                </div>
              `;
              languagesContainer.appendChild(entry);
            }
            languageIndex = i + 1;
          });
        }

        // Populate Education
        if (data.education && data.education.length > 0) {
          const container = document.getElementById('education-container');
          // Clear any default empty education entry if it exists to prevent duplicates
          // This assumes your HTML form might start with a default empty entry
          const defaultEduEntry = container.querySelector('.education-entry:not([id])');
          if (defaultEduEntry) defaultEduEntry.remove();

          data.education.forEach((edu, i) => {
            const entry = document.createElement('div');
            entry.classList.add('education-entry', 'form-grid');
            entry.innerHTML = `
              <div>
                <label for="degree-${i}" class="form-label">Degree</label>
                <input type="text" id="degree-${i}" name="degree-${i}" value="${edu.degree || ''}" class="form-input" placeholder="e.g., Bachelor of Arts">
              </div>
              <div>
                <label for="university-${i}" class="form-label">University</label>
                <input type="text" id="university-${i}" name="university-${i}" value="${edu.university || ''}" class="form-input" placeholder="e.g., Example University">
              </div>
              <div>
                <label for="years-${i}" class="form-label">Years</label>
                <input type="text" id="years-${i}" name="years-${i}" value="${edu.years || ''}" class="form-input" placeholder="e.g., 2015-2019">
              </div>
              <div>
                <label for="grade-${i}" class="form-label">Grade</label>
                <div class="form-input-with-button">
                  <input type="text" id="grade-${i}" name="grade-${i}" value="${edu.grade || ''}" class="form-input" placeholder="e.g., 3.8 GPA">
                  <button type="button" class="remove-education form-remove-button" data-index="${i}" ${i === 0 && data.education.length === 1 ? 'style="visibility: hidden;"' : ''}><i class="fas fa-trash"></i></button>
                </div>
              </div>
            `;
            container.appendChild(entry);
            educationIndex = i + 1;
          });
        }

        // Populate Experience
        if (data.experience && data.experience.length > 0) {
          const container = document.getElementById('experience-container');
          // Clear any default empty experience entry if it exists
          const defaultExpEntry = container.querySelector('.experience-entry:not([id])');
          if (defaultExpEntry) defaultExpEntry.remove();

          data.experience.forEach((exp, i) => {
            const entry = document.createElement('div');
            entry.classList.add('experience-entry', 'form-grid');
            let responsibilitiesHtml = '';
            responsibilityIndices[i] = exp.responsibilities ? exp.responsibilities.length : 0;
            if (exp.responsibilities && exp.responsibilities.length > 0) {
              responsibilitiesHtml = exp.responsibilities.map((resp, j) => `
                <div>
                  <label for="responsibility-${i}-${j}" class="form-label">Responsibility</label>
                  <div class="form-input-with-button">
                    <input type="text" id="responsibility-${i}-${j}" name="responsibility-${i}-${j}" value="${resp || ''}" class="form-input" placeholder="e.g., Designed marketing materials">
                    <button type="button" class="remove-responsibility form-remove-button" data-index="${i}" data-subindex="${j}" ${j === 0 && exp.responsibilities.length === 1 ? 'style="visibility: hidden;"' : ''}><i class="fas fa-trash"></i></button>
                  </div>
                </div>
              `).join('');
            }
            entry.innerHTML = `
              <div>
                <label for="exp-title-${i}" class="form-label">Job Title</label>
                <input type="text" id="exp-title-${i}" name="exp-title-${i}" value="${exp.title || ''}" class="form-input" placeholder="e.g., Graphic Designer">
              </div>
              <div>
                <label for="company-${i}" class="form-label">Company</label>
                <input type="text" id="company-${i}" name="company-${i}" value="${exp.company || ''}" class="form-input" placeholder="e.g., Creative Agency">
              </div>
              <div>
                <label for="exp-years-${i}" class="form-label">Years</label>
                <input type="text" id="exp-years-${i}" name="exp-years-${i}" value="${exp.years || ''}" class="form-input" placeholder="e.g., 2019-2021">
              </div>
              ${responsibilitiesHtml}
              <div class="form-grid-button">
                <button type="button" class="add-responsibility form-add-button" data-index="${i}">Add Responsibility</button>
                <button type="button" class="remove-experience form-remove-button" data-index="${i}" ${i === 0 && data.experience.length === 1 ? 'style="visibility: hidden;"' : ''}><i class="fas fa-trash"></i></button>
              </div>
            `;
            container.appendChild(entry);
            experienceIndex = i + 1;
          });
        }
      } catch (error) {
        alert('Error loading JSON file. Please ensure it is valid.');
        console.error(error);
      }
    };
    reader.readAsText(file);
  });

  // Form Submission
  portfolioForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(portfolioForm);
    const data = {
      name: formData.get('name'),
      title: formData.get('title'),
      aboutMe: formData.get('aboutMe'),
      contact: {
        phone: formData.get('contact-phone'),
        email: formData.get('contact-email'),
        address: formData.get('contact-address')
      },
      social_links: [],
      skills: [],
      languages: [],
      education: [],
      experience: []
    };

    // Collect Social Links
    for (let i = 0; i < socialIndex; i++) {
      const platform = formData.get(`social-platform-${i}`);
      const url = formData.get(`social-url-${i}`);
      if (platform && url) {
        data.social_links.push({
          platform,
          url,
          // --- UPDATED: Use the full class from platformIcons ---
          icon: platformIcons[platform] || 'fas fa-globe'
          // --- END UPDATED SECTION ---
        });
      }
    }

    // Collect Skills
    for (let i = 0; i < skillIndex; i++) {
      const skill = formData.get(`skill-${i}`);
      if (skill) data.skills.push(skill);
    }

    // Collect Languages
    for (let i = 0; i < languageIndex; i++) {
      const language = formData.get(`language-${i}`);
      if (language) data.languages.push(language);
    }

    // Collect Education
    for (let i = 0; i < educationIndex; i++) {
      const degree = formData.get(`degree-${i}`);
      const university = formData.get(`university-${i}`);
      const years = formData.get(`years-${i}`);
      const grade = formData.get(`grade-${i}`);
      if (degree || university || years || grade) {
        data.education.push({ degree, university, years, grade });
      }
    }

    // Collect Experience
    for (let i = 0; i < experienceIndex; i++) {
      const title = formData.get(`exp-title-${i}`);
      const company = formData.get(`company-${i}`);
      const years = formData.get(`exp-years-${i}`);
      const responsibilities = [];
      for (let j = 0; j < (responsibilityIndices[i] || 0); j++) {
        const resp = formData.get(`responsibility-${i}-${j}`);
        if (resp) responsibilities.push(resp);
      }
      if (title || company || years || responsibilities.length > 0) {
        data.experience.push({ title, company, years, responsibilities });
      }
    }

    // Download JSON
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.json';
    a.click();
    URL.revokeObjectURL(url);
  });

  // Update initial social link icons
  document.querySelectorAll('.form-social-select select').forEach(select => {
    const index = select.id.split('-')[2];
    select.addEventListener('change', () => {
      const icon = document.querySelector(`.icon-preview[data-index="${index}"]`);
      // --- UPDATED: Use the full class from platformIcons ---
      icon.className = `icon-preview ${platformIcons[select.value] || 'fas fa-globe'}`;
      // --- END UPDATED SECTION ---
    });
  });

  // Hide first remove buttons (improved logic for single items from JSON load)
  // This ensures the button is hidden only if it's the *only* item after loading,
  // preventing it from being hidden if there are multiple initially.

  // Helper function to set visibility of initial remove buttons
  const setInitialRemoveButtonVisibility = (selector, count) => {
    document.querySelectorAll(selector).forEach(btn => {
      if (count <= 1) { // If there's only one item, hide its remove button
        btn.style.visibility = 'hidden';
      } else { // Otherwise, show it
        btn.style.visibility = 'visible';
      }
    });
  };

  // Initial setup for the pre-existing form fields (if any, before JSON load)
  // This assumes the HTML initially loads with one entry for each section.
  setInitialRemoveButtonVisibility('.remove-social[data-index="0"]', socialIndex);
  setInitialRemoveButtonVisibility('.remove-skill[data-index="0"]', skillIndex);
  setInitialRemoveButtonVisibility('.remove-language[data-index="0"]', languageIndex);
  setInitialRemoveButtonVisibility('.remove-education[data-index="0"]', educationIndex);
  setInitialRemoveButtonVisibility('.remove-experience[data-index="0"]', experienceIndex);
  setInitialRemoveButtonVisibility('.remove-responsibility[data-index="0"][data-subindex="0"]', responsibilityIndices[0] || 0);

  // If you load a JSON, the populate logic will correctly set the indices and then
  // the visibility will be re-evaluated when new elements are added or removed.
});