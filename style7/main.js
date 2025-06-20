document.addEventListener('DOMContentLoaded', function() {
  // Try loading from localStorage first
  const cachedData = localStorage.getItem('resumeData');
  if (cachedData) {
    try {
      populateData(JSON.parse(cachedData));
      return;
    } catch (e) {
      console.error("Error parsing cached data:", e);
      localStorage.removeItem('resumeData');
    }
  }

  // Fetch fresh data
  fetch('data.json')
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      populateData(data);
      // Cache the data
      localStorage.setItem('resumeData', JSON.stringify(data));
    })
    .catch(err => {
      console.error("Error loading resume data:", err);
      showError();
    });
});

function populateData(data) {
  try {
    // Basic Info
    document.getElementById('profileImage').src = data.profile_image || 'assets/default-profile.jpg';
    document.getElementById('profileImage').alt = `Profile photo of ${data.name}`;
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('about').textContent = data.about;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('email').textContent = data.email;
    document.getElementById('location').textContent = data.location;
    document.getElementById('summary').textContent = data.summary;

    // Languages
    const langList = document.getElementById('languages');
    data.languages?.forEach(lang => {
      const li = document.createElement('li');
      li.textContent = lang;
      langList.appendChild(li);
    });

    // Experience
    const expDiv = document.getElementById('experience');
    data.experience?.forEach(job => {
      const div = document.createElement('div');
      div.className = 'job';
      div.innerHTML = `
        <h4>${job.role}</h4>
        <p class="company">${job.company}</p>
        <p class="period"><em>${job.period}</em></p>
        <p class="description">${job.description}</p>
      `;
      expDiv.appendChild(div);
    });

    // Education
    const eduDiv = document.getElementById('education');
    data.education?.forEach(edu => {
      const div = document.createElement('div');
      div.className = 'education';
      div.innerHTML = `
        <h4>${edu.institution}</h4>
        <p class="degree">${edu.degree}</p>
        <p class="year"><em>${edu.year}</em></p>
      `;
      eduDiv.appendChild(div);
    });

    // Expertise
    const expList = document.getElementById('expertise');
    data.expertise?.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      expList.appendChild(li);
    });

    // Skills
    const skillsDiv = document.getElementById('skills');
    data.skills?.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill-bar';
      div.innerHTML = `
        <span>${skill.name}</span>
        <div class="bar">
          <div style="width: ${skill.level}%"></div>
        </div>
      `;
      skillsDiv.appendChild(div);
    });

    // Footer
    if (data.footer) {
      const copyrightText = data.footer.copyright
        ?.replace('[year]', new Date().getFullYear())
        ?.replace('[name]', data.name);
      if (copyrightText) document.getElementById('copyright-text').textContent = copyrightText;

      const socialLinksContainer = document.getElementById('social-links');
      data.footer.social_links?.forEach(link => {
        const a = document.createElement('a');
        a.href = link.url || '#';
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.setAttribute('aria-label', link.name || 'Social link');
        
        const icon = document.createElement('i');
        icon.className = link.icon || 'fas fa-link';
        
        a.appendChild(icon);
        socialLinksContainer.appendChild(a);
      });
    }
  } catch (error) {
    console.error("Error populating data:", error);
    showError();
  }
}

function showError() {
  const container = document.querySelector('.container');
  container.innerHTML = `
    <div class="error-message">
      <h2>Oops! Something went wrong</h2>
      <p>We couldn't load the resume data. Please:</p>
      <ul>
        <li>Check your internet connection</li>
        <li>Refresh the page</li>
        <li>Ensure data.json exists</li>
      </ul>
      <button onclick="location.reload()">Try Again</button>
    </div>
  `;
}

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.getElementById('navbar');

if (menuToggle && navbar) {
  menuToggle.addEventListener('click', () => {
    navbar.classList.toggle('active');
  });

  // Close menu when clicking on a link
  document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', () => {
      navbar.classList.remove('active');
    });
  });
}

// Highlight active section in navbar
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#navbar a');
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    const sectionHeight = section.clientHeight;
    const sectionId = section.getAttribute('id');
    
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
});
