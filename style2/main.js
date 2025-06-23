// Hamburger menu toggle
const navToggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// Highlight active nav link on scroll
const sections = document.querySelectorAll('.main-content > section, .sidebar-section');
window.addEventListener('scroll', () => {
  let scrollPos = window.scrollY + 80;
  sections.forEach(sec => {
    const id = sec.getAttribute('id');
    if (
      sec.offsetTop <= scrollPos &&
      sec.offsetTop + sec.offsetHeight > scrollPos
    ) {
      document
        .querySelectorAll('.nav-links a')
        .forEach(a => a.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

// Load resume data and render dynamic content
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Update page title dynamically
    document.title = `${data.name} – Resume`;

    // Navbar brand (title)
    document.getElementById('nav-brand').textContent = data.name;

    // Header content
    document.getElementById('name').textContent = data.name;
    document.getElementById('job-title').textContent = data.title;

    // About
    document.getElementById('about-text').textContent = data.about;

    // Experience
    const expList = document.getElementById('experience-list');
    expList.innerHTML = data.experience.map(exp => `
      <div class="experience-item">
        <div class="dates">${exp.start} – ${exp.end}</div>
        <div class="company">${exp.company}</div>
        <div class="role">${exp.role}</div>
        <ul>
          ${exp.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    // Education
    const eduList = document.getElementById('education-list');
    eduList.innerHTML = data.education.map(edu => `
      <div class="education-item">
        <div><strong>${edu.degree}</strong></div>
        <div class="institution">${edu.institution}</div>
        <div class="dates">${edu.start} – ${edu.end}</div>
      </div>
    `).join('');

    // Skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join('');

    // Languages
    const languagesList = document.getElementById('languages-list');
    languagesList.innerHTML = data.languages.map(lang => `<li>${lang}</li>`).join('');

    // References
    const refList = document.getElementById('references-list');
    refList.innerHTML = data.references.map(ref => `
      <div class="reference-item">
        <div class="name">${ref.name}</div>
        <div class="role">${ref.role}</div>
        <div class="contact">
          <strong>Phone:</strong> ${ref.phone}<br>
          <strong>Email:</strong> <a href="mailto:${ref.email}" style="color:#6d7a8a">${ref.email}</a>
        </div>
      </div>
    `).join('');

    // Contact
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = `
      <li><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.35 2.07.68 3.06a2 2 0 0 1-.45 2.11L8.09 10.91a16 16 0 0 0 6 6l1.02-1.02a2 2 0 0 1 2.11-.45c.99.33 2.01.55 3.06.68A2 2 0 0 1 22 16.92z"/></svg>${data.contact.phone}</li>
      <li><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg><a href="mailto:${data.contact.email}" style="color:#6d7a8a">${data.contact.email}</a></li>
      <li><svg fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414A8 8 0 1 0 12 20h.01"/></svg>${data.contact.address}</li>
    `;

    // Footer text
    document.getElementById('footer-copy').textContent = data.footer?.text || '';

    // Footer socials
    const footerSocials = document.getElementById('footer-socials');
    footerSocials.innerHTML = '';
    if (data.footer?.socials) {
      data.footer.socials.forEach(social => {
        const a = document.createElement('a');
        a.href = social.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.setAttribute('aria-label', social.name);
        const img = document.createElement('img');
        img.src = `assets/${social.icon}`;
        img.alt = social.name;
        a.appendChild(img);
        footerSocials.appendChild(a);
      });
    }
  })
  .catch(err => {
    console.error('Failed to load resume data:', err);
  });
