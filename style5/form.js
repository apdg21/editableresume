document.addEventListener('DOMContentLoaded', () => {
  // Map platform names to Font Awesome classes
  const iconMap = {
    'linkedin': 'fa-linkedin',
    'twitter': 'fa-x-twitter',
    'facebook': 'fa-facebook',
    '': 'fa-globe' // Default icon for no selection
  };

  // Function to update icon based on platform name
  function updateIcon(index, platform) {
    const iconElement = document.querySelector(`.icon-preview[data-index="${index}"]`);
    const platformLower = platform.toLowerCase().trim();
    const iconClass = iconMap[platformLower] || iconMap[''];
    iconElement.className = `icon-preview fas ${iconClass}`;
  }

  // Add Education Entry
  let educationCount = 1;
  document.getElementById('add-education').addEventListener('click', () => {
    const container = document.getElementById('education-container');
    const entry = document.createElement('div');
    entry.className = 'education-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
    entry.innerHTML = `
      <div>
        <label for="degree-${educationCount}" class="block text-sm font-medium text-gray-700">Degree</label>
        <input type="text" id="degree-${educationCount}" name="degree-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
      <div>
        <label for="institution-${educationCount}" class="block text-sm font-medium text-gray-700">Institution</label>
        <input type="text" id="institution-${educationCount}" name="institution-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
      <div>
        <label for="start-${educationCount}" class="block text-sm font-medium text-gray-700">Start Year</label>
        <input type="text" id="start-${educationCount}" name="start-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
      <div>
        <label for="end-${educationCount}" class="block text-sm font-medium text-gray-700">End Year</label>
        <input type="text" id="end-${educationCount}" name="end-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
    `;
    container.appendChild(entry);
    educationCount++;
  });

  // Add Skill Entry
  let skillCount = 1;
  document.getElementById('add-skill').addEventListener('click', () => {
    const container = document.getElementById('skills-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `skill-${skillCount}`;
    input.name = `skill-${skillCount}`;
    input.className = 'mt-1 block w-full p-2 border border-gray-300 rounded-md';
    container.appendChild(input);
    skillCount++;
  });

  // Add Language Entry
  let languageCount = 1;
  document.getElementById('add-language').addEventListener('click', () => {
    const container = document.getElementById('languages-container');
    const input = document.createElement('input');
    input.type = 'text';
    input.id = `language-${languageCount}`;
    input.name = `language-${languageCount}`;
    input.className = 'mt-1 block w-full p-2 border border-gray-300 rounded-md';
    container.appendChild(input);
    languageCount++;
  });

  // Add Experience Entry
  let experienceCount = 1;
  document.getElementById('add-experience').addEventListener('click', () => {
    const container = document.getElementById('experience-container');
    const entry = document.createElement('div');
    entry.className = 'experience-entry mt-4';
    entry.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="company-${experienceCount}" class="block text-sm font-medium text-gray-700">Company</label>
          <input type="text" id="company-${experienceCount}" name="company-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        </div>
        <div>
          <label for="role-${experienceCount}" class="block text-sm font-medium text-gray-700">Role</label>
          <input type="text" id="role-${experienceCount}" name="role-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        </div>
        <div>
          <label for="start-exp-${experienceCount}" class="block text-sm font-medium text-gray-700">Start Date</label>
          <input type="text" id="start-exp-${experienceCount}" name="start-exp-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        </div>
        <div>
          <label for="end-exp-${experienceCount}" class="block text-sm font-medium text-gray-700">End Date</label>
          <input type="text" id="end-exp-${experienceCount}" name="end-exp-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
        </div>
      </div>
      <label for="details-${experienceCount}" class="block text-sm font-medium text-gray-700 mt-2">Details</label>
      <textarea id="details-${experienceCount}" name="details-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="3"></textarea>
    `;
    container.appendChild(entry);
    experienceCount++;
  });

  // Add Reference Entry
  let referenceCount = 1;
  document.getElementById('add-reference').addEventListener('click', () => {
    const container = document.getElementById('references-container');
    const entry = document.createElement('div');
    entry.className = 'reference-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
    entry.innerHTML = `
      <div>
        <label for="ref-name-${referenceCount}" class="block text-sm font-medium text-gray-700">Name</label>
        <input type="text" id="ref-name-${referenceCount}" name="ref-name-${referenceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
      <div>
        <label for="ref-role-${referenceCount}" class="block text-sm font-medium text-gray-700">Role</label>
        <input type="text" id="ref-role-${referenceCount}" name="ref-role-${referenceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
      <div>
        <label for="ref-phone-${referenceCount}" class="block text-sm font-medium text-gray-700">Phone</label>
        <input type="tel" id="ref-phone-${referenceCount}" name="ref-phone-${referenceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
      <div>
        <label for="ref-email-${referenceCount}" class="block text-sm font-medium text-gray-700">Email</label>
        <input type="email" id="ref-email-${referenceCount}" name="ref-email-${referenceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
    `;
    container.appendChild(entry);
    referenceCount++;
  });

  // Add Social Entry
  let socialCount = 1;
  document.getElementById('add-social').addEventListener('click', () => {
    const container = document.getElementById('socials-container');
    const entry = document.createElement('div');
    entry.className = 'social-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
    entry.innerHTML = `
      <div class="relative">
        <label for="social-name-${socialCount}" class="block text-sm font-medium text-gray-700">Platform</label>
        <select id="social-name-${socialCount}" name="social-name-${socialCount}" class="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md">
          <option value="" disabled selected>Select a platform</option>
          <option value="LinkedIn">LinkedIn</option>
          <option value="Twitter">Twitter</option>
          <option value="Facebook">Facebook</option>
        </select>
        <i class="icon-preview fas fa-globe" data-index="${socialCount}"></i>
      </div>
      <div>
        <label for="social-url-${socialCount}" class="block text-sm font-medium text-gray-700">URL</label>
        <input type="url" id="social-url-${socialCount}" name="social-url-${socialCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md">
      </div>
    `;
    container.appendChild(entry);

    // Add event listener for the new platform select
    const select = document.getElementById(`social-name-${socialCount}`);
    select.addEventListener('change', (e) => {
      updateIcon(socialCount, e.target.value);
    });

    socialCount++;
  });

  // Add event listener for the initial social platform select
  document.getElementById('social-name-0').addEventListener('change', (e) => {
    updateIcon(0, e.target.value);
  });

  // Form Submission
  document.getElementById('resumeForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      title: formData.get('title'),
      contact: {
        phone: formData.get('phone'),
        email: formData.get('email'),
        address: formData.get('address')
      },
      about: formData.get('about'),
      education: [],
      skills: [],
      languages: [],
      experience: [],
      references: [],
      footer: {
        text: `© ${new Date().getFullYear()} ${formData.get('name')}. All rights reserved.`,
        socials: []
      }
    };

    // Collect Education
    for (let i = 0; i < educationCount; i++) {
      const degree = formData.get(`degree-${i}`);
      if (degree) {
        data.education.push({
          degree,
          institution: formData.get(`institution-${i}`),
          start: formData.get(`start-${i}`),
          end: formData.get(`end-${i}`)
        });
      }
    }

    // Collect Skills
    for (let i = 0; i < skillCount; i++) {
      const skill = formData.get(`skill-${i}`);
      if (skill) data.skills.push(skill);
    }

    // Collect Languages
    for (let i = 0; i < languageCount; i++) {
      const language = formData.get(`language-${i}`);
      if (language) data.languages.push(language);
    }

    // Collect Experience
    for (let i = 0; i < experienceCount; i++) {
      const company = formData.get(`company-${i}`);
      if (company) {
        const details = formData.get(`details-${i}`);
        data.experience.push({
          company,
          role: formData.get(`role-${i}`),
          start: formData.get(`start-exp-${i}`),
          end: formData.get(`end-exp-${i}`),
          details: details ? details.split('\n').filter(d => d.trim()) : []
        });
      }
    }

    // Collect References
    for (let i = 0; i < referenceCount; i++) {
      const name = formData.get(`ref-name-${i}`);
      if (name) {
        data.references.push({
          name,
          role: formData.get(`ref-role-${i}`),
          phone: formData.get(`ref-phone-${i}`),
          email: formData.get(`ref-email-${i}`)
        });
      }
    }

    // Collect Socials
    for (let i = 0; i < socialCount; i++) {
      const name = formData.get(`social-name-${i}`);
      if (name) {
        data.footer.socials.push({
          name,
          url: formData.get(`social-url-${i}`),
          icon: `${name.toLowerCase().trim()}.svg`
        });
      }
    }

    // Create and download JSON file
    const jsonString = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'data.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    console.log(jsonString);
    alert('Form submitted! JSON file downloaded and logged to console.');
  });
});