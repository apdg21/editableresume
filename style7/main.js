// Fetch and populate data
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Basic Info
    document.getElementById('profileImage').src = data.profile_image;
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('about').textContent = data.about;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('email').textContent = data.email;
    document.getElementById('location').textContent = data.location;
    document.getElementById('summary').textContent = data.summary;

    // Languages
    const langList = document.getElementById('languages');
    data.languages.forEach(lang => {
      const li = document.createElement('li');
      li.textContent = lang;
      langList.appendChild(li);
    });

    // Experience
    const expDiv = document.getElementById('experience');
    data.experience.forEach(job => {
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
    data.education.forEach(edu => {
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
    data.expertise.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      expList.appendChild(li);
    });

    // Skills
    const skillsDiv = document.getElementById('skills');
    data.skills.forEach(skill => {
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
  })
  .catch(err => {
    console.error("Error loading resume data:", err);
    alert("Failed to load resume data. Please try again later.");
  });

// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navbar = document.getElementById('navbar');

menuToggle.addEventListener('click', () => {
  navbar.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('#navbar a').forEach(link => {
  link.addEventListener('click', () => {
    navbar.classList.remove('active');
  });
});

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

// Set footer year and name
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('footer-name').textContent = document.getElementById('name').textContent;
