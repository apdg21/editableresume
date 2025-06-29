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
  for (let i = 0; i < 3; i++) {
    const platform = document.getElementById(`social-platform-${i}`).value;
    updateIcon(i, platform);
    document.getElementById(`social-platform-${i}`).addEventListener('change', (e) => {
      updateIcon(i, e.target.value);
    });
  }

  // Add Social Link
  let socialCount = 3;
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

  // Add Stats
  let statsCount = 3;
  document.getElementById('add-stats').addEventListener('click', () => {
    const container = document.getElementById('stats-container');
    const entry = document.createElement('div');
    entry.className = 'stats-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
    entry.innerHTML = `
      <div>
        <label for="stats-value-${statsCount}" class="block text-sm font-medium text-gray-700">Value</label>
        <input type="text" id="stats-value-${statsCount}" name="stats-value-${statsCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 4+">
      </div>
      <div>
        <label for="stats-label-${statsCount}" class="block text-sm font-medium text-gray-700">Label</label>
        <input type="text" id="stats-label-${statsCount}" name="stats-label-${statsCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Years Experience">
      </div>
    `;
    container.appendChild(entry);
    statsCount++;
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
          <label for="exp-date-${experienceCount}" class="block text-sm font-medium text-gray-700">Date</label>
          <input type="text" id="exp-date-${experienceCount}" name="exp-date-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., June 2022 - May 2024">
        </div>
        <div>
          <label for="exp-title-${experienceCount}" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="exp-title-${experienceCount}" name="exp-title-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Senior Graphic Designer">
        </div>
        <div>
          <label for="exp-company-${experienceCount}" class="block text-sm font-medium text-gray-700">Company</label>
          <input type="text" id="exp-company-${experienceCount}" name="exp-company-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Fradel and Spies Company">
        </div>
      </div>
      <label for="exp-responsibilities-${experienceCount}" class="block text-sm font-medium text-gray-700 mt-2">Responsibilities (one per line)</label>
      <textarea id="exp-responsibilities-${experienceCount}" name="exp-responsibilities-${experienceCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="4" placeholder="Enter one responsibility per line, e.g.:
Designed branding materials...
Collaborated with teams..."></textarea>
    `;
    container.appendChild(entry);
    experienceCount++;
  });

  // Add Skill Category and Items
  let skillCategoryCount = 3;
  let skillItemCounts = [3, 2, 3]; // Track item counts per category
  document.getElementById('add-skill-category').addEventListener('click', () => {
    const container = document.getElementById('skills-container');
    const entry = document.createElement('div');
    entry.className = 'skills-entry mt-4';
    entry.innerHTML = `
      <label for="skill-category-${skillCategoryCount}" class="block text-sm font-medium text-gray-700">Category</label>
      <input type="text" id="skill-category-${skillCategoryCount}" name="skill-category-${skillCategoryCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Design">
      <div id="skill-items-${skillCategoryCount}" class="space-y-2 mt-2">
        <div class="skill-item grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label for="skill-name-${skillCategoryCount}-0" class="block text-sm font-medium text-gray-700">Skill Name</label>
            <input type="text" id="skill-name-${skillCategoryCount}-0" name="skill-name-${skillCategoryCount}-0" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
          </div>
          <div>
            <label for="skill-progress-${skillCategoryCount}-0" class="block text-sm font-medium text-gray-700">Progress (%)</label>
            <input type="number" id="skill-progress-${skillCategoryCount}-0" name="skill-progress-${skillCategoryCount}-0" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
          </div>
        </div>
      </div>
      <button type="button" class="add-skill-item mt-2 text-blue-600 hover:underline" data-category="${skillCategoryCount}">Add Another Skill Item</button>
    `;
    container.appendChild(entry);
    skillItemCounts.push(1);
    entry.querySelector('.add-skill-item').addEventListener('click', () => {
      const categoryIndex = skillCategoryCount;
      const itemIndex = skillItemCounts[categoryIndex]++;
      const itemsContainer = document.getElementById(`skill-items-${categoryIndex}`);
      const itemEntry = document.createElement('div');
      itemEntry.className = 'skill-item grid grid-cols-1 md:grid-cols-2 gap-4 mt-2';
      itemEntry.innerHTML = `
        <div>
          <label for="skill-name-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Skill Name</label>
          <input type="text" id="skill-name-${categoryIndex}-${itemIndex}" name="skill-name-${categoryIndex}-${itemIndex}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
        </div>
        <div>
          <label for="skill-progress-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Progress (%)</label>
          <input type="number" id="skill-progress-${categoryIndex}-${itemIndex}" name="skill-progress-${categoryIndex}-${itemIndex}" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
        </div>
      `;
      itemsContainer.appendChild(itemEntry);
    });
    skillCategoryCount++;
  });

  // Add Skill Item for existing categories
  document.querySelectorAll('.add-skill-item').forEach(button => {
    button.addEventListener('click', () => {
      const categoryIndex = parseInt(button.getAttribute('data-category'));
      const itemIndex = skillItemCounts[categoryIndex]++;
      const itemsContainer = document.getElementById(`skill-items-${categoryIndex}`);
      const itemEntry = document.createElement('div');
      itemEntry.className = 'skill-item grid grid-cols-1 md:grid-cols-2 gap-4 mt-2';
      itemEntry.innerHTML = `
        <div>
          <label for="skill-name-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Skill Name</label>
          <input type="text" id="skill-name-${categoryIndex}-${itemIndex}" name="skill-name-${categoryIndex}-${itemIndex}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
        </div>
        <div>
          <label for="skill-progress-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Progress (%)</label>
          <input type="number" id="skill-progress-${categoryIndex}-${itemIndex}" name="skill-progress-${categoryIndex}-${itemIndex}" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
        </div>
      `;
      itemsContainer.appendChild(itemEntry);
    });
  });

  // Add Education
  let educationCount = 1;
  document.getElementById('add-education').addEventListener('click', () => {
    const container = document.getElementById('education-container');
    const entry = document.createElement('div');
    entry.className = 'education-entry mt-4';
    entry.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="edu-date-${educationCount}" class="block text-sm font-medium text-gray-700">Date</label>
          <input type="text" id="edu-date-${educationCount}" name="edu-date-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 2016 - 2020">
        </div>
        <div>
          <label for="edu-title-${educationCount}" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="edu-title-${educationCount}" name="edu-title-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Bachelor of Fine Arts in Graphic Design">
        </div>
        <div>
          <label for="edu-institution-${educationCount}" class="block text-sm font-medium text-gray-700">Institution</label>
          <input type="text" id="edu-institution-${educationCount}" name="edu-institution-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Paucek and Lage University">
        </div>
      </div>
      <label for="edu-description-${educationCount}" class="block text-sm font-medium text-gray-700 mt-2">Description</label>
      <textarea id="edu-description-${educationCount}" name="edu-description-${educationCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="3" placeholder="e.g., Major in Graphic Design, Paucek and Lage University, 123 Anywhere St., Any City"></textarea>
    `;
    container.appendChild(entry);
    educationCount++;
  });

  // Add Award
  let awardCount = 2;
  document.getElementById('add-award').addEventListener('click', () => {
    const container = document.getElementById('awards-container');
    const entry = document.createElement('div');
    entry.className = 'awards-entry mt-4';
    entry.innerHTML = `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label for="award-date-${awardCount}" class="block text-sm font-medium text-gray-700">Date</label>
          <input type="text" id="award-date-${awardCount}" name="award-date-${awardCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 2023">
        </div>
        <div>
          <label for="award-title-${awardCount}" class="block text-sm font-medium text-gray-700">Title</label>
          <input type="text" id="award-title-${awardCount}" name="award-title-${awardCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Design Excellence Award">
        </div>
        <div>
          <label for="award-institution-${awardCount}" class="block text-sm font-medium text-gray-700">Institution</label>
          <input type="text" id="award-institution-${awardCount}" name="award-institution-${awardCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., International Design Association">
        </div>
      </div>
      <label for="award-description-${awardCount}" class="block text-sm font-medium text-gray-700 mt-2">Description</label>
      <textarea id="award-description-${awardCount}" name="award-description-${awardCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="3" placeholder="e.g., Received for outstanding contributions to graphic design"></textarea>
    `;
    container.appendChild(entry);
    awardCount++;
  });

  // Form Submission
  document.getElementById('portfolioForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: `${formData.get('name')} | ${formData.get('hero-title') || 'Portfolio'}`,
      profile: {
        name: formData.get('name'),
        image: formData.get('profile-image') ? `assets/${formData.get('profile-image').name}` : 'assets/profile.jpg',
        social_links: []
      },
      hero: {
        title: formData.get('hero-title'),
        description: formData.get('hero-description'),
        image: formData.get('hero-image') ? `assets/${formData.get('hero-image').name}` : 'assets/designer-work.jpg'
      },
      about: {
        description: formData.get('about-description') ? [formData.get('about-description')] : [],
        personal_info: {
          email: formData.get('personal-email'),
          location: formData.get('personal-location'),
          availability: formData.get('personal-availability')
        },
        stats: []
      },
      experience: [],
      skills: [],
      education: [],
      awards: [],
      contact: {
        email: formData.get('contact-email'),
        phone: formData.get('contact-phone'),
        location: formData.get('contact-location')
      },
      footer: {
        copyright: `© ${new Date().getFullYear()} ${formData.get('name')}. All rights reserved.`
      }
    };

    // Collect Social Links
    for (let i = 0; i < socialCount; i++) {
      const platform = formData.get(`social-platform-${i}`);
      if (platform) {
        data.profile.social_links.push({
          platform,
          url: formData.get(`social-url-${i}`) || '',
          icon: `fab fa-${platform.toLowerCase()}`
        });
      }
    }

    // Collect Stats
    for (let i = 0; i < statsCount; i++) {
      const value = formData.get(`stats-value-${i}`);
      if (value) {
        data.about.stats.push({
          value,
          label: formData.get(`stats-label-${i}`) || ''
        });
      }
    }

    // Collect Experience
    for (let i = 0; i < experienceCount; i++) {
      const date = formData.get(`exp-date-${i}`);
      if (date) {
        const responsibilities = formData.get(`exp-responsibilities-${i}`);
        data.experience.push({
          date,
          title: formData.get(`exp-title-${i}`) || '',
          company: formData.get(`exp-company-${i}`) || '',
          responsibilities: responsibilities ? responsibilities.split('\n').filter(r => r.trim()) : []
        });
      }
    }

    // Collect Skills
    for (let i = 0; i < skillCategoryCount; i++) {
      const category = formData.get(`skill-category-${i}`);
      if (category) {
        const items = [];
        for (let j = 0; j < skillItemCounts[i]; j++) {
          const name = formData.get(`skill-name-${i}-${j}`);
          if (name) {
            items.push({
              name,
              progress: parseInt(formData.get(`skill-progress-${i}-${j}`)) || 0
            });
          }
        }
        if (items.length > 0) {
          data.skills.push({ category, items });
        }
      }
    }

    // Collect Education
    for (let i = 0; i < educationCount; i++) {
      const date = formData.get(`edu-date-${i}`);
      if (date) {
        data.education.push({
          date,
          title: formData.get(`edu-title-${i}`) || '',
          institution: formData.get(`edu-institution-${i}`) || '',
          description: formData.get(`edu-description-${i}`) || ''
        });
      }
    }

    // Collect Awards
    for (let i = 0; i < awardCount; i++) {
      const date = formData.get(`award-date-${i}`);
      if (date) {
        data.awards.push({
          date,
          title: formData.get(`award-title-${i}`) || '',
          institution: formData.get(`award-institution-${i}`) || '',
          description: formData.get(`award-description-${i}`) || ''
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