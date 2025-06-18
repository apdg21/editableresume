fetch('data.json')
  .then(res => res.json())
  .then(data => {
    // Header
    document.getElementById('first-name').textContent = data.firstName;
    document.getElementById('last-name').textContent = data.lastName;
    document.getElementById('job-title').textContent = data.title;

    // Contact
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = `
      <li>📞 ${data.contact.phone}</li>
      <li>✉️ <a href="mailto:${data.contact.email}" style="color:#b0bed9">${data.contact.email}</a></li>
      <li>📍 ${data.contact.address}</li>
      <li>🌐 <a href="${data.contact.website}" target="_blank" style="color:#b0bed9">${data.contact.website}</a></li>
    `;

    // Education
    const eduList = document.getElementById('education-list');
    eduList.innerHTML = data.education.map(edu => `
      <div class="education-item">
        <div class="degree">${edu.degree}</div>
        <div class="school">${edu.institution}</div>
        <div class="dates">${edu.start} - ${edu.end}</div>
      </div>
    `).join('');

    // Skills
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = data.skills.map(skill => `<li>${skill}</li>`).join('');

    // Languages
    const languagesList = document.getElementById('languages-list');
    languagesList.innerHTML = data.languages.map(lang => `<li>${lang}</li>`).join('');

    // Profile
    document.getElementById('profile-summary').textContent = data.profile;

    // Experience
    const expList = document.getElementById('experience-list');
    expList.innerHTML = data.experience.map(exp => `
      <div class="experience-item">
        <h4>${exp.company}</h4>
        <div class="meta">
          <span>${exp.role}</span>
          <span>${exp.start} - ${exp.end}</span>
        </div>
        <ul>
          ${exp.details.map(d => `<li>${d}</li>`).join('')}
        </ul>
      </div>
    `).join('');

    // References
    const refList = document.getElementById('reference-list');
    refList.innerHTML = data.references.map(ref => `
      <div class="reference-item">
        <div class="name">${ref.name}</div>
        <div class="role">${ref.role}</div>
        <div class="contact">Phone: ${ref.phone} <br>Email: <a href="mailto:${ref.email}" style="color:#4a90e2">${ref.email}</a></div>
      </div>
    `).join('');
  });
