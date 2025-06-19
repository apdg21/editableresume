fetch('data.json')
    .then(response => response.json())
    .then(data => {
        document.getElementById('name').textContent = data.name;
        document.getElementById('title').textContent = data.title;
        document.getElementById('about-text').textContent = data.about;
        
        const skillsList = document.getElementById('skills-list');
        data.skills.forEach(skill => {
            const li = document.createElement('li');
            li.innerHTML = `${skill.name} <span>${skill.level}%</span>`;
            skillsList.appendChild(li);
        });

        document.getElementById('education-text').textContent = `${data.education.degree} ${data.education.university} ${data.education.address} ${data.education.years}`;

        const languagesList = document.getElementById('languages-list');
        data.languages.forEach(lang => {
            const li = document.createElement('li');
            li.innerHTML = `${lang.name} <span>${lang.level}%</span>`;
            languagesList.appendChild(li);
        });

        const experienceList = document.getElementById('experience-list');
        data.experience.forEach(exp => {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${exp.title}</strong> ${exp.period} | ${exp.company}<br>${exp.description}`;
            experienceList.appendChild(li);
        });

        document.getElementById('contact').innerHTML = `
            <a href="tel:${data.contact.phone}">${data.contact.phone}</a><br>
            <a href="http://${data.contact.website}" target="_blank">${data.contact.website}</a><br>
            ${data.contact.address}
        `;
    })
    .catch(error => console.error('Error loading JSON:', error));