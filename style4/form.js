document.addEventListener('DOMContentLoaded', () => {
  // Map platform names to Font Awesome classes
  const iconMap = {
    'linkedin': 'fab fa-linkedin',
    'twitter': 'fab fa-x-twitter',
    'facebook': 'fab fa-facebook',
    'behance': 'fab fa-behance',
    'dribbble': 'fab fa-dribbble',
    'instagram': 'fab fa-instagram',
    '': 'fab fa-globe' // Default icon for no selection
  };

  // Function to update icon based on platform
  const updateIcon = (index, platform) => {
    const iconElement = document.querySelector(`.icon-preview[data-index="${index}"]`);
    if (iconElement) {
      const platformLower = platform.toLowerCase().trim();
      const iconClass = iconMap[platformLower] || iconMap[''];
      iconElement.className = `icon-preview fas ${iconClass}`;
    }
  };

  // Initialize social platform icons
  document.querySelectorAll('.social-entry select').forEach((select, i) => {
    const platform = select.value;
    updateIcon(i, platform);
    select.addEventListener('change', (e) => {
      updateIcon(i, e.target.value);
    });
  });

  // Navigation smooth scrolling
  document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = e.target.getAttribute('href').substring(1);
      document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Add Social Link
  let socialCount = document.querySelectorAll('.social-entry').length;
  document.getElementById('add-social').addEventListener('click', () => {
    const container = document.getElementById('social-links-container');
    const entry = document.createElement('div');
    entry.className = 'social-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
    entry.setAttribute('data-index', socialCount);
    entry.innerHTML = `
      <div class="relative">
        <label for="social-platform-${socialCount}" class="block text-sm font-medium text-gray-700">Social Platform</label>
        <select id="social-platform-${socialCount}" name="social-platform-${socialCount}" class="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md">
          <option value="" disabled selected>Select a platform</option>
          <option value="linkedin">LinkedIn</option>
          <option value="twitter">Twitter</option>
          <option value="facebook">Facebook</option>
          <option value="behance">Behance</option>
          <option value="dribbble">Dribbble</option>
          <option value="instagram">Instagram</option>
        </select>
        <i class="icon-preview fas fa-globe" data-index="${socialCount}"></i>
      </div>
      <div>
        <label for="social-url-${socialCount}" class="block text-sm font-medium text-gray-700">URL</label>
        <input type="url" id="social-url-${socialCount}" name="social-url-${socialCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., https://linkedin.com/in/yourprofile">
        <button type="button" class="remove-social mt-2 text-red-600 hover:underline" data-index="${socialCount}">Remove</button>
      </div>
    `;
    container.appendChild(entry);
    const select = document.getElementById(`social-platform-${socialCount}`);
    select.addEventListener('change', (e) => {
      updateIcon(socialCount, e.target.value);
    });
    const removeButton = document.querySelector(`.remove-social[data-index="${socialCount}"]`);
    if (removeButton) {
      removeButton.addEventListener('click', () => {
        if (document.querySelectorAll('.social-entry').length > 1) {
          entry.remove();
        } else {
          alert('At least one social link is required.');
        }
      });
    }
    socialCount++;
  });

  // Remove Social Link
  document.querySelectorAll('.remove-social').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const entry = document.querySelector(`.social-entry[data-index="${index}"]`);
      if (document.querySelectorAll('.social-entry').length > 1) {
        if (entry) entry.remove();
      } else {
        alert('At least one social link is required.');
      }
    });
  });

  // Add Stats
  let statsCount = document.querySelectorAll('.stats-entry').length;
  document.getElementById('add-stats').addEventListener('click', () => {
    const container = document.getElementById('stats-container');
    const entry = document.createElement('div');
    entry.className = 'stats-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
    entry.setAttribute('data-index', statsCount);
    entry.innerHTML = `
      <div>
        <label for="stats-value-${statsCount}" class="block text-sm font-medium text-gray-700">Value</label>
        <input type="text" id="stats-value-${statsCount}" name="stats-value-${statsCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 4+">
      </div>
      <div>
        <label for="stats-label-${statsCount}" class="block text-sm font-medium text-gray-700">Label</label>
        <input type="text" id="stats-label-${statsCount}" name="stats-label-${statsCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Years Experience">
        <button type="button" class="remove-stats mt-2 text-red-600 hover:underline" data-index="${statsCount}">Remove</button>
      </div>
    `;
    container.appendChild(entry);
    document.querySelector(`.remove-stats[data-index="${statsCount}"]`).addEventListener('click', () => {
      entry.remove();
    });
    statsCount++;
  });

  // Remove Stats
  document.querySelectorAll('.remove-stats').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const entry = document.querySelector(`.stats-entry[data-index="${index}"]`);
      if (entry) entry.remove();
    });
  });

  // Add Experience
  let experienceCount = document.querySelectorAll('.experience-entry').length;
  document.getElementById('add-experience').addEventListener('click', () => {
    const container = document.getElementById('experience-container');
    const entry = document.createElement('div');
    entry.className = 'experience-entry mt-4';
    entry.setAttribute('data-index', experienceCount);
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
      <button type="button" class="remove-experience mt-2 text-red-600 hover:underline" data-index="${experienceCount}">Remove</button>
    `;
    container.appendChild(entry);
    document.querySelector(`.remove-experience[data-index="${experienceCount}"]`).addEventListener('click', () => {
      if (document.querySelectorAll('.experience-entry').length > 1) {
        entry.remove();
      } else {
        alert('At least one experience entry is required.');
      }
    });
    experienceCount++;
  });

  // Remove Experience
  document.querySelectorAll('.remove-experience').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const entry = document.querySelector(`.experience-entry[data-index="${index}"]`);
      if (document.querySelectorAll('.experience-entry').length > 1) {
        if (entry) entry.remove();
      } else {
        alert('At least one experience entry is required.');
      }
    });
  });

  // Add Skill Category and Items
  let skillCategoryCount = document.querySelectorAll('.skills-entry').length;
  let skillItemCounts = Array.from(document.querySelectorAll('.skills-entry')).map(entry => 
    entry.querySelectorAll('.skill-item').length
  );
  document.getElementById('add-skill-category').addEventListener('click', () => {
    const container = document.getElementById('skills-container');
    const entry = document.createElement('div');
    entry.className = 'skills-entry mt-4';
    entry.setAttribute('data-index', skillCategoryCount);
    entry.innerHTML = `
      <label for="skill-category-${skillCategoryCount}" class="block text-sm font-medium text-gray-700">Category</label>
      <div class="flex items-center gap-2">
        <input type="text" id="skill-category-${skillCategoryCount}" name="skill-category-${skillCategoryCount}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Design">
        <button type="button" class="remove-skill-category mt-2 text-red-600 hover:underline" data-index="${skillCategoryCount}">Remove</button>
      </div>
      <div id="skill-items-${skillCategoryCount}" class="space-y-2 mt-2">
        <div class="skill-item grid grid-cols-1 md:grid-cols-2 gap-4" data-index="0">
          <div>
            <label for="skill-name-${skillCategoryCount}-0" class="block text-sm font-medium text-gray-700">Skill Name</label>
            <input type="text" id="skill-name-${skillCategoryCount}-0" name="skill-name-${skillCategoryCount}-0" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
          </div>
          <div>
            <label for="skill-progress-${skillCategoryCount}-0" class="block text-sm font-medium text-gray-700">Progress (%)</label>
            <input type="number" id="skill-progress-${skillCategoryCount}-0" name="skill-progress-${skillCategoryCount}-0" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
            <button type="button" class="remove-skill-item mt-2 text-red-600 hover:underline" data-category="${skillCategoryCount}" data-index="0">Remove</button>
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
      itemEntry.setAttribute('data-index', itemIndex);
      itemEntry.innerHTML = `
        <div>
          <label for="skill-name-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Skill Name</label>
          <input type="text" id="skill-name-${categoryIndex}-${itemIndex}" name="skill-name-${categoryIndex}-${itemIndex}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
        </div>
        <div>
          <label for="skill-progress-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Progress (%)</label>
          <input type="number" id="skill-progress-${categoryIndex}-${itemIndex}" name="skill-progress-${categoryIndex}-${itemIndex}" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
          <button type="button" class="remove-skill-item mt-2 text-red-600 hover:underline" data-category="${categoryIndex}" data-index="${itemIndex}">Remove</button>
        </div>
      `;
      itemsContainer.appendChild(itemEntry);
      document.querySelector(`.remove-skill-item[data-category="${categoryIndex}"][data-index="${itemIndex}"]`).addEventListener('click', () => {
        if (itemsContainer.querySelectorAll('.skill-item').length > 1) {
          itemEntry.remove();
          skillItemCounts[categoryIndex]--;
        } else {
          alert('At least one skill item is required per category.');
        }
      });
    });
    document.querySelector(`.remove-skill-category[data-index="${skillCategoryCount}"]`).addEventListener('click', () => {
      if (document.querySelectorAll('.skills-entry').length > 1) {
        entry.remove();
        skillItemCounts[skillCategoryCount] = 0;
      } else {
        alert('At least one skill category is required.');
      }
    });
    skillCategoryCount++;
  });

  // Remove Skill Category
  document.querySelectorAll('.remove-skill-category').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const entry = document.querySelector(`.skills-entry[data-index="${index}"]`);
      if (document.querySelectorAll('.skills-entry').length > 1) {
        if (entry) {
          entry.remove();
          skillItemCounts[index] = 0;
        }
      } else {
        alert('At least one skill category is required.');
      }
    });
  });

  // Add Skill Item for existing categories
  document.querySelectorAll('.add-skill-item').forEach(button => {
    button.addEventListener('click', () => {
      const categoryIndex = parseInt(button.getAttribute('data-category'));
      const itemIndex = skillItemCounts[categoryIndex]++;
      const itemsContainer = document.getElementById(`skill-items-${categoryIndex}`);
      const itemEntry = document.createElement('div');
      itemEntry.className = 'skill-item grid grid-cols-1 md:grid-cols-2 gap-4 mt-2';
      itemEntry.setAttribute('data-index', itemIndex);
      itemEntry.innerHTML = `
        <div>
          <label for="skill-name-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Skill Name</label>
          <input type="text" id="skill-name-${categoryIndex}-${itemIndex}" name="skill-name-${categoryIndex}-${itemIndex}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
        </div>
        <div>
          <label for="skill-progress-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Progress (%)</label>
          <input type="number" id="skill-progress-${categoryIndex}-${itemIndex}" name="skill-progress-${categoryIndex}-${itemIndex}" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
          <button type="button" class="remove-skill-item mt-2 text-red-600 hover:underline" data-category="${categoryIndex}" data-index="${itemIndex}">Remove</button>
        </div>
      `;
      itemsContainer.appendChild(itemEntry);
      document.querySelector(`.remove-skill-item[data-category="${categoryIndex}"][data-index="${itemIndex}"]`).addEventListener('click', () => {
        if (itemsContainer.querySelectorAll('.skill-item').length > 1) {
          itemEntry.remove();
          skillItemCounts[categoryIndex]--;
        } else {
          alert('At least one skill item is required per category.');
        }
      });
    });
  });

  // Remove Skill Item
  document.querySelectorAll('.remove-skill-item').forEach(button => {
    button.addEventListener('click', () => {
      const categoryIndex = button.getAttribute('data-category');
      const itemIndex = button.getAttribute('data-index');
      const itemsContainer = document.getElementById(`skill-items-${categoryIndex}`);
      const itemEntry = document.querySelector(`.skill-item[data-index="${itemIndex}"]`);
      if (itemsContainer.querySelectorAll('.skill-item').length > 1) {
        if (itemEntry) {
          itemEntry.remove();
          skillItemCounts[categoryIndex]--;
        }
      } else {
        alert('At least one skill item is required per category.');
      }
    });
  });

  // Add Education
  let educationCount = document.querySelectorAll('.education-entry').length;
  document.getElementById('add-education').addEventListener('click', () => {
    const container = document.getElementById('education-container');
    const entry = document.createElement('div');
    entry.className = 'education-entry mt-4';
    entry.setAttribute('data-index', educationCount);
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
      <button type="button" class="remove-education mt-2 text-red-600 hover:underline" data-index="${educationCount}">Remove</button>
    `;
    container.appendChild(entry);
    document.querySelector(`.remove-education[data-index="${educationCount}"]`).addEventListener('click', () => {
      if (document.querySelectorAll('.education-entry').length > 1) {
        entry.remove();
      } else {
        alert('At least one education entry is required.');
      }
    });
    educationCount++;
  });

  // Remove Education
  document.querySelectorAll('.remove-education').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const entry = document.querySelector(`.education-entry[data-index="${index}"]`);
      if (document.querySelectorAll('.education-entry').length > 1) {
        if (entry) entry.remove();
      } else {
        alert('At least one education entry is required.');
      }
    });
  });

  // Add Award
  let awardCount = document.querySelectorAll('.awards-entry').length;
  document.getElementById('add-award').addEventListener('click', () => {
    const container = document.getElementById('awards-container');
    const entry = document.createElement('div');
    entry.className = 'awards-entry mt-4';
    entry.setAttribute('data-index', awardCount);
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
      <button type="button" class="remove-award mt-2 text-red-600 hover:underline" data-index="${awardCount}">Remove</button>
    `;
    container.appendChild(entry);
    document.querySelector(`.remove-award[data-index="${awardCount}"]`).addEventListener('click', () => {
      entry.remove();
    });
    awardCount++;
  });

  // Remove Award
  document.querySelectorAll('.remove-award').forEach(button => {
    button.addEventListener('click', () => {
      const index = button.getAttribute('data-index');
      const entry = document.querySelector(`.awards-entry[data-index="${index}"]`);
      if (entry) entry.remove();
    });
  });

  // Load Data from JSON
  document.getElementById('load-data-button').addEventListener('click', () => {
    const fileInput = document.getElementById('load-data');
    fileInput.click();
  });

  document.getElementById('load-data').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log('No file selected for loading.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        console.log('Loaded JSON:', data);

        // Clear existing entries
        document.getElementById('social-links-container').innerHTML = '';
        document.getElementById('stats-container').innerHTML = '';
        document.getElementById('experience-container').innerHTML = '';
        document.getElementById('skills-container').innerHTML = '';
        document.getElementById('education-container').innerHTML = '';
        document.getElementById('awards-container').innerHTML = '';
        socialCount = 0;
        statsCount = 0;
        experienceCount = 0;
        skillCategoryCount = 0;
        skillItemCounts = [];
        educationCount = 0;
        awardCount = 0;

        // Populate Profile
        document.getElementById('name').value = data.profile?.name || '';
        document.getElementById('profile-image').value = data.profile?.image || 'assets/profile.jpg';

        // Populate Social Links
        data.profile?.social_links?.forEach((link, i) => {
          const platform = link.platform?.toLowerCase();
          if (!Object.keys(iconMap).includes(platform)) {
            console.warn(`Unknown platform "${platform}" in social link ${i}, using default icon.`);
          }
          const container = document.getElementById('social-links-container');
          const entry = document.createElement('div');
          entry.className = 'social-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
          entry.setAttribute('data-index', i);
          entry.innerHTML = `
            <div class="relative">
              <label for="social-platform-${i}" class="block text-sm font-medium text-gray-700">Social Platform</label>
              <select id="social-platform-${i}" name="social-platform-${i}" class="mt-1 block w-full p-2 pr-10 border border-gray-300 rounded-md">
                <option value="" disabled>Select a platform</option>
                <option value="linkedin"${platform === 'linkedin' ? ' selected' : ''}>LinkedIn</option>
                <option value="twitter"${platform === 'twitter' ? ' selected' : ''}>Twitter</option>
                <option value="facebook"${platform === 'facebook' ? ' selected' : ''}>Facebook</option>
                <option value="behance"${platform === 'behance' ? ' selected' : ''}>Behance</option>
                <option value="dribbble"${platform === 'dribbble' ? ' selected' : ''}>Dribbble</option>
                <option value="instagram"${platform === 'instagram' ? ' selected' : ''}>Instagram</option>
              </select>
              <i class="icon-preview fas ${iconMap[platform] || iconMap['']}" data-index="${i}"></i>
            </div>
            <div>
              <label for="social-url-${i}" class="block text-sm font-medium text-gray-700">URL</label>
              <input type="url" id="social-url-${i}" name="social-url-${i}" value="${link.url || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., https://linkedin.com/in/yourprofile">
              <button type="button" class="remove-social mt-2 text-red-600 hover:underline" data-index="${i}">Remove</button>
            </div>
          `;
          container.appendChild(entry);
          document.getElementById(`social-platform-${i}`).addEventListener('change', (e) => {
            updateIcon(i, e.target.value);
          });
          document.querySelector(`.remove-social[data-index="${i}"]`).addEventListener('click', () => {
            if (document.querySelectorAll('.social-entry').length > 1) {
              entry.remove();
            } else {
              alert('At least one social link is required.');
            }
          });
          socialCount = i + 1;
        });

        // Populate Hero
        document.getElementById('hero-title').value = data.hero?.title || '';
        document.getElementById('hero-image').value = data.hero?.image || 'assets/designer-work.jpg';
        document.getElementById('hero-description').value = data.hero?.description || '';

        // Populate About
        document.getElementById('about-description').value = data.about?.description?.[0] || '';
        document.getElementById('personal-email').value = data.about?.personal_info?.email || '';
        document.getElementById('personal-location').value = data.about?.personal_info?.location || '';
        document.getElementById('personal-availability').value = data.about?.personal_info?.availability || '';

        // Populate Stats
        data.about?.stats?.forEach((stat, i) => {
          const container = document.getElementById('stats-container');
          const entry = document.createElement('div');
          entry.className = 'stats-entry grid grid-cols-1 md:grid-cols-2 gap-4 mt-4';
          entry.setAttribute('data-index', i);
          entry.innerHTML = `
            <div>
              <label for="stats-value-${i}" class="block text-sm font-medium text-gray-700">Value</label>
              <input type="text" id="stats-value-${i}" name="stats-value-${i}" value="${stat.value || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 4+">
            </div>
            <div>
              <label for="stats-label-${i}" class="block text-sm font-medium text-gray-700">Label</label>
              <input type="text" id="stats-label-${i}" name="stats-label-${i}" value="${stat.label || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Years Experience">
              <button type="button" class="remove-stats mt-2 text-red-600 hover:underline" data-index="${i}">Remove</button>
            </div>
          `;
          container.appendChild(entry);
          document.querySelector(`.remove-stats[data-index="${i}"]`).addEventListener('click', () => {
            entry.remove();
          });
          statsCount = i + 1;
        });

        // Populate Experience
        data.experience?.forEach((exp, i) => {
          const container = document.getElementById('experience-container');
          const entry = document.createElement('div');
          entry.className = 'experience-entry mt-4';
          entry.setAttribute('data-index', i);
          entry.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="exp-date-${i}" class="block text-sm font-medium text-gray-700">Date</label>
                <input type="text" id="exp-date-${i}" name="exp-date-${i}" value="${exp.date || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., June 2022 - May 2024">
              </div>
              <div>
                <label for="exp-title-${i}" class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="exp-title-${i}" name="exp-title-${i}" value="${exp.title || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Senior Graphic Designer">
              </div>
              <div>
                <label for="exp-company-${i}" class="block text-sm font-medium text-gray-700">Company</label>
                <input type="text" id="exp-company-${i}" name="exp-company-${i}" value="${exp.company || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Fradel and Spies Company">
              </div>
            </div>
            <label for="exp-responsibilities-${i}" class="block text-sm font-medium text-gray-700 mt-2">Responsibilities (one per line)</label>
            <textarea id="exp-responsibilities-${i}" name="exp-responsibilities-${i}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="4" placeholder="Enter one responsibility per line, e.g.:
Designed branding materials...
Collaborated with teams...">${exp.responsibilities?.join('\n') || ''}</textarea>
            <button type="button" class="remove-experience mt-2 text-red-600 hover:underline" data-index="${i}">Remove</button>
          `;
          container.appendChild(entry);
          document.querySelector(`.remove-experience[data-index="${i}"]`).addEventListener('click', () => {
            if (document.querySelectorAll('.experience-entry').length > 1) {
              entry.remove();
            } else {
              alert('At least one experience entry is required.');
            }
          });
          experienceCount = i + 1;
        });

        // Populate Skills
        data.skills?.forEach((skillCategory, i) => {
          const container = document.getElementById('skills-container');
          const entry = document.createElement('div');
          entry.className = 'skills-entry mt-4';
          entry.setAttribute('data-index', i);
          entry.innerHTML = `
            <label for="skill-category-${i}" class="block text-sm font-medium text-gray-700">Category</label>
            <div class="flex items-center gap-2">
              <input type="text" id="skill-category-${i}" name="skill-category-${i}" value="${skillCategory.category || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Design">
              <button type="button" class="remove-skill-category mt-2 text-red-600 hover:underline" data-index="${i}">Remove</button>
            </div>
            <div id="skill-items-${i}" class="space-y-2 mt-2"></div>
            <button type="button" class="add-skill-item mt-2 text-blue-600 hover:underline" data-category="${i}">Add Another Skill Item</button>
          `;
          container.appendChild(entry);
          const itemsContainer = entry.querySelector(`#skill-items-${i}`);
          skillItemCounts[i] = 0;
          skillCategory.items?.forEach((item, j) => {
            const itemEntry = document.createElement('div');
            itemEntry.className = 'skill-item grid grid-cols-1 md:grid-cols-2 gap-4 mt-2';
            itemEntry.setAttribute('data-index', j);
            itemEntry.innerHTML = `
              <div>
                <label for="skill-name-${i}-${j}" class="block text-sm font-medium text-gray-700">Skill Name</label>
                <input type="text" id="skill-name-${i}-${j}" name="skill-name-${i}-${j}" value="${item.name || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
              </div>
              <div>
                <label for="skill-progress-${i}-${j}" class="block text-sm font-medium text-gray-700">Progress (%)</label>
                <input type="number" id="skill-progress-${i}-${j}" name="skill-progress-${i}-${j}" value="${item.progress || 0}" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
                <button type="button" class="remove-skill-item mt-2 text-red-600 hover:underline" data-category="${i}" data-index="${j}">Remove</button>
              </div>
            `;
            itemsContainer.appendChild(itemEntry);
            document.querySelector(`.remove-skill-item[data-category="${i}"][data-index="${j}"]`).addEventListener('click', () => {
              if (itemsContainer.querySelectorAll('.skill-item').length > 1) {
                itemEntry.remove();
                skillItemCounts[i]--;
              } else {
                alert('At least one skill item is required per category.');
              }
            });
            skillItemCounts[i]++;
          });
          entry.querySelector('.add-skill-item').addEventListener('click', () => {
            const categoryIndex = i;
            const itemIndex = skillItemCounts[categoryIndex]++;
            const itemEntry = document.createElement('div');
            itemEntry.className = 'skill-item grid grid-cols-1 md:grid-cols-2 gap-4 mt-2';
            itemEntry.setAttribute('data-index', itemIndex);
            itemEntry.innerHTML = `
              <div>
                <label for="skill-name-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Skill Name</label>
                <input type="text" id="skill-name-${categoryIndex}-${itemIndex}" name="skill-name-${categoryIndex}-${itemIndex}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Graphic Design">
              </div>
              <div>
                <label for="skill-progress-${categoryIndex}-${itemIndex}" class="block text-sm font-medium text-gray-700">Progress (%)</label>
                <input type="number" id="skill-progress-${categoryIndex}-${itemIndex}" name="skill-progress-${categoryIndex}-${itemIndex}" min="0" max="100" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 90" title="Enter a number between 0 and 100">
                <button type="button" class="remove-skill-item mt-2 text-red-600 hover:underline" data-category="${categoryIndex}" data-index="${itemIndex}">Remove</button>
              </div>
            `;
            itemsContainer.appendChild(itemEntry);
            document.querySelector(`.remove-skill-item[data-category="${categoryIndex}"][data-index="${itemIndex}"]`).addEventListener('click', () => {
              if (itemsContainer.querySelectorAll('.skill-item').length > 1) {
                itemEntry.remove();
                skillItemCounts[categoryIndex]--;
              } else {
                alert('At least one skill item is required per category.');
              }
            });
          });
          document.querySelector(`.remove-skill-category[data-index="${i}"]`).addEventListener('click', () => {
            if (document.querySelectorAll('.skills-entry').length > 1) {
              entry.remove();
              skillItemCounts[i] = 0;
            } else {
              alert('At least one skill category is required.');
            }
          });
          skillCategoryCount = i + 1;
        });

        // Populate Education
        data.education?.forEach((edu, i) => {
          const container = document.getElementById('education-container');
          const entry = document.createElement('div');
          entry.className = 'education-entry mt-4';
          entry.setAttribute('data-index', i);
          entry.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="edu-date-${i}" class="block text-sm font-medium text-gray-700">Date</label>
                <input type="text" id="edu-date-${i}" name="edu-date-${i}" value="${edu.date || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 2016 - 2020">
              </div>
              <div>
                <label for="edu-title-${i}" class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="edu-title-${i}" name="edu-title-${i}" value="${edu.title || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Bachelor of Fine Arts in Graphic Design">
              </div>
              <div>
                <label for="edu-institution-${i}" class="block text-sm font-medium text-gray-700">Institution</label>
                <input type="text" id="edu-institution-${i}" name="edu-institution-${i}" value="${edu.institution || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Paucek and Lage University">
              </div>
            </div>
            <label for="edu-description-${i}" class="block text-sm font-medium text-gray-700 mt-2">Description</label>
            <textarea id="edu-description-${i}" name="edu-description-${i}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="3" placeholder="e.g., Major in Graphic Design, Paucek and Lage University, 123 Anywhere St., Any City">${edu.description || ''}</textarea>
            <button type="button" class="remove-education mt-2 text-red-600 hover:underline" data-index="${i}">Remove</button>
          `;
          container.appendChild(entry);
          document.querySelector(`.remove-education[data-index="${i}"]`).addEventListener('click', () => {
            if (document.querySelectorAll('.education-entry').length > 1) {
              entry.remove();
            } else {
              alert('At least one education entry is required.');
            }
          });
          educationCount = i + 1;
        });

        // Populate Awards
        data.awards?.forEach((award, i) => {
          const container = document.getElementById('awards-container');
          const entry = document.createElement('div');
          entry.className = 'awards-entry mt-4';
          entry.setAttribute('data-index', i);
          entry.innerHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="award-date-${i}" class="block text-sm font-medium text-gray-700">Date</label>
                <input type="text" id="award-date-${i}" name="award-date-${i}" value="${award.date || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., 2023">
              </div>
              <div>
                <label for="award-title-${i}" class="block text-sm font-medium text-gray-700">Title</label>
                <input type="text" id="award-title-${i}" name="award-title-${i}" value="${award.title || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., Design Excellence Award">
              </div>
              <div>
                <label for="award-institution-${i}" class="block text-sm font-medium text-gray-700">Institution</label>
                <input type="text" id="award-institution-${i}" name="award-institution-${i}" value="${award.institution || ''}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., International Design Association">
              </div>
            </div>
            <label for="award-description-${i}" class="block text-sm font-medium text-gray-700 mt-2">Description</label>
            <textarea id="award-description-${i}" name="award-description-${i}" class="mt-1 block w-full p-2 border border-gray-300 rounded-md" rows="3" placeholder="e.g., Received for outstanding contributions to graphic design">${award.description || ''}</textarea>
            <button type="button" class="remove-award mt-2 text-red-600 hover:underline" data-index="${i}">Remove</button>
          `;
          container.appendChild(entry);
          document.querySelector(`.remove-award[data-index="${i}"]`).addEventListener('click', () => {
            entry.remove();
          });
          awardCount = i + 1;
        });

        // Populate Contact
        document.getElementById('contact-email').value = data.contact?.email || '';
        document.getElementById('contact-phone').value = data.contact?.phone || '';
        document.getElementById('contact-location').value = data.contact?.location || '';

        alert('Data loaded successfully!');
      } catch (error) {
        console.error('Error loading JSON:', error);
        alert('Failed to load data.json. Please ensure the file is a valid JSON with the correct structure.');
      }
    };
    reader.readAsText(file);
  });

  // Form Submission
  document.getElementById('portfolioForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: `${formData.get('name')} | ${formData.get('hero-title') || 'Portfolio'}`,
      profile: {
        name: formData.get('name'),
        image: formData.get('profile-image') || 'assets/profile.jpg',
        social_links: []
      },
      hero: {
        title: formData.get('hero-title'),
        description: formData.get('hero-description'),
        image: formData.get('hero-image') || 'assets/designer-work.jpg'
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
    document.querySelectorAll('.social-entry').forEach((entry, i) => {
      const platform = formData.get(`social-platform-${i}`);
      const url = formData.get(`social-url-${i}`);
      if (platform && url) {
        data.profile.social_links.push({
          platform,
          url,
          icon: `fas ${iconMap[platform.toLowerCase()] || iconMap['']}`
        });
      }
    });

    // Collect Stats
    document.querySelectorAll('.stats-entry').forEach((entry, i) => {
      const value = formData.get(`stats-value-${i}`);
      const label = formData.get(`stats-label-${i}`);
      if (value && label) {
        data.about.stats.push({
          value,
          label
        });
      }
    });

    // Collect Experience
    document.querySelectorAll('.experience-entry').forEach((entry, i) => {
      const date = formData.get(`exp-date-${i}`);
      const title = formData.get(`exp-title-${i}`);
      const company = formData.get(`exp-company-${i}`);
      const responsibilities = formData.get(`exp-responsibilities-${i}`);
      if (date && title && company) {
        data.experience.push({
          date,
          title,
          company,
          responsibilities: responsibilities ? responsibilities.split('\n').filter(r => r.trim()) : []
        });
      }
    });

    // Collect Skills
    document.querySelectorAll('.skills-entry').forEach((entry, i) => {
      const category = formData.get(`skill-category-${i}`);
      if (category) {
        const items = [];
        const itemsContainer = document.getElementById(`skill-items-${i}`);
        if (itemsContainer) {
          itemsContainer.querySelectorAll('.skill-item').forEach((item, j) => {
            const name = formData.get(`skill-name-${i}-${j}`);
            const progress = formData.get(`skill-progress-${i}-${j}`);
            if (name && progress) {
              items.push({
                name,
                progress: parseInt(progress) || 0
              });
            }
          });
        }
        if (items.length > 0) {
          data.skills.push({ category, items });
        }
      }
    });

    // Collect Education
    document.querySelectorAll('.education-entry').forEach((entry, i) => {
      const date = formData.get(`edu-date-${i}`);
      const title = formData.get(`edu-title-${i}`);
      const institution = formData.get(`edu-institution-${i}`);
      const description = formData.get(`edu-description-${i}`);
      if (date && title && institution) {
        data.education.push({
          date,
          title,
          institution,
          description
        });
      }
    });

    // Collect Awards
    document.querySelectorAll('.awards-entry').forEach((entry, i) => {
      const date = formData.get(`award-date-${i}`);
      const title = formData.get(`award-title-${i}`);
      const institution = formData.get(`award-institution-${i}`);
      const description = formData.get(`award-description-${i}`);
      if (date && title && institution) {
        data.awards.push({
          date,
          title,
          institution,
          description
        });
      }
    });

    // Validate required fields
    if (!data.profile.name) {
      alert('Name is required.');
      return;
    }
    if (!data.hero.title) {
      alert('Hero title is required.');
      return;
    }
    if (!data.profile.social_links.length) {
      alert('At least one social link is required.');
      return;
    }
    if (!data.experience.length) {
      alert('At least one experience entry is required.');
      return;
    }
    if (!data.skills.length) {
      alert('At least one skill category with items is required.');
      return;
    }
    if (!data.education.length) {
      alert('At least one education entry is required.');
      return;
    }
    if (!data.contact.email) {
      alert('Contact email is required.');
      return;
    }

    // Create and download JSON file
    try {
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
      console.log('Generated JSON:', jsonString);
      alert('Form submitted! JSON file downloaded and logged to console.');
    } catch (error) {
      console.error('Error generating JSON:', error);
      alert('Failed to generate data.json. Please check the console for details.');
    }
  });
});