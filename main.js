fetch('data.json')
  .then(response => response.json())
  .then(data => {
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('summary').textContent = data.summary;
    document.getElementById('email').textContent = "Email: " + data.contact.email;
    document.getElementById('location').textContent = "Location: " + data.contact.location;

    const socialLinks = document.getElementById('social-links');
    data.contact.social.forEach(link => {
      const a = document.createElement('a');
      a.href = link.url;
      a.textContent = link.platform;
      a.style.marginRight = "10px";
      socialLinks.appendChild(a);
    });

    const experienceList = document.getElementById('experience-list');
    data.experience.forEach(exp => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${exp.role}</strong> at ${exp.company} (${exp.period})<br>${exp.description}`;
      experienceList.appendChild(div);
    });

    const educationList = document.getElementById('education-list');
    data.education.forEach(edu => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${edu.degree}</strong> - ${edu.institution} (${edu.year})`;
      educationList.appendChild(div);
    });

    const skillsList = document.getElementById('skills-list');
    data.skills.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      skillsList.appendChild(li);
    });

    const projectsList = document.getElementById('projects-list');
    data.projects.forEach(project => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${project.name}</strong>: ${project.description}`;
      projectsList.appendChild(div);
    });
  });
