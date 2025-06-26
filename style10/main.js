document.addEventListener('DOMContentLoaded', () => {
  // Fetch data from data.json
  fetch('data.json')
    .then(response => response.json())
    .then(data => {
      // Populate page title
      document.getElementById('page-title').textContent = data.title;

      // Populate header title
      document.getElementById('header-title').textContent = data.header.title;

      // Populate navigation links
      const sections = ['profile', 'about', 'experience', 'education', 'skills', 'languages', 'references', 'contact'];
      const navLinks = document.getElementById('nav-links');
      const mobileNavLinks = document.getElementById('mobile-nav-links');
      sections.forEach(section => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${section}`;
        a.textContent = section.charAt(0).toUpperCase() + section.slice(1);
        a.className = 'hover:text-blue-300';
        li.appendChild(a);
        navLinks.appendChild(li);
        mobileNavLinks.appendChild(li.cloneNode(true));
      });

      // Populate profile
      document.getElementById('profile-name').textContent = data.profile.name;
      document.getElementById('profile-title').textContent = data.profile.title;

      // Populate about
      document.getElementById('about-text').textContent = data.about;

      // Populate experience
      const expList = document.getElementById('experience-list');
      data.experience.forEach(exp => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3 class="text-xl font-semibold">${exp.position}</h3>
          <p class="text-gray-600">${exp.company} | ${exp.date}</p>
          <p class="text-gray-700">${exp.description}</p>
        `;
        expList.appendChild(div);
      });

      // Populate education
      const eduList = document.getElementById('education-list');
      data.education.forEach(edu => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3 class="text-xl font-semibold">${edu.degree}</h3>
          <p class="text-gray-600">${edu.institution} | ${edu.date}</p>
        `;
        eduList.appendChild(div);
      });

      // Populate skills
      const skillsList = document.getElementById('skills-list');
      data.skills.forEach(skill => {
        const li = document.createElement('li');
        li.textContent = skill;
        li.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full';
        skillsList.appendChild(li);
      });

      // Populate languages
      const langList = document.getElementById('languages-list');
      data.languages.forEach(lang => {
        const li = document.createElement('li');
        li.textContent = lang;
        li.className = 'bg-blue-100 text-blue-800 px-3 py-1 rounded-full';
        langList.appendChild(li);
      });

      // Populate references
      const refList = document.getElementById('references-list');
      data.references.forEach(ref => {
        const div = document.createElement('div');
        div.innerHTML = `
          <h3 class="text-xl font-semibold">${ref.name}</h3>
          <p class="text-gray-600">${ref.position} | ${ref.company}</p>
          <p class="text-gray-700">${ref.contact}</p>
        `;
        refList.appendChild(div);
      });

      // Populate contact
      const contactList = document.getElementById('contact-list');
      Object.entries(data.contact).forEach(([key, value]) => {
        const li = document.createElement('li');
        li.textContent = `${key}: ${value}`;
        contactList.appendChild(li);
      });

      // Populate footer
      document.getElementById('footer-text').textContent = data.footer;
    })
    .catch(error => console.error('Error loading data:', error));

  // Hamburger menu toggle
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      target.scrollIntoView({ behavior: 'smooth' });
      mobileMenu.classList.remove('active'); // Close mobile menu on click
    });
  });
});