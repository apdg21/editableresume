function toggleMenu() {
  document.getElementById('menu').classList.toggle('active');
}

async function loadResume() {
  const res = await fetch('data.json');
  const data = await res.json();
  const main = document.getElementById('resume');

  const sections = [
    ['about', `<section id="about">
      <h1>${data.name}</h1>
      <h2>${data.title}</h2>
      <p>${data.summary}</p>
    </section>`],
    ['experience', `<section id="experience">
      <h2>Experience</h2>
      ${data.experience.map(job => `
        <div>
          <h3>${job.role} – ${job.company}</h3>
          <p>${job.period}</p>
          <p>${job.description}</p>
        </div>`).join('')}
    </section>`],
    ['education', `<section id="education">
      <h2>Education</h2>
      ${data.education.map(edu => `
        <div>
          <h3>${edu.degree} – ${edu.institution}</h3>
          <p>${edu.period}</p>
        </div>`).join('')}
    </section>`],
    ['skills', `<section id="skills">
      <h2>Skills</h2>
      <ul>${data.skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
    </section>`],
    ['contact', `<section id="contact">
      <h2>Contact</h2>
      <p>Email: ${data.contact.email}</p>
      <p>Phone: ${data.contact.phone}</p>
      <p>LinkedIn: ${data.contact.linkedin}</p>
    </section>`],
  ];

  main.innerHTML = sections.map(([id, html]) => html).join('');
}

loadResume();