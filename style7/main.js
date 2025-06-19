
fetch('data.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('profileImage').src = data.profile_image;
    document.getElementById('name').textContent = data.name;
    document.getElementById('title').textContent = data.title;
    document.getElementById('about').textContent = data.about;
    document.getElementById('phone').textContent = data.phone;
    document.getElementById('email').textContent = data.email;
    document.getElementById('location').textContent = data.location;
    document.getElementById('summary').textContent = data.summary;

    const langList = document.getElementById('languages');
    data.languages.forEach(lang => {
      const li = document.createElement('li');
      li.textContent = lang;
      langList.appendChild(li);
    });

    const expDiv = document.getElementById('experience');
    data.experience.forEach(job => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${job.role}</strong><br>${job.company} <br><em>${job.period}</em><p>${job.description}</p>`;
      expDiv.appendChild(div);
    });

    const eduDiv = document.getElementById('education');
    data.education.forEach(edu => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>${edu.institution}</strong><br>${edu.degree}<br><em>${edu.year}</em>`;
      eduDiv.appendChild(div);
    });

    const expList = document.getElementById('expertise');
    data.expertise.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = skill;
      expList.appendChild(li);
    });

    const skillsDiv = document.getElementById('skills');
    data.skills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'skill-bar';
      div.innerHTML = `
        <span>${skill.name}</span>
        <div class="bar" style="--level:${skill.level}%">
          <div style="width:${skill.level}%; height:8px; background:#1e7150;"></div>
        </div>`;
      skillsDiv.appendChild(div);
    });
  });
