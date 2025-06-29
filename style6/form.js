document.addEventListener('DOMContentLoaded', () => {
  // Map platform names to Font Awesome classes
  const iconMap = {
    'linkedin': 'fa-linkedin',
    'twitter': 'fa-x-twitter',
    'facebook': 'fa-facebook',
    '': 'fa-globe' // Default icon for no selection
  };

  // Function to update icon based on platform
  const updateIcon = (index, platform) => {
    const iconElement = document.querySelector(`.icon-preview[data-index="${index}"]`);
    const platformLower = platform.toLowerCase().trim();
    const iconClass = iconMap[platformLower] || iconMap[''];
    iconElement.className = `icon-preview fas ${iconClass}`;
  };

  // Initialize social platform icons
  for (let i = 0; i < 2; i++) {
    const platform = document.getElementById(`social-platform-${i}`).value;
    updateIcon(i, platform);
    document.getElementById(`social-platform-${i}`).addEventListener('change', (e) => {
      updateIcon(i, e.target.value);
    });
  }

  // Add Social Link
  let socialCount = 2;
  document.getElementById('add-social').addEventListener('click', () => {
    const container = document.getElementById('social-links-container');
    const entry = document.createElement('div');
    entry.className = 'social-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
    entry.innerHTML = `
      <div class="relative">
        <label for="social-platform-${socialCount}" class="block text-sm font-medium text-gray-700">Social Platform</label>
        <select id="social-platform-${socialCount}" name="social-platform-${socialCount}" class="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md">
          <option value="" disabled selected>Select a platform</option>
          <option value="linkedin">LinkedIn</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
        </select>
        <i class="icon-preview fas fa-globe" data-index="${socialCount}"></i>
      </div>
      <div>
        <label for="social-url-${socialCount}" class="block text-sm font-medium text-gray-700">URL</label>
        <input type="url" id="social-url-${socialCount}" name="social-url-${socialCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., https://linkedin.com/in/yourprofile">
      </div>
    `;
    container.appendChild(entry);
    document.getElementById(`social-platform-${socialCount}`).addEventListener('change', (e) => {
      updateIcon(socialCount, e.target.value);
    });
    socialCount++;
  });

  // Add Skill
  let skillCount = 5;
  document.getElementById('add-skill').addEventListener('click', () => {
    const container = document.getElementById('skills-container');
    const entry = document.createElement('div');
    entry.className = 'skills-entry mt-4';
    entry.innerHTML = `
      <label for="skill-${skillCount}" class="block text-sm font-medium text-gray-700">Skill</label>
      <input type="text" id="skill-${skillCount}" name="skill-${skillCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Web Design">
    `;
    container.appendChild(entry);
    skillCount++;
  });

  // Add Language
  let languageCount = 2;
  document.getElementById('add-language').addEventListener('click', () => {
    const container = document.getElementById('languages-container');
    const entry = document.createElement('div');
    entry.className = 'languages-entry mt-4';
    entry.innerHTML = `
      <label for="language-${languageCount}" class="block text-sm font-medium text-gray-700">Language</label>
      <input type="text" id="language-${languageCount}" name="language-${languageCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., English">
    `;
    container.appendChild(entry);
    languageCount++;
  });

  // Add Education
  let educationCount = 2;
  document.getElementById('add-education').addEventListener('click', () => {
    const container = document.getElementById('education-container');
    const entry = document.createElement('div');
    entry.className = 'education-entry mt-4';
    entry.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="edu-years-${educationCount}" class="block text-sm font-medium text-gray-700">Years</label>
          <input type="text" id="edu-years-${educationCount}" name="edu-years-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 2011-2015">
        </div>
        <div>
          <label for="edu-degree-${educationCount}" class="block text-sm font-medium text-gray-700">Degree</label>
          <input type="text" id="edu-degree-${educationCount}" name="edu-degree-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Bachelor of Design">
        </div>
        <div>
          <label for="edu-university-${educationCount}" class="block text-sm font-medium text-gray-700">University</label>
          <input type="text" id="edu-university-${educationCount}" name="edu-university-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., WARDIERE UNIVERSITY">
        </div>
        <div>
          <label for="edu-grade-${educationCount}" class="block text-sm font-medium text-gray-700">Grade</label>
          <input type="text" id="edu-grade-${educationCount}" name="edu-grade-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 3.65" title="Enter GPA or equivalent">
        </div>
      </div>
    `;
    container.appendChild(entry);
    educationCount++;
  });

  // Add Experience
  let experienceCount = 2;
  document.getElementById('add-experience').addEventListener('click', () => {
    const container = document.getElementById('experience-container');
    const entry = document.createElement('div');
    entry.className = 'experience-entry mt-4';
    entry.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="exp-years-${experienceCount}" class="block text-sm font-medium text-gray-700">Years</label>
          <input type="text" id="exp-years-${experienceCount}" name="exp-years-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 2020-2023">
        </div>
        <div>
          <label for="exp-title-${experienceCount}" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="exp-title-${experienceCount}" name="exp-title-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Senior Graphic Designer">
        </div>
        <div>
          <label for="exp-company-${experienceCount}" class="block text-sm font-medium text-gray-700">Company</label>
          <input type="text" id="exp-company-${experienceCount}" name="exp-company-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Fauget Studio">
        </div>
      </div>
      <label for="exp-responsibilities-${experienceCount}" class="block text-sm font-medium text-gray-700 mt-2">Responsibilities (one per line)</label>
      <textarea id="exp-responsibilities-${experienceCount}" name="exp-responsibilities-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="4" placeholder="Enter one responsibility per line, e.g.:
Created over 100 graphic designs...
Completed complex projects..."></textarea>
    `;
    container.appendChild(entry);
    experienceCount++;
  });

  // Form Submission
  document.getElementById('portfolioForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      title: formData.get('title'),
      aboutMe: formData.get('aboutMe'),
      contact: {
        phone: formData.get('contact-phone'),
        email: formData.get('contact-email'),
        address: formData.get('contact-address')
      },
      skills: [],
      languages: [],
      education: [],
      experience: [],
      social_links: []
    };

    // Collect Social Links
    for (let i = 0; i < socialCount; i++) {
      const platform = formData.get(`social-platform-${i}`);
      if (platform) {
        data.social_links.push({
          platform,
          url: formData.get(`social-url-${i}`) || '',
          icon: `fab fa-${platform.toLowerCase()}`
        });
      }
    }

    // Collect Skills
    for (let i = 0; i < skillCount; i++) {
      const skill = formData.get(`skill-${i}`);
      if (skill) {
        data.skills.push(skill);
      }
    }

    // Collect Languages
    for (let i = 0; i < languageCount; i++) {
      const language = formData.get(`language-${i}`);
      if (language) {
        data.languages.push(language);
      }
    }

    // Collect Education
    for (let i = 0; i < educationCount; i++) {
      const years = formData.get(`edu-years-${i}`);
      if (years) {
        data.education.push({
          years,
          degree: formData.get(`edu-degree-${i}`) || '',
          university: formData.get(`edu-university-${i}`) || '',
          grade: formData.get(`edu-grade-${i}`) || ''
        });
      }
    }

    // Collect Experience
    for (let i = 0; i < experienceCount; i++) {
      const years = formData.get(`exp-years-${i}`);
      if (years) {
        const responsibilities = formData.get(`exp-responsibilities-${i}`);
        data.experience.push({
          years,
          title: formData.get(`exp-title-${i}`) || '',
          company: formData.get(`exp-company-${i}`) || '',
          responsibilities: responsibilities ? responsibilities.split('\n').filter(r => r.trim()) : []
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